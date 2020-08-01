class TrackComplaint extends HTMLElement{
    constructor(){
        super();
		this.innerHTML =`<!---TrackComplaint UI Code follows-->
		  <title>TRACK YOUR COMPLAINT</title>
		  <meta charset="utf-8">
	      <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
	      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
	      <style type="text/css">
		    body{
			    background-color: #FFFFFF;
		    }

		    #form{
			    background-color: #EBF2F2;
			    min-height: 300px;
			    padding: 5px 40px 40px 40px;

		    }
		    .tack{
			    font-size: 30px;
			    font-family: Times new roman;
			    border-bottom-style: ridge; 
		    }

		    .text{
			    height: 43px;
		    }

		    label{
			    font-size: 18px;
		    }
		    .btn-success{
			    border-radius: 0px;
			    padding: 10px;
			    width: 30%;
		    }

		    .col-md-6{
			    margin-top: 100px;
		    }
	      </style>
	        <div class="container">
		        <div class="row">
			        <div class="col-md-3"></div>
			        <div class="col-md-6" id="form">
                        <center><b class="track">TRACK YOUR COMPLAINT</b></center>
                            <form>
					            <div class="form-group">
			         		        <label>Complaint Id:</label>
						            <input type="text" name="CId" class="form-control text" placeholder="Enter Complaint Id" required>
					            </div>
					            <div class="form-group">
						            <label>Date of Birth:</label>
					            	<input type="date" name="Dob" class="form-control text" required>
					            </div>
					            <center>
						        <div class="form-group">
							        <input type="submit" class="btn btn-success" value="SUBMIT">
						        </div>
					            </center>
				            </form>
			        </div>
			        <div class="col-md-3"></div>
		        </div>
	        </div>
    
        <!---End of TrackComplaint Code-->`;

    }
}
export default TrackComplaint;