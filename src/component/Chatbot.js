import firebase from './InitializeDatabase';
import 'firebase/firebase-firestore';
import chatbot_avatar from '../img/chabot-avatar.jpg';
import 'firebase/firebase-storage';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css'
var $ = require('jquery');
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js'
import ChatbotCore from './ChatbotCore';
import { contains } from 'jquery';
class Chatbot extends HTMLElement{
    $ChatWindow = $('.messages-content');
    myDropzone = null;
    finalComplaintNo = null;
    finalCrimeData = null;
    evidenceNo = 1;
    Chabot = null;
    i=0;
    constructor(){
        super();
        this.innerHTML =`<!---Chatbot UI COde follows-->
                        <div class="chat-app">
                            <div class="chat-title">
                                <h1>ChatBot X</h1>
                                <h2>Description sub-notes</h2>
                                <figure class="avatar">
                                    <img src="${chatbot_avatar}" />
                                </figure>
                            </div>
                            <div class="messages">
                                <div class="messages-content mCustomScrollbar"></div>
                            </div>
                            <div class="message-box">
                                <div class="row">
                                    <div class="col-auto">
                                        <div class="btn-group-vertical" style="height: 100%;width: 60px;" >
                                            <button class="btn btn-success message-submit-yes" type="button" style="font-weight: 700;outline: none;box-shadow: none;">Yes</button>
                                            <button class="btn btn-danger message-submit-no" type="button" style="font-weight: 700;outline: none;box-shadow: none;">No</button>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <textarea type="text" class="message-input"  autocomplete="off" placeholder=" Type here..."></textarea>
                                    </div>
                                    <div class="col">
                                        <button type="submit" class="message-submit"><i class="fa fa-arrow-circle-right fa-2x" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!---End of chatbot Code-->
                    

                    <!-- Modal -->
                    <div class="modal fade" id="SubmitComplaintModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Agree Terms and Conditions.</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" type="checkbox" id="evidenceCheckbox">Do you want to submit any evidence or any document ?
                            </label>
                        </div>
                         <div id="upload-section" style="display:none;margin:20px 0px;">
                            <h5>Upload your document or images here !!!</h5>
                            <div  class="text-center dropzone" id="DropzoneElementId" >
                                 <div class=" dz-default dz-message">Drop files here or click to upload</div>
                            </div>
                            <p><span style="font-weight:bold">status :</span><span id="status-upload">none</span> <p>
                         </div>

                         <div class="card mb-3 border-primary" style="margin:20px 0px">
                            <div class="card-body">
                            <blockquote class="card-blockquote">
                                <p style="font-weight:bold">Your complaint will be shared to police station. You can see the status of complaint using Track Complaint Feature.</p>
                                <footer>Always Stay alert Be careful.
                                <a href="#" style="text-decoration:none" title="Source Title">Get Info about Process</a>
                                </footer>
                            </blockquote>
                            </div>
                        </div>

                        </div>
                        <div class="modal-footer">
                            <p style="float:left"><span style="font-weight:bold">Submission Status : </span><span id="submit-status">none</span></p>
                            <button type="button" id="submit-complaint" class="btn btn-primary">Submit Complaint</button>
                        </div>
                        </div>
                    </div>
                    </div>
                        `;
                        
        console.log("chabot working")
    }
    connectedCallback(){
        //custom scrollbar applied
        this.$ChatWindow.mCustomScrollbar({
            alwaysShowScrollbar: 1
        });
        var stateOfChabot= this.getAttribute("state");
        if (stateOfChabot == "YW5vbnltb3Vz"){
            //anonymous block
            this.Chabot = new ChatbotCore("anonymous");
            var response = this.Chabot.chatbot(null);
            for (var i = 0; i < response.count; i++) {
                this.addChatbotResponseOnChatWindow(response[i])
            }
        } else if (stateOfChabot == "cmVnaXN0ZXI" ){
            console.log("regiseterd")
            //registered block
            this.Chabot = new ChatbotCore("registered");
            //calling the chatbot for greeting message
            setTimeout(() => this.addChatbotResponseOnChatWindow(this.Chabot.chatbot(null)[0]), 0);
            setTimeout(() => this.addChatbotResponseOnChatWindow(this.Chabot.chatbot(null)[0]), 600);
            setTimeout(() => this.addChatbotResponseOnChatWindow(this.Chabot.chatbot(null)[0]), 1000);
        }else{
            window.location.replace("pageNotFound");
            return;
        }
       
        document.querySelector('.message-submit-yes').addEventListener('click',(e)=>this.addUserResponseOnChatWindow("yes",e));
        document.querySelector('.message-submit-no').addEventListener('click', (e) => this.addUserResponseOnChatWindow("no",e));
        document.querySelector('.message-submit').addEventListener('click', (e) => this.addUserResponseOnChatWindow($('.message-input').val(),e));
        document.addEventListener('keypress', (e) => e.key === 'Enter' ? this.addUserResponseOnChatWindow($('.message-input').val(),e) : false);
        
        document.querySelector('.form-check-label').addEventListener('click',()=>this.setUploadPanel());
        document.getElementById('submit-complaint').addEventListener('click',()=>this.submitComplaint())
        this.uploadEvidence();
    }
    addUserResponseOnChatWindow(userResponseString,e/*e belongs to keyPressed to prevent default behavior when enter pressed */){
        e.preventDefault();
        if ($.trim(userResponseString) == ''){
            return false;
        }
        $('<div class="message message-personal">' + userResponseString + '</div>').appendTo($('.mCSB_container')).addClass('new');
        this.updateScrollbar();
        $('.message-input').val('');
        $('.message-input').focus();
        $('.message-input')[0].setSelectionRange(0, 0);
        
        var response = this.Chabot.chatbot(userResponseString);
        for(var i = 0;i<response.count;i++){
            this.addChatbotResponseOnChatWindow(response[i])
        }
        if(response.chatbotSessionEnd != undefined && response.chatbotSessionEnd != null){
            if(response.chatbotSessionEnd == true){
                this.finalCrimeData = response.crimeReportData;
                this.finalComplaintNo = this.getComplaintNo();
                this.finalCrimeData['ComplaintNo'] = this.finalComplaintNo;
                $("#SubmitComplaintModal").modal({
                    backdrop: "static",
                    keyboard: false,
                });
            }
        }
    }

