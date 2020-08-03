import police from '../img/police.png';
class RegistertedComplaints extends HTMLElement{
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

    <div class="card  mt-4 mb-4" style="width: 75%; margin: auto; border-color: #99b898; background-color: #f7f7f7;">
        <div class="card-body">
            <h5 class="card-title text-center">Complaint Number : XXXXXX</h5>
            <ul style="list-style-type: none;">
                <li><strong>Name</strong> : Akshit Panday</li>
                <li><strong>Subject</strong> : Subject of the Complaint Here</li>
                <li><strong>Date</strong> : 20/12/19</li>
                <li><strong>Phone</strong> : XXXXXXXXXX</li>
                <li><strong>Description</strong> : eujd jnn ubu inoimoim qonqam unednjnj ninon ninin ninim imoinninn
                    kokok okaokopk oksokok pafkkkkkkkkkd wodoko dlplaas kmkmk <strong><a style="color: #6900d3;"
                            href="#"> more...</a></strong></li>
            </ul>
        </div>
    </div>

    <div class="card  mt-4 mb-4" style="width: 75%; margin: auto; border-color: #99b898; background-color: #f7f7f7;">
        <div class="card-body">
            <h5 class="card-title text-center">Complaint Number : XXXXXX</h5>
            <ul style="list-style-type: none;">
                <li><strong>Name</strong> : Akshit Panday</li>
                <li><strong>Subject</strong> : Subject of the Complaint Here</li>
                <li><strong>Date</strong> : 20/12/19</li>
                <li><strong>Phone</strong> : XXXXXXXXXX</li>
                <li><strong>Description</strong> : eujd jnn ubu inoimoim qonqam unednjnj ninon ninin ninim imoinninn
                    kokok okaokopk oksokok pafkkkkkkkkkd wodoko dlplaas kmkmk <strong><a style="color: #6900d3;"
                            href="#"> more...</a></strong></li>
            </ul>
        </div>
    </div>    

    <footer class="page-footer font-small  pt-4 pb-4 text-center bg-dark " style="color: white;">
        <div class="footer-copyright text-center py-3">© 2020 Copyright:
            <a> Crime Registeration Portal</a>
        </div>
    </footer> `;

    }
}
export default RegistertedComplaints ;