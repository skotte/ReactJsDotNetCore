import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from "react-router-dom";
import { DepartmentData } from "./FetchDepartment";
import { StudentData } from './FetchStudent';

export interface IAddDepartment {
  title: string;
  loading: boolean;
  departmentData: DepartmentData;
}

export class AddDepartment extends React.Component<RouteComponentProps<{}>, IAddDepartment> {
  constructor(props) {
    super(props);
    this.state = { title: "", loading: true, departmentData: new DepartmentData()  };
    var departmentId = this.props.match.params["departmentid"];

    if (departmentId) {
      fetch('api/Department/Details/' + departmentId)
        .then(response => response.json() as Promise<DepartmentData>)
        .then(data => {
          this.setState({ title: "Edit", loading: false, departmentData: data});
        });
    } else {
      this.state = { title: "Create", loading: false, departmentData: new DepartmentData()};
    }

    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  public render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderCreateForm();
    return <div>
             <h1>{this.state.title}</h1>
             <h3>Department</h3>
             <hr />
             {contents}
           </div>;
  }

  private handleSave(event:any) {
    event.preventDefault();
    const data = new FormData(event.target);
    // PUT request for Edit employee.  
    if (this.state.departmentData.departmentId) {
      fetch('api/Department/Edit', {
          method: 'PUT',
          body: data,
        }).then((response) => response.json())
        .then((responseJson) => {
          this.props.history.push("/fetchdepartment");
        });
    }
    // POST request for Add employee.  
    else {
      fetch('api/Department/Create', {
          method: 'POST',
          body: data,
        }).then((response) => response.json())
        .then((responseJson) => {
          this.props.history.push("/fetchdepartment");
        });
    }
  }

  private handleCancel(event: any) {
    event.preventDefault();
    this.props.history.push("/fetchdepartment");
  }

  private renderCreateForm() {
    return (
      <form onSubmit={this.handleSave} >
        <div className="form-group row" >
          <input type="hidden" name="departmentId" value={this.state.departmentData.departmentId} />
        </div>
        <div className="form-group row" >
          <label className=" control-label col-md-12" htmlFor="name">Name</label>
          <div className="col-md-4">
            <input className="form-control" type="text" name="name" defaultValue={this.state.departmentData.name} required />
          </div>
        </div >
        <div className="form-group row" >
          <label className=" control-label col-md-12" htmlFor="budget">Budget</label>
          <div className="col-md-4">
            <input className="form-control" type="number" name="budget" defaultValue={this.state.departmentData.budget} required />
          </div>
        </div >
        <div className="form-group row">
          <label className="control-label col-md-12" htmlFor="administrator">Administrator</label>
          <div className="col-md-4">
            <input className="form-control" type="text" name="administrator" defaultValue={this.state.departmentData.administrator} required />
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