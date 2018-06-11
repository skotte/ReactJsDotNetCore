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
    [HttpGet("{id}", Name = "Get")]
    [Route("/Details/{id}")]
    public Student Get(Guid id)
    {
      return StudentService.GetById(id);
    }

    // POST: api/Student
    [HttpPost]
    [Route("/Create")]
    public void Post([FromBody] Student value)
    {
      StudentService.Add(value);
    }

    // PUT: api/Student/5
    [HttpPut("{id}")]
    [Route("/Edit")]
    public void Put(int id, [FromBody] Student value)
    {
      StudentService.Update(value);
    }

    // DELETE: api/ApiWithActions/5
    [HttpDelete("{id}")]
    [Route("/Delete")]
    public void Delete(Guid id)
    {
      StudentService.Delete(id);
    }
  }
}
