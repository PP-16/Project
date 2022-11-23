using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }= string.Empty;
        public string Description { get; set; }
        public long Price { get; set; }
        public int QuantityInStock { get; set; }
        public int CategoryId {get;set;}
        public Category Category {get;set;}


    }
}