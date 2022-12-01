using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class ReviewController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ReviewController(StoreContext context, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Review>>> GetReview()
        {
            var review = await _context.Reviews.Include(p=>p.Product).ToListAsync();
            return Ok(review);
        }
        [HttpPost]
        public async Task<ActionResult<Review>>CreatReview([FromForm] CreateReviewDto ReviewDto)
        {
            var review =_mapper.Map<Review>(ReviewDto);
            review.OrderDate = DateTime.UtcNow;
            #region รูปภาพ
            string wwwRootPath = _webHostEnvironment.WebRootPath;
            if (ReviewDto.File != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(ReviewDto.File.FileName);
                var uploads = Path.Combine(wwwRootPath, @"../../my-app/images/reviews/");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);
                //บันทึกรุปภาพใหม่
                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    ReviewDto.File.CopyTo(fileStreams);
                }
                review.ImageReview = @"/images/reviews/" + fileName + extension;
            }

            #endregion

             _context.Reviews.Add(review);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetReview", new { Id = review.Id }, review);
            return BadRequest(new ProblemDetails { Title = "Problem creating new Review" });
        }
        [HttpPut]
        public async Task<ActionResult<Review>> UpdateReview([FromForm] UpdateReviewDto reviewDto)
        {
            var review = await _context.Reviews.FindAsync(reviewDto.Id);

            string wwwRootPath = _webHostEnvironment.WebRootPath;
            if (reviewDto.File != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(reviewDto.File.FileName);
                var uploads = Path.Combine(wwwRootPath, @"../../my-app/images/reviews/");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);


                //กรณีมีรูปภาพเดิมต้องลบทิ้งก่อน
                if (reviewDto.File != null)
                {
                    var oldImagePath = Path.Combine(wwwRootPath, review.ImageReview.TrimStart('\\'));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                //บันทึกรุปภาพใหม่
                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    reviewDto.File.CopyTo(fileStreams);
                }
                review.ImageReview = @"/images/reviews/" + fileName + extension;
            }


            if (review == null) return NotFound();

            _mapper.Map(reviewDto, review); //การแมบ แก้ไขใช้รูปแบบนี้ (source,destination)

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(review);

            return BadRequest(new ProblemDetails { Title = "Problem updating review" });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null) return NotFound();

            _context.Reviews.Remove(review);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting review" });
        }
    }
}