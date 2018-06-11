using System;
using System.Collections.Generic;

namespace ReactJsDotNetCore.Models
{
    public partial class Department
    {
        public Guid DepartmentId { get; set; }
        public string Name { get; set; }
        public decimal? Budget { get; set; }
        public string Administrator { get; set; }
        public DateTime? StartDate { get; set; }
    }
}
