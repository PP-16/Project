using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Voucher
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Detail { get; set; }
        public int Discount { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    }
}