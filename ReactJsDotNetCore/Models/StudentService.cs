using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactJsDotNetCore.Models
{
    public class StudentService
    {
    SchoolContext db = new SchoolContext();
    public IEnumerable<Student> GetAll()
    {
      try
      {
        return db.Student.ToList();
      }
      catch
      {
        throw;
      }
    }
    //To Add new employee record     
    public int Add(Student employee)
    {
      try
      {
        db.Student.Add(employee);
        db.SaveChanges();
        return 1;
      }
      catch
      {
        throw;
      }
    }
    //To Update the records of a particluar employee    
    public int Update(Student employee)
    {
      try
      {
        db.Entry(employee).State = EntityState.Modified;
        db.SaveChanges();
        return 1;
      }
      catch
      {
        throw;
      }
    }
    //Get the details of a particular employee    
    public Student GetById(Guid id)
    {
      try
      {
        Student employee = db.Student.Find(id);
        return employee;
      }
      catch
      {
        throw;
      }
    }
    //To Delete the record of a particular employee    
    public int Delete(Guid id)
    {
      try
      {
        Student emp = db.Student.Find(id);
        db.Student.Remove(emp);
        db.SaveChanges();
        return 1;
      }
      catch
      {
        throw;
      }
    }
    //To Get the list of Cities    
      public List<Department> GetCities()
      {
        List<Department> lstCity = new List<Department>();
        lstCity = (from CityList in db.Department select CityList).ToList();
        return lstCity;
      }
    }
}
