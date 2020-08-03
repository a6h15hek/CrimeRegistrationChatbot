import police from '../img/police.png';
import firebase from './InitializeDatabase';
import 'firebase/firebase-firestore';
import $ from "jquery";
var CryptoJS = require("crypto-js");
class Dashboard extends HTMLElement{
    constructor(){
        super();
		this.innerHTML =`
	      <style type="text/css">
          .navbar-nav li .active {
            color: #7f00ff;
         }
         .navbar-nav > li a:hover {
            color: #7f00ff !important;
          }
        
          .navbar-nav li a {
            color: #555555;
            font-size: 25px;
            font-weight: 500;
            padding-right: 15px;
            padding-left: 15px;
          }
        
          #Complaints-Navbar {
            padding-top: 25px;
            padding-bottom: 25px;
            width: 100%;
            display: flex;
            justify-content: center;
        
          }
        
          #Complaints-Navbar .search-button button{
            background: #7f00ff;
            border-radius: 0px;
            border-color: white;
            color: #ffffff;
            font-weight: 600;
            width: 100px;
          }
        
          #Complaints-Navbar .search-button button:hover{
            background: #6900d3;
          }
        
          #Dashboard-nav {
            height: 200px;
            background-color: black;
            width: 100%;
          }
          
	      </style>
            
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
        <a class="navbar-brand" style="font-size: 30px;" href="#">Dashboard</a>
        </button>
            <form class="form-inline">
                <li class="nav-item pr-2" style="list-style: none;">
                    <img src='${police}' width="40px" height="40px">
                </li>
                <li class="nav-item" style="list-style: none;">
                    <div class="btn-group ">
                        <button type="button" class="btn btn-secondary dropdown-toggle bg-dark" style="border: none;"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                          <button class="dropdown-item" type="button">Signed in as:<br><strong>Rakesh Mathew</strong></button>
                          <hr>
                          <button class="dropdown-item" type="button">Profile</button>
                          <button class="dropdown-item" type="button">Messages</button>
                          <button class="dropdown-item" type="button">Change password</button>
                          <button class="dropdown-item" type="button" style="color: red;"><strong>Sign out</strong></button>
                        </div>
                      </div>
                </li>
            </form>
      </nav>

    <h2 class="pt-3 pb-3" style="text-align: center; background-color: #f7f7f7; margin: 0em;">Registered Complaints</h2>



    <nav id="Complaints-Navbar" class="navbar navbar-light" style="background-color: #f7f7f7; margin: 0;">

        <form class="form-inline">
            <select class="form-control mr-3" style="width: 200px ;" id="sel1">
                <option>option-1</option>
                <option>option-2</option>
                <option>option-3</option>
                <option>option-4</option>
            </select>
            <input class="form-control " style="width: 375px;" type="search" placeholder="Search" aria-label="Search">
            <div class="search-button pl-3"><button class="btn btn-outline-primary " type="submit">Search</button></div>
        </form>
    </nav>
    <div class= "complaint-card">

    </div>
  
       
 `;

    }
    connectedCallback(){
      var database = firebase.firestore().collection('complaints');
      database.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var CrimeData = doc.data();
          var bytes = CryptoJS.AES.decrypt(CrimeData.data, process.env.ENCRYPTION_KEY);
          var decryptedCrimeDataObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          console.log(decryptedCrimeDataObject);
          var template = ` <div class="card  mt-4 mb-4" style="width: 75%; margin: auto; border-color: #99b898; background-color: #f7f7f7;">
                                <div class="card-body">
                                      <h5 class="card-title text-center">Complaint Number : ${decryptedCrimeDataObject.ComplaintNo}</h5>
                                    <ul class= "questionList" style="list-style-type: none;">
                                        <li><strong>Name</strong> : ${decryptedCrimeDataObject.name}</li>
                                        <li><strong>Subject</strong> :${decryptedCrimeDataObject.Subject}</li>
                                        <li><strong>Date of Complaint</strong> : ${CrimeData.Date.toDate()}</li>
                                        <li><strong>Phone</strong> : ${decryptedCrimeDataObject.phoneno}</li>
                                        <li><strong>State</strong> : ${decryptedCrimeDataObject.state}</li>
                                        <li><strong>Description</strong> :  ${decryptedCrimeDataObject.Description} </li>
                                        <li><strong>Device Info</strong> :  ${decryptedCrimeDataObject.deviceInfo.data} </li>
                                        <li><strong>${decryptedCrimeDataObject.crimeResponse[0].key}</strong> :  ${decryptedCrimeDataObject.crimeResponse[0].data} </li>
                                        <li><strong>${decryptedCrimeDataObject.crimeResponse[1].key}</strong> :  ${decryptedCrimeDataObject.crimeResponse[1].data} </li>
                                        <li><strong>${decryptedCrimeDataObject.crimeResponse[2].key}</strong> :  ${decryptedCrimeDataObject.crimeResponse[2].data} </li>
                                        <li><strong>${decryptedCrimeDataObject.crimeResponse[3].key}</strong> :  ${decryptedCrimeDataObject.crimeResponse[2].data} </li>
                                        <li><strong>${decryptedCrimeDataObject.crimeResponse[4].key}</strong> :  ${decryptedCrimeDataObject.crimeResponse[2].data} </li>
                                    </ul>
                                </div>
                            </div>`;               
          $(".complaint-card").append(template);
        })
      })
    }
  }
  export default Dashboard;