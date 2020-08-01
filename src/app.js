import './scss/app.scss';
import Header from './component/Header';
import Footer from './component/Footer';
import Homepage from './component/Homepage';
import Register from './component/Register';
import Chabot from './component/Chatbot';
import Acknowledgement from './component/Acknowledgement';
//import TrackComplaint from './component/TrackComplaint';
import PageNotFound from './component/PageNotFound'
import firebase from './component/InitializeDatabase'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js'
import 'font-awesome/css/font-awesome.min.css'
import 'normalize.css'
import $ from "jquery";

var UrlPathArray = new String(window.location.pathname).slice(1).split("/");
console.log(UrlPathArray);
//defining htmltags from class
window.customElements.define("header-content", Header);
window.customElements.define("chatbot-main", Chabot); //to use  <chatbot-main/>
window.customElements.define("user-register", Register); // to use <user-register/>
window.customElements.define("homepage-content", Homepage); // to use <homepage-content/>
window.customElements.define("acknowledgement-table", Acknowledgement); // to use <acknowledgement-table/>
//window.customElements.define("track-complaint", TrackComplaint); // to use <track-complaint/>

const app = () => {
  document.getElementById("header").innerHTML = `<header-content/>`;
  document.getElementById("footer").innerHTML = Footer();

  //setting up the data change 
    var headerControl = document.querySelector("header-content");
    switch(UrlPathArray[0]){
      case "":
      case "Homepage":
            //homePage
            document.getElementById("mainContent").innerHTML = `<homepage-content/>`;
            //for fixed header on scroll
            $(window).scroll(function () {
            var sticky = $('.sticky'),
                scroll = $(window).scrollTop();
            if (scroll >= 150) sticky.addClass('fixed');
            else sticky.removeClass('fixed');
            });
            break;      
        case "RegisterComplaint":
            //RegisterComplaint
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    headerControl.setAttribute("register-signout-btn", "signout");
                    document.getElementById("mainContent").innerHTML = `<div class="container-fluid">
                                                                            <div class="row">
                                                                                <div class="col-lg">
                                                                                    <chatbot-main state="cmVnaXN0ZXI"/>
                                                                                </div>
                                                                                <div class="col">
                                                                                    2 of 2
                                                                                </div>
                                                                            </div>
                                                                        </div>`;
                } else {
                    // No user is signed in.
                    document.getElementById("mainContent").innerHTML = `<user-register/>`;
                    headerControl.setAttribute("register-signout-btn", "register");
                }
            });
            break;
        case "RegisterComplaint":
            //RegisterComplaint
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    document.getElementById("mainContent").innerHTML = `<div class="container-fluid">
                                                                            <div class="row">
                                                                                <div class="col-lg">
                                                                                    <chatbot-main state="YW5vbnltb3Vz"/>
                                                                                </div>
                                                                                <div class="col">
                                                                                    2 of 2
                                                                                </div>
                                                                            </div>
                                                                        </div>`;
                    headerControl.setAttribute("register-signout-btn", "signout");
                    
                } else {
                    // No user is signed in.
                    document.getElementById("mainContent").innerHTML = `<user-register/>`;
                    headerControl.setAttribute("register-signout-btn", "register");
                }
            });
            break;    
        case "RegisterComplaintAnonymously":
                    document.getElementById("mainContent").innerHTML = `<div class="container-fluid">
                                                                            <div class="row">
                                                                                <div class="col-lg">
                                                                                    <chatbot-main state="YW5vbnltb3Vz"/>
                                                                                </div>
                                                                                <div class="col">
                                                                                    2 of 2
                                                                                </div>
                                                                            </div>
                                                                        </div>`;
            break;     
        case "TrackComplaint":
            //Track Complaint
            document.getElementById("mainContent").innerHTML = "<h1>Track Complaint</h1>";
            break;
        default:
        //404 not found page Error
        document.getElementById("mainContent").innerHTML = PageNotFound();
    }
};
//initilizing app
app();

