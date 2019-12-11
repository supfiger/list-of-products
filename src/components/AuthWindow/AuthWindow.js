import React, { Component } from "react";
import cn from "classnames";

import "./AuthWindow.sass";

export default class AuthWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isRegisterShow: null,
      isLoginShow: null
    };
  }

  onClickLogin = () => {
    this.setState({
      isLoginShow: true,
      isRegisterShow: false
    });
  };

  onClickRegister = () => {
    this.setState({
      isRegisterShow: true,
      isLoginShow: false
    });
  };

  onChangeEmail = e => {
    let value = e.target.value;
    this.setState({
      email: value
    });
  };

  onChangePassword = e => {
    let value = e.target.value;
    this.setState({
      password: value
    });
  };

  onCloseWindow = () => {
    this.props.onClose && this.props.onClose();
    this.setState({
      isRegisterShow: null
    });
  };

  renderLoginWindow = () => {
    const {
      state: { email, password }
    } = this;

    return (
      <form action="" className="form">
        <div className="authClose" onClick={this.onCloseWindow}>
          X
        </div>
        <div className="formContent">
          <h1 className="formTitle">Вход</h1>
          <div className="formGroup">
            <input
              type="text"
              className="formInput"
              placeholder=" "
              value={email}
              onChange={this.onChangeEmail}
            />
            <label className="formLabel">Email</label>
          </div>
          <div className="formGroup">
            <input
              type="password"
              className="formInput"
              placeholder=" "
              value={password}
              onChange={this.onChangePassword}
            />
            <label className="formLabel">Пароль</label>
          </div>
          <button className="formButton">Войти</button>
        </div>
      </form>
    );
  };

  renderRegisterWindow = () => {
    const {
      state: { email, password }
    } = this;

    return (
      <form action="" className="form">
        <div className="authClose" onClick={this.onCloseWindow}>
          X
        </div>
        <div className="formContent">
          <h1 className="formTitle">Регистрация</h1>
          <div className="formGroup">
            <input
              type="text"
              className="formInput"
              placeholder=" "
              value={email}
              onChange={this.onChangeEmail}
            />
            <label className="formLabel">Email</label>
          </div>
          <div className="formGroup">
            <input
              type="password"
              className="formInput"
              placeholder=" "
              value={password}
              onChange={this.onChangePassword}
            />
            <label className="formLabel">Пароль</label>
          </div>
          <button className="formButton">Создать аккаунт</button>
        </div>
      </form>
    );
  };

  renderWindows = () => {
    const { isRegisterShow, isLoginShow } = this.state;
    return (
      <div className="windowSwitches">
        <div
          className={cn("swithItem", { swithItemActive: isLoginShow })}
          onClick={this.onClickLogin}
        >
          <div>Вход</div>
        </div>
        <div
          className={cn("swithItem", { swithItemActive: isRegisterShow })}
          onClick={this.onClickRegister}
        >
          <div>Регистрация</div>
        </div>
      </div>
    );
  };

  render() {
    const {
      state: { isRegisterShow, isLoginShow },
      props: { whatToShow, show }
    } = this;

    if (!show) {
      return null;
    }

    const checkRegister = isRegisterShow;
    const checkLogin = isLoginShow;

    return (
      <div className="authWrap">
        <div className="bgLayer"></div>
        <div className="windowWrap">
          {whatToShow && this.renderWindows()}
          {checkRegister && this.renderRegisterWindow()}
          {checkLogin && this.renderLoginWindow()}
        </div>
      </div>
    );
  }
}
