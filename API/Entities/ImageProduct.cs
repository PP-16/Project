using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ImageProduct
    {
        public int Id {get;set;}
        public int ProductId {get;set;}
        public Product Product {get;set;}

        public string image {get;set;}
        public string image2 {get;set;}

        public string image3 {get;set;}

        public string image4 {get;set;}

    }
}