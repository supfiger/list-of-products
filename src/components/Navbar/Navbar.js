import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import "./Navbar.sass";

class Navbar extends Component {
  logout = () => {
    this.props.onLogout();
    this.props.history.push("/");
  };

  render() {
    return (
      <nav className="navbar navbar-expand navbar-light">
        <div className="container">
          <div className="row w-100">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navList navbar-nav d-flex w-100">
                <Link className="btn btn-dark navLinkHome mr-auto" to={`/`}>
                  Домой
                </Link>
                {this.props.isAuth ? (
                  <div className="navUserBlock">
                    <div className="navUser">{this.props.username}</div>
                    <div
                      onClick={this.logout}
                      className="btn btn-warning navLogOut"
                    >
                      Выйти ➔
                    </div>
                  </div>
                ) : (
                  <div className="navAuthWrap ml-auto">
                    <li className="nav-item navBtn">
                      <Link
                        className="nav-link navLoginBtn btn btn-light"
                        to={{
                          pathname: `/login`
                        }}
                      >
                        Вход
                      </Link>
                    </li>
                    <li className="nav-item navBtn">
                      <Link
                        className="nav-link navRegisterBtn btn btn-success "
                        to={{
                          pathname: `/register`
                        }}
                      >
                        Регистрация
                      </Link>
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
