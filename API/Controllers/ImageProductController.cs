using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ImageProductController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        private readonly IWebHostEnvironment _webHostEnvironment;
        public ImageProductController(StoreContext context, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ImageProduct>> GetImageProduct(int id)
        {
             var img = await _context.ImageProduct.Include(c=>c.Product).FirstAsync(I=>I.Id==id);
            if(img == null) return NotFound();

            return img;
        }

          [HttpPost]
        public async Task<ActionResult<ImageProduct>> CreateImageProduct([FromForm] CreateImageDto ImageDto)
        {
            var img = _mapper.Map<ImageProduct>(ImageDto); //แมบแบบแปลงชนิดข้อมูล
            #region รูปภาพ
            string wwwRootPath = _webHostEnvironment.WebRootPath;
            if (ImageDto.File != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(ImageDto.File.FileName);
                var uploads = Path.Combine(wwwRootPath, @"../../my-app/public/images/products/");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);
                //บันทึกรุปภาพใหม่
                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    ImageDto.File.CopyTo(fileStreams);
                }
                img.image = @"/images/products/" + fileName + extension;
            }
            if (ImageDto.File2 != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(ImageDto.File2.FileName);
                var uploads = Path.Combine(wwwRootPath, @"../../my-app/public/images/products/");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);
                //บันทึกรุปภาพใหม่
                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    ImageDto.File2.CopyTo(fileStreams);
                }
                img.image2 = @"/images/products/" + fileName + extension;
            }
            if (ImageDto.File3 != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(ImageDto.File3.FileName);
                var uploads = Path.Combine(wwwRootPath, @"../../my-app/public/images/products/");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);
                //บันทึกรุปภาพใหม่
                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    ImageDto.File3.CopyTo(fileStreams);
                }
                img.image3 = @"/images/products/" + fileName + extension;
            }
            if (ImageDto.File4 != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(ImageDto.File4.FileName);
                var uploads = Path.Combine(wwwRootPath, @"../../my-app/public/images/products/");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);
                //บันทึกรุปภาพใหม่
                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    ImageDto.File4.CopyTo(fileStreams);
                }
                img.image4 = @"/images/products/" + fileName + extension;
            }
            #endregion

            _context.ImageProduct.Add(img);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetProduct", new { Id = img.Id }, img);
            return BadRequest(new ProblemDetails { Title = "Problem creating new imageproduct" });
        }

        [HttpPut]
        public async Task<ActionResult<ImageProduct>> UpdateImageProduct([FromForm] UpdateImageDto imageDto)
        {
            var img = await _context.ImageProduct.FindAsync(imageDto.Id);

            string wwwRootPath = _webHostEnvironment.WebRootPath;
            if (imageDto.File != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(imageDto.File.FileName);
                var uploads = Path.Combine(wwwRootPath, @"../../my-app/public/images/products/");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);


                //กรณีมีรูปภาพเดิมต้องลบทิ้งก่อน
                if (imageDto.File != null)
                {
                    var oldImagePath = Path.Combine(wwwRootPath, img.image.TrimStart('\\'));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                //บันทึกรุปภาพใหม่
                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    imageDto.File.CopyTo(fileStreams);
                }
                img.image = @"/images/products/" + fileName + extension;
            }
            if (imageDto.File2 != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(imageDto.File2.FileName);
                var uploads = Path.Combine(wwwRootPath, @"../../my-app/public/images/products/");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);


                //กรณีมีรูปภาพเดิมต้องลบทิ้งก่อน
                if (imageDto.File2 != null)
                {
                    var oldImagePath = Path.Combine(wwwRootPath, img.image2.TrimStart('\\'));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                //บันทึกรุปภาพใหม่
                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    imageDto.File2.CopyTo(fileStreams);
                }
                img.image2 = @"/images/products/" + fileName + extension;
            }
            if (imageDto.File3 != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(imageDto.File3.FileName);
                var uploads = Path.Combine(wwwRootPath, @"../../my-app/public/images/products/");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);


                //กรณีมีรูปภาพเดิมต้องลบทิ้งก่อน
                if (imageDto.File3 != null)
                {
                    var oldImagePath = Path.Combine(wwwRootPath, img.image3.TrimStart('\\'));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                //บันทึกรุปภาพใหม่
                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    imageDto.File3.CopyTo(fileStreams);
                }
                img.image3 = @"/images/products/" + fileName + extension;
            }
            if (imageDto.File4 != null)
            {
                string fileName = Guid.NewGuid().ToString();
                var extension = Path.GetExtension(imageDto.File4.FileName);
                var uploads = Path.Combine(wwwRootPath, @"../../my-app/public/images/products/");

                if (!Directory.Exists(uploads)) Directory.CreateDirectory(uploads);


                //กรณีมีรูปภาพเดิมต้องลบทิ้งก่อน
                if (imageDto.File4 != null)
                {
                    var oldImagePath = Path.Combine(wwwRootPath, img.image4.TrimStart('\\'));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }

                //บันทึกรุปภาพใหม่
                using (var fileStreams = new FileStream(Path.Combine(uploads, fileName + extension), FileMode.Create))
                {
                    imageDto.File4.CopyTo(fileStreams);
                }
                img.image4 = @"/images/products/" + fileName + extension;
            }
            
            if (img == null) return NotFound();

            _mapper.Map(imageDto, img); //การแมบ แก้ไขใช้รูปแบบนี้ (source,destination)

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(img);

            return BadRequest(new ProblemDetails { Title = "Problem updating imageproduct" });
        }

          [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteImageProduct(int id)
        {
            var img = await _context.ImageProduct.FindAsync(id);

            if (img == null) return NotFound();

            _context.ImageProduct.Remove(img);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting imageproduct" });
        }

    }
}