using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateImageDto
    {
        public int Id {get;set;}
        [Required]
        public int ProductId { get; set; }
        public IFormFile? File { get; set; }
        public IFormFile? File2 { get; set; }
        public IFormFile? File3 { get; set; }
        public IFormFile? File4 { get; set; }
    }
}