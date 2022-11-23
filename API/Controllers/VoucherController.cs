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
    // [Authorize]
    public class VoucherController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public VoucherController(StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        [HttpGet]
        public async Task<ActionResult<VoucherDto>> GetVoucher()
        {
            var voucher = await _context.Vouchers.ToListAsync();
            if (voucher == null) return NotFound();

            return Ok(voucher);
        }

        [HttpPost]
        public async Task<ActionResult<Voucher>> CreateVoucher([FromForm] VoucherDto voucherDto)
        {
           var voucher = _mapper.Map<Voucher>(voucherDto); //แมบแบบแปลงชนิดข้อมูล

            _context.Vouchers.Add(voucher);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetVoucher", new { Id = voucher.Id }, voucher);
            return BadRequest(new ProblemDetails { Title = "Problem creating new voucher" });
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVoucher(int id)
        {

          var  voucher = await _context.Vouchers.FindAsync(id);

            if (voucher == null) return NotFound();

            _context.Vouchers.Remove(voucher);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting Voucher" });
        }
    }
}