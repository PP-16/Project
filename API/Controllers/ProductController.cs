using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using API.RequestHelpers;
using API.Extensions;

namespace API.Controllers
{
    // [Authorize]
    public class ProductController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductController(StoreContext context, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products
                        .Sort(productParams.OrderBy)
                        .Search(productParams.SearchTerm)
                        .Filter(productParams.Brands, productParams.Types)
                        .Include(x => x.Category)
                        .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query,
                           productParams.PageNumber, productParams.PageSize);

            //เพื่อส่งค่าการแบ่งหน้าไปให้ Axios Interceptor นำไปใช้ต่อ
            Response.AddPaginationHeader(products.MetaData);

            return Ok(products);
        }

        // [HttpGet]
        // public async Task<ActionResult<List<Product>>> GetProducts()
        // {
        //     return Ok(await _context.Products.Include(x => x.Category).ToListAsync());
        // }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
             var product = await _context.Products.Include(c=>c.Category).FirstAsync(I=>I.Id==id);
            if(product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            //อ่านค่าที่ซ้ำกันมาเพียงค่าเดียว
            var brands = await _context.Products.Select(p => p.Category.Brand).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Category.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }


        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto); //แมบแบบแปลงชนิดข้อมูล
            #region รูปภาพ
            string wwwRootPath = _webHostEnvironment.WebRootPath;
            if (productDto.File != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(productDto.File.FileName);
                var uploads = Path.Combine(wwwRootPath, @"../../my-app/public/images/products/");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);
                //บันทึกรุปภาพใหม่
                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    productDto.File.CopyTo(fileStreams);
                }
                product.ImageUrl = @"/images/products/" + fileName + extension;
            }

            #endregion

            _context.Products.Add(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProduct", new { Id = product.Id }, product);
            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }

        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto productDto)
        {
            var product = await _context.Products.FindAsync(productDto.Id);

            string wwwRootPath = _webHostEnvironment.WebRootPath;
            if (productDto.File != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(productDto.File.FileName);
                var uploads = Path.Combine(wwwRootPath, @"../../my-app/public/images/products/");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);


                //กรณีมีรูปภาพเดิมต้องลบทิ้งก่อน
                if (productDto.File != null)
                {
                    var oldImagePath = Path.Combine(wwwRootPath, product.ImageUrl.TrimStart('\\'));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                //บันทึกรุปภาพใหม่
                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    productDto.File.CopyTo(fileStreams);
                }
                product.ImageUrl = @"/images/products/" + fileName + extension;
            }


            if (product == null) return NotFound();

            _mapper.Map(productDto, product); //การแมบ แก้ไขใช้รูปแบบนี้ (source,destination)

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(product);

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }
    }
}