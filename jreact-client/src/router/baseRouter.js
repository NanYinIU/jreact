import { Route, Switch } from 'react-router-dom';
import React from 'react'
import Login from '../pages/user/login'
import DashBoard from '../pages/dashBord/DashboardPage'
// import FormPage from '../pages/personal/FormPage'
import { PrivateRoute} from "./privateRoute";
import App from "../pages/App";
import NotFoundPage from "../pages/error/NotFoundPage";
class BaseRouter extends React.Component{
    render(){
      return (
      <Switch>
        <Route path="login" component={Login}/>
        <PrivateRoute  component={App}>
        </PrivateRoute>
      </Switch>
    )}
}
export default BaseRouter;
