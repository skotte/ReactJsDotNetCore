import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { StudentData } from './FetchStudent';
interface IAddStudentDataState {
  title: string;
  loading: boolean;
  studentData: StudentData;
}
export class AddStudent extends React.Component<RouteComponentProps<{}>, IAddStudentDataState> {
  constructor(props) {
    super(props);
    this.state = { title: "", loading: true, studentData: new StudentData };
    
    var studentId = this.props.match.params["studentid"];
    // This will set state for Edit employee  
    if (studentId) {
      fetch('api/Student/Details/' + studentId)
        .then(response => response.json() as Promise<StudentData>)  
        .then(data => {
          this.setState({ title: "Edit", loading: false, studentData: data });
        });
    }
    // This will set state for Add employee  
    else {
      this.state = { title: "Create", loading: false, studentData: new StudentData };
    }
    // This binding is necessary to make "this" work in the callback  
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  public render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderCreateForm();
    return <div>
      <h1>{this.state.title}</h1>
      <h3>Student</h3>
      <hr />
      {contents}
    </div>;
  }
  // This will handle the submit form event.  
  private handleSave(event: any) {
    event.preventDefault();
    const data = new FormData(event.target);
    // PUT request for Edit employee.  
    if (this.state.studentData.studentId) {
      fetch('api/Student/Edit', {
        method: 'PUT',
        body: data,
      }).then((response) => response.json())
        .then((responseJson) => {
          this.props.history.push("/fetchstudent");
        });
    }
    // POST request for Add employee.  
    else {
      fetch('api/Student/Create', {
        method: 'POST',
        body: data,
      }).then((response) => response.json())
        .then((responseJson) => {
          this.props.history.push("/fetchstudent");
        });
    }
  }
  // This will handle Cancel button click event.  
  private handleCancel(e: any) {
    e.preventDefault();
    this.props.history.push("/fetchstudent");
  }
  // Returns the HTML Form to the render() method.  
  private renderCreateForm() {
    return (
      <form onSubmit={this.handleSave} >
        <div className="form-group row" >
          <input type="hidden" name="studentId" value={this.state.studentData.studentId} />
        </div>
        <div className="form-group row" >
          <label className=" control-label col-md-12" htmlFor="firstName">First Name</label>
          <div className="col-md-4">
            <input className="form-control" type="text" name="firstName" defaultValue={this.state.studentData.firstName} required />
          </div>
        </div >
        <div className="form-group row" >
          <label className=" control-label col-md-12" htmlFor="lastName">Last Name</label>
          <div className="col-md-4">
            <input className="form-control" type="text" name="lastName" defaultValue={this.state.studentData.lastName} required />
          </div>
        </div >
        <div className="form-group row">
          <label className="control-label col-md-12" htmlFor="gendertype">Gender</label>
          <div className="col-md-4">
            <select className="form-control" data-val="true" name="gendertype" defaultValue={this.state.studentData.genderType} required>
              <option value="">-- Select Gender --</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
        </div >
        <div className="form-group">
          <button type="submit" className="btn btn-default">Save</button>
          <button className="btn" onClick={this.handleCancel}>Cancel</button>
        </div >
      </form >
    );
  }
} 
