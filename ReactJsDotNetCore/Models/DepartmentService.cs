using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactJsDotNetCore.Models
{
    public class DepartmentService
    {
        private readonly SchoolContext _db = new SchoolContext();

        public IEnumerable<Department> GetAll()
        {
            try
            {
                return _db.Department.ToList();
            }
            catch
            {
                throw;
            }
        }

        //To Add new department record     
        public int Add(Department department)
        {
            try
            {
                _db.Department.Add(department);
                _db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //To Update the records of a particluar department    
        public int Update(Department department)
        {
            try
            {
                _db.Entry(department).State = EntityState.Modified;
                _db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular department    
        public Department GetById(Guid id)
        {
            try
            {
                var department = _db.Department.Find(id);
                return department;
            }
            catch
            {
                throw;
            }
        }

        //To Delete the record of a particular department    
        public int Delete(Guid id)
        {
            try
            {
                var department = _db.Department.Find(id);
                _db.Department.Remove(department);
                _db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
