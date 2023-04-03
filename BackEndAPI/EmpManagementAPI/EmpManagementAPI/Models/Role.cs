using System;
using System.ComponentModel.DataAnnotations;

namespace EmpManagementAPI.Models
{
	public class Role
	{
		[Key]
		public int Id { get; set; }

		public string RoleName { get; set; }

    }

    public enum RoleTypeEnum
    {
        Director = 1,
        IT = 2,
        Support = 3,
        Accounting = 4,
        Analyst = 5,
        Sales = 6
    }
}

