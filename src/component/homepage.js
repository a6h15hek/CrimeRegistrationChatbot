import carouselImage1 from "../img/debit-card.jpg";
import cyberBullyingImage from '../img/bullying.jpg';
import phishingImage from '../img/phishing.jpg';


class Homepage extends HTMLElement{
    constructor(){
        super();
        this.innerHTML = `
        <div id="homepage">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="${carouselImage1}" alt="First slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="${carouselImage1}" alt="Second slide">
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100" src="${carouselImage1}" alt="Third slide">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>


            <div id="complaint-card" class="card">
                <div class="card-body" style="padding: 10px;">
                <h2 class="card-title">Registering complaints to Chabot</h2>
                <hr>
                <p class="card-text"><h2 style="margin:5px 0px">Key Features</h2><br>
           <strong>    * OTP verification for registering users<br>
               * End to End Data Encryption for Crime Registeration<br>
               * validation for user responses<br>
               * Decision tree for questioning<br>
               * Machine Learning implemented (Chabot can be trained by adding new dataset of crime, no explicit programming needed)<br>
               * NLP (Natural Language Processing) implemented for processing user responses and validation purpose.<br>
               * Crime Registering Anonymously<br>
               * Stores the IP address and Some Information about device<br></strong>

            <h2 style="margin:20px 0px 0px 0px">Dataset for Crime Available in Application</h2>

           <strong>     * Ransomware<br>
                * Phishing<br>
                * Cell Phone Missing / Theft<br>
                * Vehical Missing / Theft<br>
                * more crime dataset can be added, Chabot automatically use it learn for themselves.<br>  </strong>  
             </p>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </p>
                    <div  style="padding-bottom: 30px; padding-top: 20px;">
                        <a  href="#" type="button" class="btn btn-primary btn-lg">Learn More</a>
                        <a   href="RegisterComplaint" type="button" class="btn btn-primary btn-lg">Register Complaint</a>
                        <a   href="RegisterComplaintAnonymously" type="button" class="btn btn-primary btn-lg">Register Complaint Anonymously</a>
                    </div>
                </div>
            </div>


            <h3 style="text-align: center; margin-top: 80px;">Related Articles</h3>
            <section id="Articles">
                    <div class="card-deck">
                        <div class="card">
                            <img src="${carouselImage1}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Debit/Credit card Scams</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.<a href="#" > Read More...</a></p>
                                <p class="card-text"><small class="text-muted">Posted on 15 July 2020</small></p>
                            </div>
                        </div>
                        <div class="card">
                            <img src="${cyberBullyingImage}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Cyber Bullying</h5>
                                <p class="card-text">This card has supporting text below as a natural lead-in to additional content.<a href="#" > Read More...</a></p>
                                <p class="card-text"><small class="text-muted">Posted on 6 July 2020</small></p>
                            </div>
                        </div>
                        <div class="card">
                            <img src="${phishingImage}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">Phishing</h5>
                                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.<a href="#"> Read More...</a></p>
                                
                                <p class="card-text"><small class="text-muted">Posted on 25 June 2020</small></p>
                            </div>
                        </div>
                    </div>
            </section>
        </div>
    `;
    }
    connectedCallback(){
        
    }
}
export default Homepage;
