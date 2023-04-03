using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmpManagementAPI.Data;
using EmpManagementAPI.Models;

namespace EmpManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly EmpManagementDbContext _empDbContext;

        public EmployeesController(EmpManagementDbContext empDbContext)
        {
            _empDbContext = empDbContext;
        }

        [HttpGet("GetAllEmployees")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _empDbContext.Employees.ToListAsync();

            return Ok(employees);
        }

        [HttpGet("GetAllRoles")]
        public async Task<IActionResult> GetAllRoles()
        {
            var Roles = await _empDbContext.Roles.ToListAsync();

            return Ok(Roles);
        }

        [HttpGet("GetAllManagers")]
        public IActionResult GetAllManagers()
        {
            var employees = _empDbContext.Employees.Where(e => e.isManager == true).ToList();

            if (employees != null)
            {
                return Ok(employees);

            }

            return NotFound("Manager Not Found");
        }

        [HttpGet("GetEmpFromMangerId")]
        public IActionResult GetEmpFromMangerId(int managerId)
        {
            var employees = _empDbContext.Employees.Where(e => e.ManagerEmployeeId == managerId).ToList();

            if (employees != null)
            {
                return Ok(employees);

            }

            return NotFound("Manager Not Found");
        }

        [HttpPost("AddEmployee")]
        public async Task<IActionResult> AddEmployee([FromBody] Employee empToAdd)
        {
            //TypeCasting the enum 
            int director = (int)RoleTypeEnum.Director;

            var isDirector = empToAdd.RoleIds.Contains(director.ToString());

            if (isDirector || empToAdd.ManagerEmployeeId == null)
            {
                empToAdd.isManager = true;
            }

            await _empDbContext.Employees.AddAsync(empToAdd);

            await _empDbContext.SaveChangesAsync();

            return Ok(empToAdd);
        }

    }
}