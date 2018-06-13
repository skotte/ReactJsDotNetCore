import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
interface IFetchStudentDataState {
  studentList: StudentData[];
  loading: boolean;
}
export class FetchStudent extends React.Component<RouteComponentProps<{}>, IFetchStudentDataState> {
  constructor() {
    super();
    this.state = { studentList: [], loading: true };
    fetch('api/Student')
      .then(response => response.json() as Promise<StudentData[]>)
      .then(data => {
        this.setState({ studentList: data, loading: false });
      });
    // This binding is necessary to make "this" work in the callback  
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  public render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderStudentTable(this.state.studentList);
    return <div>
      <h1>Student Data</h1>
      <p>This component demonstrates fetching Student data from the server.</p>
      <p>
        <Link to="/addStudent">Create New</Link>
      </p>
      {contents}
    </div>;
  }
  // Handle Delete request for an Student  
  private handleDelete(id: number) {
    if (!confirm("Do you want to delete Student with Id: " + id))
      return;
    else {
      fetch('api/Student/Delete/' + id, {
        method: 'delete'
      }).then(data => {
        this.setState(
          {
            studentList: this.state.studentList.filter((rec) => {
              return (rec.studentId !== id);
            })
          });
      });
    }
  }
  private handleEdit(id: number) {
    this.props.history.push("/Student/Edit/" + id);
  }
  // Returns the HTML table to the render() method.  
  private renderStudentTable(studentList: StudentData[]) {
    return <table className='table'>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Gender</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {studentList.map(emp =>
          <tr key={emp.studentId}>
            <td></td>
            <td>{emp.firstName} {emp.lastName}</td>
            <td>{emp.genderType === "M" ? "Male" : emp.genderType === "F" ? "Female" : ""}</td>
            <td>
              <a className="action" onClick={(id) => this.handleEdit(emp.studentId)}>Edit</a> |
              <a className="action" onClick={(id) => this.handleDelete(emp.studentId)}>Delete</a>
            </td>
          </tr>
        )}
      </tbody>
    </table>;
  }
}

export class StudentData {
  studentId: number = 0;
  firstName: string = "";
  lastName: string = "";
  genderType: string = "";
}