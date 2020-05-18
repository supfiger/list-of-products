import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  Navbar,
  ProductListPage,
  ProductPage,
  RegisterPage,
  LoginPage,
} from "./components/index";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: Boolean(localStorage.getItem("token")),
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token"),
    };
  }

  onLogin = (token, username) => {
    this.setState({
      isAuth: true,
      token,
      username,
    });

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };

  onLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    this.setState({
      isAuth: false,
      username: "",
    });
  };

  render() {
    const { isAuth, username, token } = this.state;

    return (
      <BrowserRouter>
        <div>
          <Navbar
            onLogout={this.onLogout}
            isAuth={isAuth}
            username={username}
          />
          <Switch>
            <Route exact path="/productlist" component={ProductListPage} />
            <Route
              exact
              path="/productlist/:id"
              render={(props) => (
                <ProductPage
                  {...props}
                  isAuth={isAuth}
                  username={username}
                  token={token}
                />
              )}
            />
            <Route
              exact
              path="/register"
              render={(props) => (
                <RegisterPage
                  {...props}
                  onLogin={this.onLogin}
                  isAuth={isAuth}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <LoginPage {...props} onLogin={this.onLogin} isAuth={isAuth} />
              )}
            />
            {isAuth && <Redirect to="/list-of-products/productlist" />}
            <Redirect from="/" to="/list-of-products/productlist" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
