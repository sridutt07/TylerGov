using System;
using System.Drawing;

namespace EmpManagementAPI.Models 
{
	public class Manager : Employee
    {
        public string TeamName { get; set; }

		public ICollection<Employee> Employees { get; set; }

    }


}

