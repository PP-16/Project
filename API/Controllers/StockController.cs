using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
     [Authorize]
    public class StockController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public StockController(StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        private async Task<List<Stock>> RetrieveStock()
        {
            return await _context.Stocks
                .Include(p => p.Product)
                .Include(c=>c.Category)
                .Include(s => s.Sender).ToListAsync();
        }

        // private StockItemsDto MapStockToDto(Stock stock)
        // {
        //     return new StockItemsDto
        //     {
        //         Items = stock.Items.Select(item => new StockItemsDto
        //         {
        //             ProductId = item.ProductId,
        //             NameProduct = item.Product.Name,

        //             SenderId = item.SenderId,
        //             NameSender = item.Sender.Name,

        //             Quantity = item.Quantity
        //         }).ToList()
        //     };
        // }


        [HttpGet]
        public async Task<ActionResult<List<Stock>>> GetStock()
        {
            var stock = await RetrieveStock();
            return stock;
        }
        [HttpGet("{id}", Name = "GetStock")]
        public async Task<ActionResult<Stock>> GetStock(int id)
        {
            var stock = await _context.Stocks.FindAsync(id);

            return Ok(stock);
        }
        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            //อ่านค่าที่ซ้ำกันมาเพียงค่าเดียว
            var product = await _context.Stocks.Select(p => p.ProductId).Distinct().ToListAsync();
            // var category = await _context.Stocks.Select(p => p.CategoryId).Distinct().ToListAsync();
            var sender = await _context.Stocks.Select(p => p.SenderId).Distinct().ToListAsync();
            return Ok(new { product, sender});
        }

        [HttpPost]
        public async Task<ActionResult<Stock>> CreateStock([FromForm] CreateStockDto stockDto)
        {
            var stock = _mapper.Map<Stock>(stockDto); //แมบแบบแปลงชนิดข้อมูล
            stock.OrderDate =DateTime.UtcNow;
                                                      //   var stock1 = await RetrieveStock();
            _context.Stocks.Add(stock);

            var product = await _context.Products.FirstOrDefaultAsync(p=>p.Id.Equals(stockDto.ProductId));
            product.QuantityInStock+=stockDto.Quantity;
            stockDto.OrderDate = DateTime.Now;
            var result = await _context.SaveChangesAsync() > 0;

            //Redirect to Route
            if (result) return CreatedAtRoute("GetStock", stock);

            return BadRequest(new ProblemDetails { Title = "Problem saving item to stock" });
        }
        [HttpPut]
        public async Task<ActionResult<Stock>> UpdateStock([FromForm] UpdateStockDto stockDto)
        {
            var stock = await _context.Stocks.FindAsync(stockDto.Id);

            if (stock == null) return NotFound();
            
            var product = await _context.Products.FirstOrDefaultAsync(p=>p.Id.Equals(stockDto.ProductId));
            product.QuantityInStock+=stockDto.Quantity;

            _mapper.Map(stockDto, stock); //การแมบ แก้ไขใช้รูปแบบนี้ (source,destination)

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(stock);

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteStock(int id)
        {
            var stock = await _context.Stocks.FindAsync(id);

            if (stock == null) return NotFound();

            _context.Stocks.Remove(stock);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting Stock" });
        }
    }
}