using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // [Authorize]
    public class CategoryController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public CategoryController(StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategory()
        {
            return Ok(await _context.Categories.ToListAsync());
        }
        [HttpGet("{id}", Name = "GetCategory")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            return category;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            //อ่านค่าที่ซ้ำกันมาเพียงค่าเดียว
            var brands = await _context.Categories.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.Categories.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateCategory([FromForm] CreateCategoryDto cateDto)
        {
            var category = _mapper.Map<Category>(cateDto); //แมบแบบแปลงชนิดข้อมูล

            _context.Categories.Add(category);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetCategory", new { Id = category.Id }, category);
            return BadRequest(new ProblemDetails { Title = "Problem creating new category" });
        }
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateCategory([FromForm] UpdateCategoryDto categoryDto)
        {
            var category = await _context.Categories.FindAsync(categoryDto.Id);

            if (category == null) return NotFound();

            _mapper.Map(categoryDto, category); //การแมบ แก้ไขใช้รูปแบบนี้ (source,destination)

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(category);

            return BadRequest(new ProblemDetails { Title = "Problem updating category" });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null) return NotFound();

            _context.Categories.Remove(category);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting Category" });
        }

    }
}