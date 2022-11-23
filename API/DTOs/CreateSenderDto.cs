using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateSenderDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public long TellNumber { get; set; }

        [Required]
        public string Address { get; set; }
    }
}