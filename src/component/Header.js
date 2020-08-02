import header_image from "../img/header-image.png";
import firebase from "./InitializeDatabase";
import $ from "jquery";
class Header extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div class="sticky">
        <!------------------------Header------------------------------>
        <header>
            <div class="container ">
                <div class="row">

                    <div class="col-md-4 col-sm-5">
                        <img src="${header_image}" width="170" height="65">
                    </div>

                    <div class="col-md-8 col-sm-7 text-align-right">
                        <span class="phone-icon"><i class="fa fa-phone"></i> <a href="#">Contact</a></span>
                        <span class="date-icon"><i class="fa fa-calendar-plus-o "></i><a href="#"> Helpline</a></span>
                        <span class="email-icon"><i class="fa fa-envelope-o"></i> <a href="#">info@company.com</a></span>
                    </div>

                </div>
            </div>
        </header>
        <!-----------------------Header----------------------------->
        
        <!-----------------------Navbar------------------------------->

        <nav id="Navbar" class="navbar navbar-expand-lg navbar-light bg-light">

            <a class="navbar-brand" href="#">National Crime Reporting Portal</a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto  mt-2 mt-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active smoothScroll" href="Homepage">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link smoothScroll" href="TrackComplaint">Track Complaint</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link smoothScroll" href="LoginPoliceIncharge">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link smoothScroll" href="">News</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </li>
                        <li class="register-btn"><a  href="RegisterComplaint" type="button" class="btn btn-primary btn-lg" id="register">Register Complaint</a></li>
                        <li class="register-btn"><a  href="Homepage" type="button" class="btn btn-primary btn-lg" id="signout" style="display:none">Exit Portal</a></li>
                    </ul>
            </div>
        </nav>
    </div>
    `;
  }
  connectedCallback() {
    document.getElementById("signout").addEventListener("click", () => {
      firebase.auth().signOut().catch(function (error) {
          console.log("Error : ", error);
        }).then(function(){
          sessionStorage.clear();
        });
    });
  }

  static get observedAttributes() {
    return ["register-signout-btn"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "register-signout-btn") {
      var registerBtn = document.getElementById("register");
      var signoutBtn = document.getElementById("signout");
      if (newValue == "register") {
        registerBtn.style.display = "block";
        signoutBtn.style.display = "none";
      } else if (newValue == "signout") {
        registerBtn.style.display = "none";
        signoutBtn.style.display = "block";
      }
    }
  }
}

export default Header;
