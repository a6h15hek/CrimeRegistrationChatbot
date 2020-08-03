class Acknowledgement extends HTMLElement{
    constructor(){
        super();
        this.innerHTML =`<!---Acknowledgement UI Code follows-->
        <style>
            table {
               font-family: arial, sans-serif;
               border-collapse: collapse;
               border: 1px solid black;
               width: 80%;
            }
            td{
               border: dotted 1px #808080;
               text-align: left;
               padding: 8px;
            }
            th {
               height: 50px;
               border: dotted 1px #808080;
               text-align: center;
               padding: 8px;
            }
            tr:nth-child(even) {
               background-color: #dddddd;
            }
        </style>
        <table>
           <tr>
              <th colspan="2" text-align: center>CCTNS CITIZEN PORTAL- ONLINE COMPLAINT/INFORMATION ACKNOWLEDGEMENT</th>
           </tr>
           <tr>
              <td>Complaint Reference Number</td>
              <td id="ComplaintId"></td>
           </tr>
           <tr>
              <td>Date and Time of complaint</td>
              <td id="DateTime"></td>
           </tr>
           <tr>
              <td>Complaint Name</td>
              <td id="Name"></td>
           </tr>
           <tr>
              <td>State</td>
              <td id="state"></td>
           </tr>
           <tr>
              <td>Phone No</td>
              <td id="phone-no">Ariyalur</td>
           </tr>
           <tr>
              <td>Subject</td>
              <td id="Subject"></td>
           </tr>
           <tr>
              <td>Uploaded Documents</td>
              <td id="Documents">NO</td>
           </tr>
        </table>
        <form style="margin:20px 0px">
           <input type="button" class="btn btn-primary btn-lg" value="Go back!" onclick="history.go(-1)"/>
           <input type="button" class="btn btn-primary btn-lg" value="Print" onclick="window.print()"/>
        </form>
        <!---End of Acknowledgment Code-->`;

    }
   connectedCallback() {
      console.log(this.getAttribute("ComplaintId"));
      if (this.getAttribute("ComplaintId") != null && this.getAttribute("ComplaintId") != undefined ){
         this.setComplaintId(this.getAttribute("ComplaintId"))
      }
      if (this.getAttribute("dateAndTime") != null && this.getAttribute("dateAndTime") != undefined) {
         this.setDateTime(this.getAttribute("dateAndTime"))
      }
      if (this.getAttribute("NameOfComplainant") != null && this.getAttribute("NameOfComplainant") != undefined) {
         this.setName(this.getAttribute("NameOfComplainant"))
      }
      if (this.getAttribute("Subject") != null && this.getAttribute("Subject") != undefined) {
         this.setSubject(this.getAttribute("Subject"))
      }
      if (this.getAttribute("phoneNo") != null && this.getAttribute("phoneNo") != undefined) {
         this.setPhoneNo(this.getAttribute("phoneNo"))
      }
      if (this.getAttribute("state") != null && this.getAttribute("state") != undefined) {
         this.setState(this.getAttribute("state"))
      }
      if (this.getAttribute("documentUploaded") != null && this.getAttribute("documentUploaded") != undefined) {
         this.setDocuments(this.getAttribute("documentUploaded"));
      }
   }
   static get observedAttributes() {
      return ['data'];
   }
   attributeChangedCallback(name, oldValue, newValue){
      if(name==='data'){
         this.setComplaintId(newValue);
      }
   }
   setComplaintId(complaintid){
      document.getElementById('ComplaintId').innerHTML=complaintid;
   }
   getComplaintId(){
      return document.getElementById('ComplaintId').innerHTML;
   }
   setDateTime(datetime){
      document.getElementById('DateTime').innerHTML=datetime;
   }
   getDateTime(){
      return document.getElementById('DateTime').innerHTML;
   }
   setName(name){
      document.getElementById('Name').innerHTML=name;
   }
   getName(){
      return document.getElementById('Name').innerHTML;
   }
   setState(state){
      document.getElementById('state').innerHTML=state;
   }
   getState(){
      return document.getElementById('state').innerHTML;
   }
   setSubject(subject){
      document.getElementById('Subject').innerHTML=subject;
   }
   getSubject(){
      return document.getElementById('Subject').innerHTML;
   }
   setDocuments(documents){
      document.getElementById('Documents').innerHTML=documents;
   }
   getDocuments(){
      return document.getElementById('Documents').innerHTML;
   }
   setPhoneNo(phoneNo){
      document.getElementById('phone-no').innerHTML = phoneNo;
   }
}
export default Acknowledgement;