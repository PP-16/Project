using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Stock
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public long TotalPrice { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int SenderId { get; set; }
        public Sender Sender { get; set; }
        public int CategoryId{get;set;}
        public Category Category {get;set;}

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        
    }

}