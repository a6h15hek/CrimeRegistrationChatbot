import firebase from './InitializeDatabase';
import chatbot_avatar from '../img/chabot-avatar.jpg';
import 'firebase/firebase-storage';
var $ = require('jquery');
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js'
import ChatbotCore from './ChatbotCore';
import { contains } from 'jquery';
class Chatbot extends HTMLElement{
    $ChatWindow = $('.messages-content');
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
                        <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    Launch demo modal
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Agree Terms and Conditions.</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                         <h4>Do you have any evidence ? you can upload it here</h4>
                            <div  class="text-center dropzone" id="DropzoneElementId" >
                                 <div class="dz-message">Drop files here or click to upload</div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
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
            //window.location.replace("pageNotFound");
            return;
        }
       
        document.querySelector('.message-submit-yes').addEventListener('click',(e)=>this.addUserResponseOnChatWindow("yes",e));
        document.querySelector('.message-submit-no').addEventListener('click', (e) => this.addUserResponseOnChatWindow("no",e));
        document.querySelector('.message-submit').addEventListener('click', (e) => this.addUserResponseOnChatWindow($('.message-input').val(),e));
        document.addEventListener('keypress', (e) => e.key === 'Enter' ? this.addUserResponseOnChatWindow($('.message-input').val(),e) : false);
 
        
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
                console.log(response.crimeReportData)
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
}
export default Chatbot;
