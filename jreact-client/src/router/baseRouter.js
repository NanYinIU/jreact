import { Route, Switch } from 'react-router-dom';
import React from 'react'
import Login from '../pages/user/login'
import { PrivateRoute} from "./privateRoute";
import NotFoundPage from "../pages/error/NotFoundPage";
import dashBord from '../pages/dashBord/dashBord';
class BaseRouter extends React.Component{
    render(){
      return (
      <Switch>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/" component={dashBord}>
        </PrivateRoute>
      </Switch>
    )}
}
export default BaseRouter;
