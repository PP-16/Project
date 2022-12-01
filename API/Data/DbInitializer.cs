using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            #region Identityสร้างข้อมูล User
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "teest",
                    Email = "teest@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd"); //ทำการ hash Password
                await userManager.AddToRoleAsync(user, "Member"); // มี Role เดียว

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd"); //ทำการ hash Password
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" }); //มีหลาย Roles
            }
            #endregion

        }

    }
}