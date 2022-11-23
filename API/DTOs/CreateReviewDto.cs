using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateReviewDto
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        public string Comment { get; set; }
        [Required]
        public int Star { get; set; }
        [Required]
        public IFormFile File { get; set; }

        public string BuyerId { get; set; }

    }
}