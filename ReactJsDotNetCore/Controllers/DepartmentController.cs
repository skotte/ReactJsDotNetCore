using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using ReactJsDotNetCore.Models;

namespace ReactJsDotNetCore.Controllers
{
    [Produces("application/json")]
    [Route("api/Department")]
    public class DepartmentController : Controller
    {
        public DepartmentService DepartmentService = new DepartmentService();
        // GET: api/Department
        [HttpGet]
        public IEnumerable<Department> Get()
        {
            return DepartmentService.GetAll();
        }

        // GET: api/Department/5
        [HttpGet]
        [Route("Details/{id}")]
        public Department Get(Guid id)
        {
            return DepartmentService.GetById(id);
        }
        
        // POST: api/Department
        [HttpPost]
        [Route("Create")]
        public void Post(Department value)
        {
            DepartmentService.Add(value);
        }
        
        // PUT: api/Department/5
        [HttpPut]
        [Route("Edit")]
        public void Put(Department value)
        {
            DepartmentService.Update(value);
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete]
        [Route("Delete/{id}")]
        public void Delete(Guid id)
        {
            DepartmentService.Delete(id);
        }
    }
}