    addChatbotResponseOnChatWindow(chatbotResponseString){
        $(`<div class="message loading new"><figure class="avatar"><img src="${chatbot_avatar}" /></figure><span></span></div>`).appendTo($('.mCSB_container'));
        this.updateScrollbar();
        setTimeout(()=>this.ChabotResponseDelayAdd(chatbotResponseString), 800);
    }
        ChabotResponseDelayAdd(chatbotResponseString){
            $('.message.loading').remove();
            $(`<div class="message new"><figure class="avatar"><img src="${chatbot_avatar}" /></figure>` + chatbotResponseString + `</div>`).appendTo($('.mCSB_container')).addClass('new');
            this.updateScrollbar();
        }
        
    updateScrollbar() {
        this.$ChatWindow.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
            scrollInertia: 10,
            timeout: 0,
            alwaysShowScrollbar: 1
        });
    }
    //update branch
    setUploadPanel(){
        var checkBox = document.getElementById("evidenceCheckbox");
        var uploadSection = document.getElementById("upload-section");
        if (checkBox.checked == true) {
            uploadSection.style.display = "block";
        } else {
            uploadSection.style.display = "none";
        }
    }
    uploadEvidence(){
        this.myDropzone = new Dropzone("div#DropzoneElementId", {
            url: '/',
            addRemoveLinks: true,
            method: 'put',
            chunking: true,
            forceChunking: true,
            autoQueue: false,
            autoProcessQueue: false
        });
        Dropzone.autoDiscover = false;
        this.myDropzone.on("addedfile", (file)=>this.addingFile(file));

        this.myDropzone.on("removedfile", function (file) {
            var storageRef = firebase.storage().ref();
            name = "abhishek";
            storageRef.child(name).delete().then(
                function () {
                    console.log(file.fullPath + " deleted succefuly")
                }).catch(function (error) {
                    console.log("Something is wrong")
                    console.log(error)
                });
        })
    }
    addingFile(file){
        var reader = new FileReader();
        if (this.myDropzone.files.length < 10) {
            var nameOfFile = this.finalComplaintNo+'_evidence'+this.evidenceNo;
            this.evidenceNo++;
            reader.onload = (event) => this.storage_upload(file,nameOfFile);
            reader.readAsDataURL(file);
        } else {
            console.log('skipping file as we are excceding the upload limit')
        }
    }
    storage_upload(DropzoneHandle,nameOfFile) {
        document.getElementById('submit-complaint').disabled = true;
        document.getElementById('status-upload').innerHTML = "⏲ Uploading..."
        const file = DropzoneHandle;
        const ref = firebase.storage().ref();
        name = nameOfFile;
        const metadata = {
            contentType: file.type
        }
        const task = ref.child(name).put(file, metadata);
        task.then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                if (this.finalCrimeData['evidence'] == undefined) {
                    this.finalCrimeData['evidence'] = [];
                }
                //root hace value
                this.finalCrimeData['evidence'].push({ name: nameOfFile, url : url });

                document.getElementById('submit-complaint').disabled = false;
                document.getElementById('status-upload').innerHTML = "✔ Uploaded."
            })
    }
    submitComplaint(){
        //$("#SubmitComplaintModal").modal("hide");
        var database = firebase.firestore();
        document.getElementById('submit-status').innerHTML = "⏲ Submitting..."
        database.collection("complaints").doc().set(this.finalCrimeData).then(
            ()=>this.onSubmissionSuccessfull()
        ).catch(function (error){
            document.getElementById('submit-status').innerHTML = "Submission error !!"+error; 
        });

    }
    onSubmissionSuccessfull(){
        document.getElementById('submit-status').innerHTML = "✔ Submitted Successfully."
        sessionStorage.clear();
        var todayDateAndTime = new Date();
        var dateAndTime = todayDateAndTime.getDate() + "-" + (todayDateAndTime.getMonth() + 1) + "-" + todayDateAndTime.getFullYear() + "  " + todayDateAndTime.getHours() + ':' + todayDateAndTime.getMinutes();
        var evidenceProvided = "yes";
        if (this.finalCrimeData.evidence == undefined || this.finalCrimeData.evidence.length == 0) {
            evidenceProvided = "no";
        }
        if (this.finalCrimeData.name == "anonymous") {
            sessionStorage.setItem(
                "acknowledgement",
                JSON.stringify({
                    ComplaintId: this.finalCrimeData.ComplaintNo,
                    dateAndTime: dateAndTime,
                    NameOfComplainant: this.finalCrimeData.name,
                    Subject: this.finalCrimeData.Subject,
                    phoneNo: "not provided",
                    state: "not provided",
                    documentUploaded: evidenceProvided
                })
            );
        } else {
            sessionStorage.setItem(
                "acknowledgement",
                JSON.stringify({
                    ComplaintId: this.finalCrimeData.ComplaintNo,
                    dateAndTime: dateAndTime,
                    NameOfComplainant: this.finalCrimeData.name,
                    Subject: this.finalCrimeData.Subject,
                    phoneNo: this.finalCrimeData.phoneno,
                    state: this.finalCrimeData.state,
                    documentUploaded: evidenceProvided
                })
            );
        }
        window.location.replace("Acknowledgement");
    }
    getComplaintNo(){
        var today = new Date();
        var month = ((today.getMonth() < 10) ? '0' + today.getMonth() : today.getMonth());
        var date = ((today.getDate() < 10) ? '0' + today.getDate() : today.getDate());
        var hours = ((today.getHours() < 10) ? '0' + today.getHours() : today.getHours());
        var minute = ((today.getMinutes() < 10) ? '0' + today.getMinutes() : today.getMinutes());
        var compliantNo = 'CASE' + today.getFullYear() + month + date + hours + minute + Math.floor((Math.random() * 99) + 11);
        return compliantNo;
    }
}
export default Chatbot;
