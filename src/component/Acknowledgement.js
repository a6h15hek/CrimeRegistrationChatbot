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
              <td id="ComplaintId">CUR18119960</td>
           </tr>
           <tr>
              <td>Date and Time of complaint</td>
              <td id="DateTime">20-07-2020  14:27</td>
           </tr>
           <tr>
              <td>Complaint Name</td>
              <td id="Name">Ramakrishnan Swami</td>
           </tr>
           <tr>
              <td>Complaint To</td>
              <td id="ComplaintTo">Ariyalur</td>
           </tr>
           <tr>
              <td>Subject</td>
              <td id="Subject">Document Missing</td>
           </tr>
           <tr>
              <td>Current Information</td>
              <td id="Information">no. 1/1254,pookkara street, Ariyalur, Mobile No:123456789, email Id.: abc@xyz.com</td>
           </tr>
           <tr>
              <td>Uploaded Documents</td>
              <td id="Documents">NO</td>
           </tr>
           <tr>
              <td>Other Details</td>
              <td id="OtherDetails">Document was last submitted to BOI,Ariyalur</td>
           </tr>
        </table>
        <form>
           <input type="button" value="Go back!" onclick="history.go(-1)"/>
           <input type="button" value="Print" onclick="window.print()"/>
        </form>
        <!---End of Acknowledgment Code-->`;

    }
   connectedCallback() {
      
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
   setComplaintTo(complaintto){
      document.getElementById('ComplaintTo').innerHTML=complaintto;
   }
   getComplaintTo(){
      return document.getElementById('ComplaintTo').innerHTML;
   }
   setSubject(subject){
      document.getElementById('Subject').innerHTML=subject;
   }
   getSubject(){
      return document.getElementById('Subject').innerHTML;
   }
   setInformation(information){
      document.getElementById('Information').innerHTML=information;
   }
   getInformation(){
      return document.getElementById('Information').innerHTML;
   }
   setDocuments(documents){
      document.getElementById('Documents').innerHTML=documents;
   }
   getDocuments(){
      return document.getElementById('Documents').innerHTML;
   }
   setOtherDetails(otherdetails){
      document.getElementById('OtherDetails').innerHTML=otherdetails;
   }
   getOtherDetails(){
      return document.getElementById('OtherDetails').innerHTML;
   }
}
export default Acknowledgement;