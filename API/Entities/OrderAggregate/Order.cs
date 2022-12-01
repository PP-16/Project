using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderAggregate
{
    //ใบหลักการสั่งซื้อ one
    public class Order
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public List<OrderItem> OrderItems { get; set; }
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
        public string Voucher { get; set; }
        public string PaymentIntentId { get; set; }
        public long GetTotal()
        {
            if (Voucher == null)
            {
                return Subtotal + DeliveryFee;
            }
            else
            {
                return Subtotal + DeliveryFee;
            }

        }
    }

}