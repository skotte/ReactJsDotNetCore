using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactJsDotNetCore.Models;

namespace ReactJsDotNetCore.Controllers
{
  [Produces("application/json")]
  [Route("api/Student")]
  public class StudentController : Controller
  {
    public readonly StudentService StudentService = new StudentService();

    // GET: api/Student
    [HttpGet]
    public IEnumerable<Student> Get()
    {
      return StudentService.GetAll();
    }

    // GET: api/Student/5
    [HttpGet]
    [Route("Details/{id}")]
    public Student Get(Guid id)
    {
      return StudentService.GetById(id);
    }

    // POST: api/Student
    [HttpPost]
    [Route("Create")]
    public void Post(Student value)
    {
      StudentService.Add(value);
    }

    // PUT: api/Student/5
    [HttpPut]
    [Route("Edit")]
    public void Put(Student value)
    {
      StudentService.Update(value);
    }

    // DELETE: api/ApiWithActions/5
    [HttpDelete]
    [Route("Delete/{id}")]
    public void Delete(Guid id)
    {
      StudentService.Delete(id);
    }
  }
}
