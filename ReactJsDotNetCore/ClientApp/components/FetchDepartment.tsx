import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from "react-router-dom";

interface IFetchDepartment {
  departmentList: DepartmentData[],
  loading: boolean;
};


export class FetchDepartment extends React.Component<RouteComponentProps<{}>, IFetchDepartment> {

  constructor() {
    super();
    this.state = { departmentList: [], loading:true };
    fetch('api/Department').then(response => response.json() as Promise<DepartmentData[]>).then(data => this.setState({
      departmentList: data,
      loading: false
    }));
  }

  public render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em>
        </p>
      : this.renderDepartmentList(this.state.departmentList);

    return <div>
      <h1>Department Data</h1>
      <p>
        <Link to="/addDepartment">Create New</Link>
      </p>
      {contents}
    </div>;
  }

  private handleDelete(id: number) {
    if (!confirm("Do you want to delete Student with Id: " + id))
      return;
    else {
      fetch('api/Department/Delete/' + id, {
        method: 'delete'
      }).then(data => {
        this.setState(
          {
            departmentList: this.state.departmentList.filter((rec) => {
              return (rec.departmentId !== id);
            })
          });
      });
    }
  }
  private handleEdit(id: number) {
    this.props.history.push("/Department/Edit/" + id);
  }

  private renderDepartmentList(departmentList : DepartmentData[]) {
    return <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Administrator</th>
          <th>Budget</th>
          <th>StartDate</th>
        </tr>
      </thead>
      <tbody>
        {departmentList.map(dpt =>
          <tr key={dpt.departmentId}>
            <td>{dpt.name}</td>
            <td>{dpt.administrator}</td>
            <td>{dpt.budget}</td>
            <td>{dpt.startDate}</td>
            <td>
              <a className="action" onClick={(id) => this.handleEdit(dpt.departmentId)}>Edit</a> |
              <a className="action" onClick={(id) => this.handleDelete(dpt.departmentId)}>Delete</a>
            </td>
          </tr>
          )}
      </tbody>
    </table>;
  }
}

export class DepartmentData
{
  departmentId: number = 0;
  name: string = "";
  budget: string = "";
  administrator: string = "";
  startDate: Date = new Date();
}