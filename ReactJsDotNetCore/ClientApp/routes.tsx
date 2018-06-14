import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { AddStudent } from './components/AddStudent'; 
import { FetchStudent } from './components/FetchStudent';
import { AddDepartment } from './components/AddDepartment'; 
import { FetchDepartment } from './components/FetchDepartment';

export const routes = <Layout>
                        <Route exact path='/' component={ Home }/>
                        <Route path='/counter' component={ Counter }/>
                        <Route path='/fetchdata' component={FetchData}/>
                        <Route path='/fetchstudent' component={FetchStudent}/>
                        <Route path='/addstudent' component={AddStudent}/>
                        <Route path='/student/edit/:studentid' component={AddStudent}/>
                        <Route path='/fetchdepartment' component={FetchDepartment}/>
                        <Route path='/adddepartment' component={AddDepartment}/>
                        <Route path='/department/edit/:departmentid' component={AddDepartment}/>
                      </Layout>;
