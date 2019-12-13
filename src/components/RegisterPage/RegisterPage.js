import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { registerUser } from "../../api.js";
import "./RegisterPage.sass";

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: false
    };
  }

  fetchRegisterUser = async e => {
    e.preventDefault();
    const { username, password } = this.state;

    try {
      const result = await registerUser({ username, password });

      if (result.success) {
        this.props.onLogin(result.token, username);
      } else {
        this.setState({
          error: result.message
        });
      }
    } catch (error) {
      this.setState({
        error: error
      });
    }
  };

  onChangeUsername = e => {
    let val = e.target.value;
    val.trim();

    this.setState({
      username: val
    });
  };

  onChangePassword = e => {
    let val = e.target.value;
    val.trim();

    this.setState({
      password: val
    });
  };

  render() {
    const {
      state: { username, password, error }
    } = this;

    if (this.props.isAuth) {
      return <Redirect to="/" />;
    }

    return (
      <div className="registerWrap">
        <form className="form">
          <div className="formContent">
            <h1 className="formTitle">Регистрация</h1>
            <div className="formGroup">
              <label htmlFor="registerUsernameArea">Юзернейм</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={this.onChangeUsername}
                id="registerUsernameArea"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="registerPasswordArea">Пароль</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={this.onChangePassword}
                id="registerPasswordArea"
                required
              />
            </div>
            <div className="btnWrap">
              <button
                className="btnAuth btn btn-success "
                type="submit"
                onClick={this.fetchRegisterUser}
              >
                Создать аккаунт
              </button>
            </div>
            {error && <div className="errorMessage">{error}</div>}
          </div>
        </form>
      </div>
    );
  }
}
