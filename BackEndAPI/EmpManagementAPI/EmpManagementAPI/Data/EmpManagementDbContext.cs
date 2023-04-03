using System;
using EmpManagementAPI.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace EmpManagementAPI.Data
{
	public class EmpManagementDbContext:DbContext
	{
		public EmpManagementDbContext(DbContextOptions options) : base(options){}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                    .Entity<Role>()
                    .HasData(Enum.GetValues(typeof(RoleTypeEnum))
                        .Cast<RoleTypeEnum>()
                        .Select(e => new Role
                        {
                            Id = (short)e,
                            RoleName = e.ToString()
                        })
            );

            modelBuilder.Entity<Employee>()
            .Property(e => e.RoleIds)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));

            modelBuilder
            .Entity<Manager>()
            .HasBaseType<Employee>();

        }

        public DbSet<Employee> Employees{get; set;}

        public DbSet<Manager> Managers { get; set; }

        public DbSet<Role> Roles { get; set; }
    }
}

