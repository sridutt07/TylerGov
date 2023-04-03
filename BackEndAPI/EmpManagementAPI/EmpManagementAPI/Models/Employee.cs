using System;
using System.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmpManagementAPI.Models
{
	public class Employee
	{
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool isManager { get; set; }

        public int EmployeeId { get; set; }

        public int? ManagerEmployeeId { get; set; }

        public string[] RoleIds { get; set; }

    }
}

