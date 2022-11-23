using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateCategoryDto
    {
        [Required]
        public string Brand {get;set;}
        [Required]
        public string Type {get;set;}
        
    }
}