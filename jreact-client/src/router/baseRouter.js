import { BrowserRouter, Route, Switch, Redirect ,NavLink} from 'react-router-dom';
import React from 'react'
import Login from '../pages/user/login'
import DashBord from '../pages/dashBord/dashBord'
import { PrivateRoute} from "./privateRoute";

class BaseRouter extends React.Component{
    render(){
      return (
      <div>
        {/* switch 中只会匹配到一个url的，只要匹配到就直接返回 */}
        <Switch>
             <div className="container">
                <PrivateRoute  path="/" exact component={DashBord} />
                <Route path="/login" component={Login} />
            </div>
        </Switch>
        </div>)
    }
}
export default BaseRouter;
