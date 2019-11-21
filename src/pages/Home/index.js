import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import 'bootstrap';
import $ from 'jquery';
import './../../assets/Home/css/font-awesome.min.css';
import './../../assets/Home/css/slick.css';
import './../../styles/Home/style.css';
import './../../assets/Home/css/theme-color/orange-theme.css';
import 'slick-carousel';

// IMAGES
// import logo from './../../images/logo2.png';
import iphone from './../../images/Home/iphone.png';
import iphoneGroup from './../../images/Home/iphone-group.png';
import screeshot1 from './../../images/Home/screenshot/01.jpg';
import screeshot2 from './../../images/Home/screenshot/02.jpg';
import screeshot3 from './../../images/Home/screenshot/03.jpg';
import screeshot4 from './../../images/Home/screenshot/04.jpg';
import screeshot5 from './../../images/Home/screenshot/05.jpg';

export default class Home extends Component {

    // state = {
    //     username: '',
    //     password: '',
    // };

    componentDidMount() {

        /* ----------------------------------------------------------- */
        /*  1. FULL OVERLYAY MENU
        /* ----------------------------------------------------------- */

        $('.mu-menu-btn').on('click', function (event) {

            event.preventDefault();

            $('.mu-menu-full-overlay').addClass('mu-menu-full-overlay-show');

        });

        // when click colose btn

        $('.mu-menu-close-btn').on('click', function (event) {

            event.preventDefault();

            $('.mu-menu-full-overlay').removeClass('mu-menu-full-overlay-show');

        });

        // when click menu item overlay disappear

        $('.mu-menu a').on('click', function (event) {
            event.preventDefault();
            $('.mu-menu-full-overlay').removeClass('mu-menu-full-overlay-show');
        });

        /* ----------------------------------------------------------- */
        /*  2. MENU SMOOTH SCROLLING
        /* ----------------------------------------------------------- */

        //MENU SCROLLING WITH ACTIVE ITEM SELECTED

        $(".mu-menu a").click(function (event) {
            event.preventDefault();
            //calculate destination place
            var dest = 0;
            if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
                dest = $(document).height() - $(window).height();
            } else {
                dest = $(this.hash).offset().top;
            }
            //go to destination
            $('html,body').animate({ scrollTop: dest }, 1000, 'swing');
        });


        /* ----------------------------------------------------------- */
        /*  3. VIDEO POPUP
        /* ----------------------------------------------------------- */

        $('.mu-video-play-btn').on('click', function (event) {

            event.preventDefault();

            $('.mu-video-iframe-area').addClass('mu-video-iframe-display');

        });

        // when click the close btn

        // disappear iframe window

        $('.mu-video-close-btn').on('click', function (event) {

            event.preventDefault();

            $('.mu-video-iframe-area').removeClass('mu-video-iframe-display');

        });

        // stop iframe if it is play while close the iframe window

        $('.mu-video-close-btn').click(function () {

            $('.mu-video-iframe').attr('src', $('.mu-video-iframe').attr('src'));

        });

        // when click overlay area

        $('.mu-video-iframe-area').on('click', function (event) {

            event.preventDefault();

            $('.mu-video-iframe-area').removeClass('mu-video-iframe-display');

        });

        $('.mu-video-iframe-area, .mu-video-iframe').on('click', function (e) {
            e.stopPropagation();
        });


        /* ----------------------------------------------------------- */
        /*  4. APPS SCREENSHOT SLIDEER ( SLICK SLIDER )
        /* ----------------------------------------------------------- */

