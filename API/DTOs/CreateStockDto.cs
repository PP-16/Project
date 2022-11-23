using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateStockDto
    {
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int SenderId { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public long TotalPrice { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    }
}