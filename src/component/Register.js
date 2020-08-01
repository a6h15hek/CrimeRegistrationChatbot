import firebase from './InitializeDatabase';
import 'firebase/firebase-auth';
import $, { contains } from "jquery";
class Register extends HTMLElement {
    //initialize global variable
    firebaseApp = null;
    userInfo=null;
    constructor(firebaseApp) {
        super();
        this.firebaseApp = firebase;
        this.innerHTML = `
        <style>
            #form{
			background-color: #f5f5f5;
			padding: 5px 40px 40px 40px;

		}
		.register{
			font-size: 30px;
			font-family: Times new roman;
			border-bottom-style: ridge; 
		}

		.text{
			height: 43px;
		}

		.field-label{
			font-size: 18px;
        }
        .btn-primary{
            background-color: #7f00ff;
            border : 0px;
		}

		
        </style>
        <div class="container">
		<div class="row">
			<div class="col-md-3"></div>
			<div class="col-md-6" id="form">
                <p class="h1" style="text-align: center;margin:20px 0px">Register</p>
                <div class="bs-component "  style="margin:20px 0px">
                    <div class="alert alert-dismissible alert-danger collapse" id="debugMessageLayout">
                        <button class="close" type="button" data-dismiss="alert">&times;</button><message id="messageDebug"></message>
                    </div>
                </div>
                <form>
                    <div class="form-group">
						<label>Enter your Full Name:</label>
						<input type="text" id="name" name="city" class="form-control text" placeholder="Enter Name here">
					</div>
                    <div class="form-group">
                       <label class="field-label">Select state:</label>
                        <select class="form-control" id="state">
                            <option value="">Select State</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                            <option value="Daman and Diu">Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
                    </div> 
					<div class="form-group">
						<label class="field-label">Enter your mobile number:</label>
						<div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">+91</div>
                            </div>
                            <input type="tel" class="form-control py-0" id="phone-number" placeholder="Mobile No.">
                        </div>
                    </div>
                     <div class="form-group" >
						<div id="recaptcha-container" style="margin:0 auto"></div>
					</div>
					<center>
						<div class="form-group" style="margin:20px 0px 0px 0px">
							<input id="sign-in-button" type="button" class="btn btn-primary btn-lg" value="Book Complaint">
							<input type="reset" class="btn btn-danger btn-lg" value="Reset">
						</div>
					</center>
				</form>
			</div>
			<div class="col-md-3"></div>
		</div>
    </div>
    
    <div class="modal fade" id="modalSubscriptionForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold">Enter OTP</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body mx-3">
            <div class="bs-component "  style="margin:20px 0px">
                    <div class="alert alert-dismissible alert-success" id="debugOTPMessageLayout">
                        <button class="close" type="button" data-dismiss="alert">&times;</button><message id="messageOTPDebug">OTP is sent to your phone no.</message>
                    </div>
            </div>
               <div class="form-group">
						<label>Enter OTP:</label>
						<input type="text" id="verification-code" class="form-control text" placeholder="Enter OTP here">
				</div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
               <input id="verify-code-button" type="button" class="btn btn-primary btn-lg" value="Verify"/>
               <input type="reset" id="cancel-verify-code-button" data-dismiss="modal" aria-label="Close"  class="btn btn-danger btn-lg" value="Cancel">
            </div>
            </div>
        </div>
    </div>
             `;
    }
    connectedCallback() {
        //called  after constructor
        document.getElementById('sign-in-button').addEventListener('click', () => this.signingIn());
        document.getElementById('verify-code-button').addEventListener('click', () => this.verifyOtp());
        document.getElementById('cancel-verify-code-button').addEventListener('click', (e) => this.cancelVerification(e));

        //inserting captcha in screen
        window.recaptchaVerifier = new this.firebaseApp.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': function (response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
            'expired-callback': function () {
                // Response expired. Ask user to solve reCAPTCHA again.
            }
        });
        //making captcha visible
        recaptchaVerifier.render().then(function (widgetId) {
            window.recaptchaWidgetId = widgetId;
        });
    }

    //sign in functions *****************************************
    isAllInputDataValid(userInfo, msgstatus, debugMessageLayout){
        debugMessageLayout.classList.remove("alert-success");
        debugMessageLayout.classList.add("alert-danger");
        if (userInfo.name == null || userInfo.name.length == 0) {
            msgstatus.innerHTML = "Empty name Field !!"
            document.getElementById('name').focus();
            debugMessageLayout.classList.remove("collapse");
            return false;
        }
        if (userInfo.state == null || userInfo.state.length == 0) {
            msgstatus.innerHTML = "Empty State field !!"
            document.getElementById('state').focus();
            debugMessageLayout.classList.remove("collapse");
            return false;
        }
        if (userInfo.phoneno == null || userInfo.phoneno.length == 0) {
            msgstatus.innerHTML = "Empty phone No"
            document.getElementById('phone-number').focus();
            debugMessageLayout.classList.remove("collapse");
            return false;
        }
        var pattern = /^[789]\d{9}$/;
        if (userInfo.phoneno.search(pattern) == -1) {
            msgstatus.innerHTML = "Invalid Input phone no !!"
            document.getElementById('phone-number').focus();
            debugMessageLayout.classList.remove("collapse");
            return false;
        }
        return true;
    }
    signingIn(){
        this.userInfo = {
            name: document.getElementById('name').value,
            state: document.getElementById('state').value,
            phoneno: document.getElementById('phone-number').value,
        }
        var msgstatus = document.getElementById('messageDebug');
        var debugMessageLayout = document.getElementById('debugMessageLayout');

        if (!this.isAllInputDataValid(this.userInfo, msgstatus, debugMessageLayout)){
            return;
        }
        this.userInfo.phoneno = "+91" + this.userInfo.phoneno;

        if(!this.isCaptchaOK()){
            msgstatus.innerHTML = "Empty Captcha !!"
            debugMessageLayout.classList.remove("collapse");
            return;
        }
        ///
        window.signingIn = true;
        this.userInfo.appVerifier = window.recaptchaVerifier;
        this.signingInSendOTP();
    }

    signingInSendOTP(){
        this.firebaseApp.auth().signInWithPhoneNumber(this.userInfo.phoneno, this.userInfo.appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                window.signingIn = false;
                document.getElementById('messageDebug').innerHTML = " OTP sent !"
                var DebugMessageLayout = document.getElementById('debugMessageLayout');
                DebugMessageLayout.classList.remove("alert-danger");
                DebugMessageLayout.classList.remove("collapse");
                DebugMessageLayout.classList.add("alert-success");
                $('#modalSubscriptionForm').modal({ backdrop: 'static', keyboard: false });
            }).catch(function (error) {
                document.getElementById('messageDebug').innerHTML = " OTP not sent !" + error
                var DebugMessageLayout = document.getElementById('debugMessageLayout');
                DebugMessageLayout.classList.remove("alert-success");
                DebugMessageLayout.classList.remove("collapse");
                DebugMessageLayout.classList.add("alert-danger");
                // Error; SMS not sent
                window.signingIn = false;
                // ...
            });
    }

    verifyOtp(){
        var OTPcode = document.getElementById('verification-code').value;
        var debugOTPMessageLayout = document.getElementById('debugOTPMessageLayout');
        var msgOtpstatus = document.getElementById('messageOTPDebug');
        if (OTPcode == null || OTPcode.length == 0) {
            msgOtpstatus.innerHTML = "Empty otp Field !!"
            debugOTPMessageLayout.classList.remove("collapse");
            debugOTPMessageLayout.classList.remove("alert-success");
            debugOTPMessageLayout.classList.add("alert-danger");
            return;
        }
        window.verifyingCode = true;
        confirmationResult.confirm(OTPcode).then(
            (result)=>this.signInConfirmed(result,this.userInfo)
        ).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            console.log(error);
            window.verifyingCode = false;
            msgOtpstatus.innerHTML = "OTP not matched !!"
            debugOTPMessageLayout.classList.remove("collapse");
            debugOTPMessageLayout.classList.remove("alert-success");
            debugOTPMessageLayout.classList.add("alert-danger");
        });   
    }
    signInConfirmed(result,userInfo){
        window.verifyingCode = false;
        window.confirmationResult = null;
        $('#modalSubscriptionForm').modal('hide');
        var user = result.user;
        // account signedIn + verfied now jump dashboard
       /* var url = new URL(window.location.href)
        url.searchParams.delete("state");
        url.searchParams.delete("phoneNo");
        url.searchParams.delete("name");
        url.searchParams.append("state", userInfo.state);
        url.searchParams.append("phoneNo",userInfo.phoneno);
        url.searchParams.append("name", userInfo.name);
        window.location.replace(url.href);*/
        //sessionStorage.setItem("name",userInfo.name)
        sessionStorage.setItem("InitialPersonalDetails", JSON.stringify({name:userInfo.name,state:userInfo.state,phoneno:userInfo.phoneno}));
    }

    //end sign in functions ****************************************
    isCaptchaOK() {
        if (typeof grecaptcha !== 'undefined' && typeof window.recaptchaWidgetId !== 'undefined') {
            var recaptchaResponse = grecaptcha.getResponse(window.recaptchaWidgetId);
            return recaptchaResponse !== '';
        }
        return false;
    }

    resetReCaptcha() {
        if (typeof grecaptcha !== 'undefined'
            && typeof window.recaptchaWidgetId !== 'undefined') {
            grecaptcha.reset(window.recaptchaWidgetId);
        }
    }
 
    cancelVerification(e) {
        e.preventDefault();
        window.confirmationResult = null;
    }

}

export default Register;