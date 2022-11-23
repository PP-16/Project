using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.RequestHelpers
{
       public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateProductDto, Product>(); //from CreateProductDto to Product
            CreateMap<UpdateProductDto, Product>();

            CreateMap<CreateSenderDto, Sender>();
            CreateMap<UpdateSenderDto, Sender>();

            CreateMap<CreateCategoryDto, Category>();
            CreateMap<UpdateCategoryDto, Category>();

            CreateMap<VoucherDto, Voucher>();


            CreateMap<CreateStockDto, Stock>();
            CreateMap<UpdateStockDto, Stock>();

            CreateMap<CreateReviewDto, Review>();
            CreateMap<UpdateReviewDto, Review>();



            


        }
    }
}