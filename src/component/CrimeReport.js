import National_Emblem from "../img/National.png";
class CrimeReport extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <div id="cv" class="instaFade">
        <div class="mainDetails">
          <div id="headshot" class="quickFade">
            <img class="Emblem" src="${National_Emblem}" alt="National_Emblem" />
          </div>
  
          <div id="name">
            <h2 class="quickFade delayThree title">
              COMPLAINT REGISTRATION FORM
            </h2>
          </div>
  
          <div id="contactDetails" class="quickFade delayFour">
            <!-- <ul>
              <li>
                Date:
                <span id="Date">11/11/1111</span>
              </li>
              <li>Time: <span id="Time">10:10 am</span></li>
              <li>Helpline No.: <span id="Helpline">1234567890</span></li>
            </ul> -->
            <table class="helplineTable">
              <thead>
                <tr>
                  <th class="contactHeading" scope="row">Date:</th>
                  <td id="Date">11/11/2020</td>
                </tr>
                <tr>
                  <th class="contactHeading" scope="row">Time:</th>
                  <td id="Time">10:10 am</td>
                </tr>
                <tr>
                  <th class="contactHeading" scope="row">Helpline No. :</th>
                  <td id="Helpline">1234567890</td>
                </tr>
              </thead>
            </table>
          </div>
          <div class="clear"></div>
        </div>
  
        <div id="mainArea" class="quickFade delayFive Content">
          <section>
            <article>
              <div class="sectionTitle">
                <div class="PersonalDetails"><h1>Personal Information</h1></div>
              </div>
  
              <div class="sectionContent">
                <table class="table table-borderless">
                  <!-- <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead> -->
                  <tbody>
                    <tr>
                      <th class="Labels" scope="row">Complaint No.:</th>
                      <td id="ComplaintNo">XXXXXXXXXXXXXX</td>
                    </tr>
                    <tr>
                      <th class="Labels" scope="row">Name:</th>
                      <td id="Name">John Doe</td>
                    </tr>
                    <tr>
                      <th class="Labels" scope="row">Gender:</th>
                      <td id="Gender">Male</td>
                    </tr>
                    <tr>
                      <th class="Labels" scope="row">Phone No.:</th>
                      <td id="PhoneNo">1234567890</td>
                    </tr>
                    <tr>
                      <th class="Labels" scope="row">Email Id:</th>
                      <td id="EmailId">abc@xyz.com</td>
                    </tr>
                    <tr>
                      <th class="Labels" scope="row">Address:</th>
                      <td id="Address">221B baker's Street London</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
            <div class="clear"></div>
          </section>
  
          <section>
            <div class="sectionTitle">
              <h1>Crime Description</h1>
            </div>
  
            <div class="sectionContent">
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <th class="Labels" scope="row">Subject:</th>
                    <td id="CrimeSubject">Lorem ipsum</td>
                  </tr>
                  <tr>
                    <th class="Labels" scope="row">Description:</th>
                    <td id="CrimeDescription">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                      occaecat cupidatat non proident, sunt in culpa qui officia
                      deserunt mollit anim id est laborum.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="clear"></div>
          </section>
  
          <section>
            <div class="sectionTitle">
              <h1>Questions</h1>
            </div>
  
            <div class="sectionContent">
              <div class="QnA">
                <p id="Question" class="Question">What Happened with you?</p>
                <p id="Answer" class="Answer">i was robbed</p>
              </div>
              <div class="QnA">
                <p id="Question" class="Question">When Did it happen?</p>
                <p id="Answer" class="Answer">Today morning</p>
              </div>
            </div>
            <div class="clear"></div>
          </section>
        </div>
      </div>
        `;
  }
  connectedCallback() {}
  setName(name) {
    document.getElementById("Name").innerHTML = name;
  }
  getName() {
    return document.getElementById.innerHTML;
  }
  setComplaint(complaint) {
    document.getElementById("ComplaintNo").innerHTML = complaint;
  }
  getComplaint() {
    return document.getElementById.innerHTML;
  }
  setGender(gender) {
    document.getElementById("Gender").innerHTML = gender;
  }
  getGender() {
    return document.getElementById.innerHTML;
  }
  setPhno(phno) {
    document.getElementById("PhoneNo").innerHTML = phno;
  }
  getPhno() {
    return document.getElementById.innerHTML;
  }
  setEmailId(emailId) {
    document.getElementById("EmailId").innerHTML = emailId;
  }
  getEmailId() {
    return document.getElementById.innerHTML;
  }
  setAddress(address) {
    document.getElementById("Address").innerHTML = address;
  }
  getAddress() {
    return document.getElementById.innerHTML;
  }
  setSubject(subject) {
    document.getElementById("CrimeSubject").innerHTML = subject;
  }
  getSubject() {
    return document.getElementById.innerHTML;
  }
  setDescription(des) {
    document.getElementById("CrimeDescription").innerHTML = des;
  }
  getDescription() {
    return document.getElementById.innerHTML;
  }
}
export default CrimeReport;
