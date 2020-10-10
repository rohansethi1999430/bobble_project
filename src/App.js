import React, { Component } from "react";
import logo from "./Logo.png";
import "./App.css";
import GoogleButton from "react-google-button";
import FacebookLogin from "react-facebook-login";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
    };
  }
  componentClicked = (response) => {
    console.log(response);
  };
  responseFacebook = (response) => {
    console.log(response);
    if (response.status == "unknown") {
      alert("Please Enter Valid Credintials");
    } else {
      alert("Registration Sucessfull!!");
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    // this.setState({
    //   firstname: null,
    //   lastname: null,
    //   email: null,
    //   password: null,
    // });
    let firstname = this.state.firstname;
    let lastname = this.state.lastname;
    let email = this.state.email;
    let password = this.state.password;
    console.log(firstname);
    console.log(lastname);
    this.postData("https://reqres.in/api/register", {
      email: email,
      password: password,
    }).then((data) => {
      if (data.error) {
        alert("Please Enter Valid Email and Passwords");
      } else {
        alert("Registered Sucessfully!!");
      }
    });
  };
  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name);
    let name = e.target.name;
    let value = e.target.value;
    let data = { ...this.state };
    data[name] = value;
    this.setState(data);
  };
  postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },

      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  };

  render() {
    return (
      <div className="wrapper">
        <header className="app-header">
          <p>Arcade Mind</p>
        </header>

        <div className="form-wrapper">
          <p>SIGN UP</p>
          <h1>Create Your Account</h1>
          <p>Gravida natoque quisque iaculis, conubia sapien.</p>
          <div className="login_buttons">
            <GoogleButton
              type="light" // can be light or dark
              onClick={() => {
                console.log("Google button clicked");
              }}
            />

            <FacebookLogin
              cssClass="f_btn"
              appId="834682300674151"
              autoLoad={true}
              fields="name,email,picture"
              callback={this.responseFacebook}
              icon="fa-facebook"
            />
          </div>
          <div className="separator">or</div>
          <form onSubmit={this.handleSubmit}>
            <div className="firstName">
              <input
                type="text"
                className=""
                placeholder="First Name"
                type="text"
                name="firstname"
                onChange={this.handleChange}
              />
            </div>

            <div className="lastName">
              <input
                type="text"
                className=""
                placeholder="Last Name"
                type="text"
                name="lastname"
                onChange={this.handleChange}
              />
            </div>

            <div className="email">
              <input
                type="text"
                className=""
                placeholder="Email"
                type="email"
                name="email"
                onChange={this.handleChange}
              />
            </div>

            <div className="password">
              <input
                type="text"
                className=""
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            <div className="createAccount">
              <small>
                By clicking Sing Up, you agree to our
                <a href="#"> Terms of Use</a> and <a href="">Privacy Policy</a>
              </small>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default App;
