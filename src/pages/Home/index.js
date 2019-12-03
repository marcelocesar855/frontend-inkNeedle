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

export default class Home extends Component {

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
                                        <h1>Bem vindo <span>a InkNeedle</span></h1>
                                        <p>Vamos achar uma tattoo para você! :)</p>

                                        <div className="mu-app-download-area">
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
                                <li><a href="#mu-header">Início</a></li>
                                <li><a href="#mu-faq">FAQ</a></li>
                                <li><a href="#mu-contact">Entrar em contato</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
        
                <main role="main">

                <section id="mu-download">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mu-download-area">

                                        <div className="mu-title-area">
                                            <h2 className="mu-title">Sobre nós</h2>
                                            <span className="mu-title-dot"></span>
                                            <p>Observando e experienciando as necessidades e dificuldades em achar um estúdio de tatuagem para fazer uma, a Inkneedle foi criada com o objetivo de ajudar quem procura um lugar para se tatuar com segurança e boas qualificações, assim como ajudar não só quem procura um estúdio como também quem os divulga, os tatuadores, melhorando cada vez mais sua visibilidade no mercado e credibilidade na carreira.</p>
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
                                                        <span className="fa fa-minus"></span> Como utilizo o serviço?
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
                                                        <span className="fa fa-plus"></span> Como fazer parte dos tatuadores da plataforma?
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
                                                        <span className="fa fa-plus"></span> Quais são as políticas de segurança da InkNeedle?
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
                                                        <span className="fa fa-plus"></span> Como são feitos os contatos entre os tatuadores e clientes?
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
                                                        <span className="fa fa-plus"></span> Quais informações vou encontrar sobre o tatuador? 
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
                                            <h2 className="mu-heading-title">Entrar em contato</h2>
                                            <span className="mu-title-dot"></span>
                                            <p>Alguma dúvida, elogio, sugestão ou reclamação? Entre contato conosco!</p>
                                        </div>
                                        

                                        <div className="mu-contact-content">
                                            <div className="row">

                                            <div className="col-md-7">
                                                <div className="mu-contact-left">
                                                    <div id="form-messages"></div>
                                                        <form id="ajax-contact" method="post" action="mailer.php" className="mu-contact-form">
                                                            <div className="form-group">                
                                                                <input type="text" className="form-control" placeholder="Nome" id="name" name="name" required/>
                                                            </div>
                                                            <div className="form-group">                
                                                                <input type="email" className="form-control" placeholder="Email" id="email" name="email" required/>
                                                            </div>              
                                                            <div className="form-group">
                                                                <textarea className="form-control" placeholder="Menssagem" id="message" name="message" required></textarea>
                                                            </div>
                                                            <button type="submit" className="mu-send-msg-btn"><span>Enviar</span></button>
                                                        </form>
                                                    </div>
                                                </div>

                                                <div className="col-md-5">
                                                    <div className="mu-contact-right">
                                                        <div className="mu-contact-right-single">
                                                            <div className="mu-icon"><i className="fa fa-map-marker"></i></div>
                                                            <p><strong>Endereço</strong></p>
                                                            <p>Av. das Castanheiras, s/n - Lote 3700 - Águas Claras, Brasília - DF</p>
                                                        </div>

                                                        <div className="mu-contact-right-single">
                                                            <div className="mu-icon"><i className="fa fa-phone"></i></div>
                                                            <p><strong>Telefone</strong></p>
                                                            <p>+55 61 9 8271 5613</p>
                                                        </div>

                                                        <div className="mu-contact-right-single">
                                                            <div className="mu-icon"><i className="fa fa-envelope"></i></div>
                                                            <p><strong>Email</strong></p>
                                                            <p>inkneedle.tattoo@gmail.com</p>
                                                        </div>

                                                        <div className="mu-contact-right-single">
                                                            <div className="mu-social-media">
                                                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                                                <a href="#"><i className="fab fa-twitter"></i></a>
                                                                <a href="#"><i className="fab fa-instagram"></i></a>
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
