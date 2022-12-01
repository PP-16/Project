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
    public class SenderController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public SenderController(StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        [HttpGet]
        public async Task<ActionResult<List<Sender>>> GetSender()
        {
            return Ok(await _context.Sender.ToListAsync());
        }

        [HttpGet("{id}", Name = "Getsender")]
        public async Task<ActionResult<Sender>> Getsender(int id)
        {
            var sender = await _context.Sender.FindAsync(id);

            return sender;
        }

        [HttpPost]
        public async Task<ActionResult<Sender>> CreateSender([FromForm] CreateSenderDto senderDto)
        {
            var sender = _mapper.Map<Sender>(senderDto); //แมบแบบแปลงชนิดข้อมูล

            _context.Sender.Add(sender);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetSender", new { Id = sender.Id }, sender);
            return BadRequest(new ProblemDetails { Title = "Problem creating new product" });
        }

        [HttpPut]
        public async Task<ActionResult<Sender>> UpdateSender([FromForm] UpdateSenderDto senderDto)
        {
            var sender = await _context.Sender.FindAsync(senderDto.Id);

            if (sender == null) return NotFound();

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(sender);

            return BadRequest(new ProblemDetails { Title = "Problem updating sedder" });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSender(int id)
        {
            var sender = await _context.Sender.FindAsync(id);

            if (sender == null) return NotFound();

            _context.Sender.Remove(sender);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting sender" });
        }
    }
}