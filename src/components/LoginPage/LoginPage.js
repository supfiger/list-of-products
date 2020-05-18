import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { loginUser } from "../../api.js";
import "./LoginPage.sass";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: false,
    };
  }

  fetchLoginUser = async (e) => {
    e.preventDefault();
    const isValid = this.validate();

    try {
      if (isValid) {
        const { username, password } = this.state;
        const result = await loginUser({ username, password });

        if (result.success) {
          this.props.onLogin(result.token, username);
        } else {
          this.setState({
            error: result.message,
          });
        }
      }
    } catch (error) {
      this.setState({
        error: error,
      });
    }
  };

  validate = () => {
    const { username, password } = this.state;
    let error = "";

    if (username === "" && password === "") {
      error = "Вы не можете оставить поля пустыми";
    } else if (username === "" || /^\s+$/.test(username)) {
      error = "Вы должны ввести юзернейм";
    } else if (password === "") {
      error = "Вы должны ввести пароль";
    }

    if (error) {
      this.setState({
        error,
      });
      return false;
    }
    return true;
  };

  onChangeUsername = (e) => {
    let val = e.target.value;

    if (!val.match(/\s/)) {
      this.setState({
        username: val,
      });
    }
  };

  onChangePassword = (e) => {
    let val = e.target.value;
    this.setState({
      password: val,
    });
  };

  render() {
    const {
      state: { username, password, error },
    } = this;

    if (this.props.isAuth) {
      return <Redirect to="/list-of-products" />;
    }

    return (
      <div className="loginWrap">
        <form className="form">
          <div className="formContent">
            <h1 className="formTitle">Вход</h1>
            <div className="formGroup">
              <label htmlFor="loginUsernameArea">Юзернейм</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={this.onChangeUsername}
                id="loginUsernameArea"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="loginPasswordArea">Пароль</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={this.onChangePassword}
                id="loginPasswordArea"
                required
              />
            </div>
            <div className="btnWrap">
              <button
                className="btnAuth btn btn-primary "
                type="submit"
                onClick={this.fetchLoginUser}
              >
                Войти
              </button>
            </div>
            {error && <div className="errorMessage">{error}</div>}
          </div>
        </form>
      </div>
    );
  }
}
