import firebase from "./InitializeDatabase";
import "firebase/firebase-auth";
class LoginForm extends HTMLElement {
  userInfo = null;
  constructor() {
    super();
    this.innerHTML = `
          <style>
        #form {
          background-color: #f5f5f5;
          padding: 5px 40px 40px 40px;
        }
        .register {
          font-size: 30px;
          font-family: Times new roman;
          border-bottom-style: ridge;
        }
  
        .text {
          height: 43px;
        }
  
        .field-label {
          font-size: 18px;
        }
        .btn-primary {
          background-color: #7f00ff;
          border: 0px;
          margin:auto;
          margin-top: 35px;
  
        }
        .password{
          margin-bottom: 10px;
        }
  
      </style>
      <div class="container">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6" id="form">
            <p class="h1" style="text-align: center; margin: 20px 0px;">
              Login
            </p>
            <div class="bs-component" style="margin: 20px 0px;">
              <div
                class="alert alert-dismissible alert-danger collapse"
                id="debugMessageLayout"
              >
                <button class="close" type="button" data-dismiss="alert">
                  &times;</button
                ><message id="messageDebug"></message>
              </div>
            </div>
            <form class="loginForm">
              <div class="form-group">
                <label for="email">Enter your Email Id:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-control text"
                  placeholder="Enter Your Email Id"
                  required
                  autofocus
                />
              </div>
              <div class="form-group">
                <label for="password">Enter your Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  class="form-control text password"
                  placeholder="Enter Your password"
                  required
                />
              </div>
              <div class="loginButton">
                <button id="log-in-button" type="button" class="btn btn-primary btn-block">Login</button>
              </div>
            </form>
          `;
  }
  connectedCallback() {
    document
      .getElementById("log-in-button")
      .addEventListener("click", () => this.signingIn());
  }

  signingIn() {
    this.userInfo = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    var msgstatus = document.getElementById("messageDebug");

    var debugMessageLayout = document.getElementById("debugMessageLayout");

    if (
      !this.isAllInputDataValid(this.userInfo, msgstatus, debugMessageLayout)
    ) {
      return;
    } else {
      firebase.auth().signInWithEmailAndPassword(this.userInfo.email,this.userInfo.password)
        .catch(function (error) {
          document.getElementById("messageDebug").innerHTML =" Not SignedIn !" + error;
          var DebugMessageLayout = document.getElementById("debugMessageLayout");
          DebugMessageLayout.classList.remove("alert-success");
          DebugMessageLayout.classList.remove("collapse");
          DebugMessageLayout.classList.add("alert-danger");
          // ...
        })
        .then(function () {
          document.getElementById("messageDebug").innerHTML ="Sign in Approved";
          var DebugMessageLayout = document.getElementById("debugMessageLayout");
          DebugMessageLayout.classList.remove("alert-danger");
          DebugMessageLayout.classList.remove("collapse");
          DebugMessageLayout.classList.add("alert-success");
        });
    }
  }
  isAllInputDataValid(userInfo, msgstatus, debugMessageLayout) {
    debugMessageLayout.classList.remove("alert-success");
    debugMessageLayout.classList.add("alert-danger");
    if (userInfo.email == null || userInfo.email.length == 0) {
      msgstatus.innerHTML = "Empty Email Id Field !!";
      document.getElementById("email").focus();
      debugMessageLayout.classList.remove("collapse");
      return false;
    }
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (userInfo.email.search(pattern) == -1) {
      msgstatus.innerHTML = "Invalid Email Id!!";
      document.getElementById("email").focus();
      debugMessageLayout.classList.remove("collapse");
      return false;
    }
    if (userInfo.password == null || userInfo.password.length == 0) {
      msgstatus.innerHTML = "Empty Password Field !!";
      document.getElementById("password").focus();
      debugMessageLayout.classList.remove("collapse");
      return false;
    }

    return true;
  }
}
export default LoginForm;
