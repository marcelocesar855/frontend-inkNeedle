import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {getUser} from './services/auth';
import routes from './routes';
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ 
            pathname: "/login", 
            state: { from: props.location } }} 
          />
        )
    }
  />
);

 class App extends Component {
  getRoutes = routes => {
    return routes.map((prop, key) => {
        if (!!prop.isAuth) {
          if (getUser() !== null) {
            if (getUser().userTypeId !== prop.isAuth) {
              return (<Redirect from={prop.path} to={prop.notPath} />);
            }
          } 
          return (
            <PrivateRoute
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        if((prop.path === '/login' || prop.path === '/cadastro_usuario') && getUser() !== null){
          return (<Redirect from={prop.path} to='/busca' />);
        }
        return (
          <Route
            path={prop.path}
            component={prop.component}
            key={key}
          />
        );
    });
  };

  render() {
    return (
     <BrowserRouter>
      <Switch> 
      {this.getRoutes(routes)}      
      </Switch>
     </BrowserRouter>
    );
  }
}

export default App;