        $('.mu-apps-screenshot-slider').slick({
            slidesToShow: 4,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: true,
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: true,
                        slidesToShow: 1
                    }
                }
            ]
        });

        /* ----------------------------------------------------------- */
        /*  5. BOOTSTRAP ACCORDION 
        /* ----------------------------------------------------------- */

        /* Start for accordion #1*/
        $('#accordion .panel-collapse').on('shown.bs.collapse', function () {
            $(this).prev().find(".fa").removeClass("fa-plus").addClass("fa-minus");
        });

        //The reverse of the above on hidden event:

        $('#accordion .panel-collapse').on('hidden.bs.collapse', function () {
            $(this).prev().find(".fa").removeClass("fa-minus").addClass("fa-plus");
        });	
    }

    render() {
        return (
            <div>
                <header id="mu-header" role="banner">
                    <div className="mu-header-overlay">
                        <div className="container">
                            <div className="mu-header-area">

                                <div className="mu-logo-area">
                                    <a className="mu-logo" href="#">InkNeedle</a>
                                    {/* <a className="mu-logo" href="#"><img src={logo} alt="logo img"/></a>  */}
                                </div>

                                <div className="mu-header-featured-area">
                                    <div className="mu-header-featured-img">
                                        <img src={iphone} alt="iphone image"/>
                                    </div>

                                    <div className="mu-header-featured-content">
                                        <h1>Bem vindo <span>App InkNeedle</span></h1>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto nisi, consectetur odit voluptate labore veniam, neque iure cumque aut recusandae iusto. Aliquid quos vel optio dolore consequuntur accusantium autem quaerat!</p>

                                        <div className="mu-app-download-area">
                                            <h4>App</h4>
                                            <Link className="mu-apple-btn" to="/login"><i className="fa fa-user"></i><span>Login</span></Link>
                                            <Link className="mu-google-btn" to="/cadastro_usuario"><i className="fa fa-users"></i><span>Criar conta</span></Link>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </header>

                <button className="mu-menu-btn">
                    <i className="fa fa-bars"></i>
                </button>
                
                <div className="mu-menu-full-overlay">
                    <div className="mu-menu-full-overlay-inner">
                        <a className="mu-menu-close-btn" href="/"><span className="mu-line"></span></a>
                        <nav className="mu-menu" role="navigation">
                            <ul>
                                <li><a href="#mu-header">Header</a></li>
                                <li><a href="#mu-feature">App Feature</a></li>
                                <li><a href="#mu-video">Promo Video</a></li>
                                <li><a href="#mu-apps-screenshot">Apps Screenshot</a></li>
                                <li><a href="#mu-download">Download</a></li>
                                <li><a href="#mu-faq">FAQ</a></li>
                                <li><a href="#mu-contact">Get In Touch</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
        
                <main role="main">
                    <section id="mu-feature">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mu-feature-area">

                                        <div className="mu-title-area">
                                            <h2 className="mu-title">OUR APP FEATURES</h2>
                                            <span className="mu-title-dot"></span>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis unde, ut sapiente et voluptatum facilis consectetur incidunt provident asperiores at necessitatibus nulla sequi voluptas libero quasi explicabo veritatis minima porro.</p>
                                        </div>

                                        <div className="mu-feature-content">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="mu-feature-content-left">
                                                        <img className="mu-profile-img" src={iphoneGroup} alt="iphone Image"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="mu-feature-content-right">

                                                        <div className="media">
                                                            <div className="media-left">
                                                                <button className="btn mu-feature-btn" type="button">
                                                                    <i className="fa fa-tablet" aria-hidden="true"></i>
                                                                </button>
                                                            </div>
                                                            <div className="media-body">
                                                                <h3 className="media-heading">Responsive Design</h3>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic at, omnis neque illum accusamus delectus consectetur perspiciatis fugiat ex veniam sit soluta iste, reprehenderit laboriosam!</p>
                                                            </div>
                                                        </div>

                                                        <div className="media">
                                                            <div className="media-left">
                                                                <button className="btn mu-feature-btn" type="button">
                                                                    <i className="fa fa-sliders" aria-hidden="true"></i>
                                                                </button>
                                                            </div>
                                                            <div className="media-body">
                                                                <h3 className="media-heading">Easy To Customize</h3>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis provident in voluptatum nihil suscipit molestias, excepturi blanditiis corrupti error tenetur ab, voluptates architecto nemo.</p>
                                                            </div>
                                                        </div>

                                                        <div className="media">
                                                            <div className="media-left">
                                                                <button className="btn mu-feature-btn" type="button">
                                                                    <i className="fa fa-tachometer" aria-hidden="true"></i>
                                                                </button>
                                                            </div>
                                                            <div className="media-body">
                                                                <h3 className="media-heading">Excellent Performance</h3>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta veniam eius, ullam nisi repellendus deserunt distinctio, eveniet libero velit quo voluptatem sequi, ipsa asperiores ad? Facilis molestiae cum aliquam.</p>
                                                            </div>
                                                        </div>

                                                        <div className="media">
                                                            <div className="media-left">
                                                                <button className="btn mu-feature-btn" type="button">
                                                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                                </button>
                                                            </div>
                                                            <div className="media-body">
                                                                <h3 className="media-heading">GPS Tracking</h3>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque repudiandae eveniet facere natus recusandae, sapiente iste veritatis molestiae. Recusandae veniam officia asperiores reprehenderit earum.</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="mu-video">
                        <div className="mu-video-overlay">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mu-video-area">
                                            <h2>Watch Promo Video</h2>
                                            <a className="mu-video-play-btn" href="#"><i className="fa fa-play" aria-hidden="true"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mu-video-content">
                            <div className="mu-video-iframe-area">
                                <a className="mu-video-close-btn" href="#"><i className="fa fa-times" aria-hidden="true"></i></a>
                                <iframe className="mu-video-iframe" width="854" height="480" src="https://www.youtube.com/embed/9r40_ffCZ_I" frameborder="0" allowfullscreen></iframe> 
                            </div>
                        </div>
                    </section>

                    <section id="mu-apps-screenshot">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mu-apps-screenshot-area">

                                        <div className="mu-title-area">
                                            <h2 className="mu-title">APPS SCREENSHOT</h2>
                                            <span className="mu-title-dot"></span>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis unde, ut sapiente et voluptatum facilis consectetur incidunt provident asperiores at necessitatibus nulla sequi voluptas libero quasi explicabo veritatis minima porro.</p>
                                        </div>


                                        <div className="mu-apps-screenshot-content">

                                            <div className="mu-apps-screenshot-slider">

                                                <div className="mu-single-screeshot">
                                                    <img src={screeshot1} alt="App screenshot img"/>
                                                </div>

                                                <div className="mu-single-screeshot">
                                                    <img src={screeshot2} alt="App screenshot img"/>
                                                </div>

                                                <div className="mu-single-screeshot">
                                                    <img src={screeshot3} alt="App screenshot img"/>
                                                </div>

                                                <div className="mu-single-screeshot">
                                                    <img src={screeshot4} alt="App screenshot img"/>
                                                </div>

                                                <div className="mu-single-screeshot">
                                                    <img src={screeshot5} alt="App screenshot img"/>
                                                </div>

                                                <div className="mu-single-screeshot">
                                                    <img src={screeshot1} alt="App screenshot img"/>
                                                </div>

                                                <div className="mu-single-screeshot">
                                                    <img src={screeshot2} alt="App screenshot img"/>
                                                </div>

                                                <div className="mu-single-screeshot">
                                                    <img src={screeshot3} alt="App screenshot img"/>
                                                </div>

                                                <div className="mu-single-screeshot">
                                                    <img src={screeshot4} alt="App screenshot img"/>
                                                </div>

                                                <div className="mu-single-screeshot">
                                                    <img src={screeshot5} alt="App screenshot img"/>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="mu-download">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mu-download-area">

                                        <div className="mu-title-area">
                                            <h2 className="mu-title">GET THE APP</h2>
                                            <span className="mu-title-dot"></span>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis unde, ut sapiente et voluptatum facilis consectetur incidunt provident asperiores at necessitatibus nulla sequi voluptas libero quasi explicabo veritatis minima porro.</p>
                                        </div>


                                        <div className="mu-download-content">
                                            <a className="mu-apple-btn" href="#"><i className="fa fa-apple"></i><span>apple store</span></a>
                                            <a className="mu-google-btn" href="#"><i className="fa fa-android"></i><span>google play</span></a>
                                            <a className="mu-windows-btn" href="#"><i className="fa fa-windows"></i><span>windows store</span></a>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="mu-faq">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mu-faq-area">

                                        <div className="mu-title-area">
                                            <h2 className="mu-title">FAQ</h2>
                                            <span className="mu-title-dot"></span>
                                        </div>


                                        <div className="mu-faq-content">

                                            <div className="panel-group" id="accordion">

                                                <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true">
                                                        <span className="fa fa-minus"></span> What is Apex App? 
                                                    </a>
                                                    </h4>
                                                </div>
                                                <div id="collapseOne" className="panel-collapse collapse in">
                                                    <div className="panel-body">
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                    </div>
                                                </div>
                                                </div>

                                                <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                                                        <span className="fa fa-plus"></span> How do I setup this App? 
                                                    </a>
                                                    </h4>
                                                </div>
                                                <div id="collapseTwo" className="panel-collapse collapse">
                                                    <div className="panel-body">
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                    </div>
                                                </div>
                                                </div>

                                                <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                                                        <span className="fa fa-plus"></span> Does it cost anything to become a member? 
                                                    </a>
                                                    </h4>
                                                </div>
                                                <div id="collapseThree" className="panel-collapse collapse">
                                                    <div className="panel-body">
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                    </div>
                                                </div>
                                                </div>

                                                <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseFour">
                                                        <span className="fa fa-plus"></span> What is your policy regarding privacy? 
                                                    </a>
                                                    </h4>
                                                </div>
                                                <div id="collapseFour" className="panel-collapse collapse">
                                                    <div className="panel-body">
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                    </div>
                                                </div>
                                                </div>

                                                <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseFive">
                                                        <span className="fa fa-plus"></span> Are there more help resources available? 
                                                    </a>
                                                    </h4>
                                                </div>
                                                <div id="collapseFive" className="panel-collapse collapse">
                                                    <div className="panel-body">
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                    </div>
                                                </div>
                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="mu-contact">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mu-contact-area">

                                        <div className="mu-title-area">
                                            <h2 className="mu-heading-title">GET IN TOUCH</h2>
                                            <span className="mu-title-dot"></span>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever</p>
                                        </div>
                                        

                                        <div className="mu-contact-content">
                                            <div className="row">

                                            <div className="col-md-7">
                                                <div className="mu-contact-left">
                                                    <div id="form-messages"></div>
                                                        <form id="ajax-contact" method="post" action="mailer.php" className="mu-contact-form">
                                                            <div className="form-group">                
                                                                <input type="text" className="form-control" placeholder="Name" id="name" name="name" required/>
                                                            </div>
                                                            <div className="form-group">                
                                                                <input type="email" className="form-control" placeholder="Enter Email" id="email" name="email" required/>
                                                            </div>              
                                                            <div className="form-group">
                                                                <textarea className="form-control" placeholder="Message" id="message" name="message" required></textarea>
                                                            </div>
                                                            <button type="submit" className="mu-send-msg-btn"><span>Enviar</span></button>
                                                        </form>
                                                    </div>
                                                </div>

                                                <div className="col-md-5">
                                                    <div className="mu-contact-right">
                                                        <div className="mu-contact-right-single">
                                                            <div className="mu-icon"><i className="fa fa-map-marker"></i></div>
                                                            <p><strong>Office Location</strong></p>
                                                            <p>Dooley Branch Rd Millen, GA 30442, USA</p>
                                                        </div>

                                                        <div className="mu-contact-right-single">
                                                            <div className="mu-icon"><i className="fa fa-phone"></i></div>
                                                            <p><strong>Phone Number</strong></p>
                                                            <p>+90 987 678 9834</p>
                                                            <p>+90 567 098 785</p>
                                                        </div>

                                                        <div className="mu-contact-right-single">
                                                            <div className="mu-icon"><i className="fa fa-envelope"></i></div>
                                                            <p><strong>Email Address</strong></p>
                                                            <p>contact@domain.com</p>
                                                            <p>support@domain.com</p>
                                                        </div>

                                                        <div className="mu-contact-right-single">
                                                            <div className="mu-social-media">
                                                                <a href="#"><i className="fa fa-facebook"></i></a>
                                                                <a href="#"><i className="fa fa-twitter"></i></a>
                                                                <a href="#"><i className="fa fa-google-plus"></i></a>
                                                                <a href="#"><i className="fa fa-linkedin"></i></a>
                                                                <a href="#"><i className="fa fa-youtube"></i></a>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>		

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>		
                
                <footer id="mu-footer" role="contentinfo">
                        <div className="container">
                            <div className="mu-footer-area">
                            <p className="mu-copy-right">&copy; Copyright <a rel="nofollow" href="http://inkneedle.com.br">inkneedle.com.br</a></p>
                            </div>
                        </div>

                </footer>
            </div>
        );
    }
}
