using System;
using System.Collections.Generic;

namespace ReactJsDotNetCore.Models
{
    public partial class Student
    {
        public Guid StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string GenderType { get; set; }
        public DateTime? DateOfBirth { get; set; }
    }
}
