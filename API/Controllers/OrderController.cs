using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
//    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
               .ProjectOrderToOrderDto()
               .Include(v=>v.Voucher)
               .Where(x => x.BuyerId == User.Identity.Name)
               .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await _context.Orders
                .ProjectOrderToOrderDto()
                .Include(v=>v.Voucher)
                .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto orderDto)
        {
            var basket = await _context.Baskets
                .RetrieveBasketWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

            if (basket == null) return BadRequest(new ProblemDetails { Title = "Could not locate basket" });
            // var voucher = await _context.Vouchers.FirstOrDefaultAsync();


            var items = new List<OrderItem>(); //รายการสินค้าสั่งซื้อทั้งหมด

            foreach (var item in basket.Items)
            {
                var productItem = await _context.Products.Include(c=>c.Category).FirstAsync(p=>p.Id.Equals(item.ProductId));

                //รายชื่อสินค้าหนึ่งรายการ
                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    PictureUrl = productItem.ImageUrl
                };

                //สินค้าที่สั่งซื้อ จำนวนและราคา
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity,
                   
                };
                items.Add(orderItem); //แอดรายการสินค้าทั้งหมดที่สั่งซื้อ
                productItem.QuantityInStock -= item.Quantity; //ลดจำนวนสินค้าในสต๊อก
            }
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            // if (voucher.Discount != null)
            // {
            //      subtotal = items.Sum(item => (item.Price * item.Quantity)-item.Voucher.Discount);
            // }
            var deliveryFee = subtotal > 10000 ? 0 : 500;
            var voucher = await _context.Vouchers.FirstOrDefaultAsync(v=>v.Id.Equals(orderDto.VoucherId));
            if (voucher == null){
                return Ok(subtotal);
            }
            else{
              return Ok((subtotal * voucher.Discount) /100) ;
            }
            //รวบรวม Order,OrderItems
            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDto.ShippingAddress,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee,
                Voucher = voucher
            };
            _context.Orders.Include(v=>v.Voucher);
            _context.Orders.Add(order); //สร้าง Order และ OrderItem ในขั้นตอนเดียว
            _context.Baskets.Remove(basket);  //ลบ  Basket และ BasketItem ในขั้นตอนเดียว


            if (orderDto.SaveAddress)   //กรณีต้องการบันทึกที่อยุ่จัดส่งลง UserAddress
            {
                var user = await _context.Users
                    .Include(a => a.Address)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

                var address = new UserAddress
                {
                    FullName = orderDto.ShippingAddress.FullName,
                    Address1 = orderDto.ShippingAddress.Address1,
                    Address2 = orderDto.ShippingAddress.Address2,
                    City = orderDto.ShippingAddress.City,
                    State = orderDto.ShippingAddress.State,
                    Zip = orderDto.ShippingAddress.Zip,
                    Country = orderDto.ShippingAddress.Country
                };
                user.Address = address;
            }

            //บันทึกทุก transaction ครั้งเดียว
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest(new ProblemDetails { Title = "Problem creating order" });
        }

    }

}