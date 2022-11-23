using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Review
    {
        public int Id {get;set;}
        public int ProductId{get;set;}
        public Product Product{get;set;}
        public string BuyerId {get;set;}
        public string Comment {get;set;}
        public int Star {get;set;}
        public string ImageReview { get; set; }= string.Empty;
    }
}