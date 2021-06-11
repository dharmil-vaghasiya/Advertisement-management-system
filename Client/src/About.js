import React from "react";
import NavbarPage from "./Components/NavbarPage";
import "./About.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FooterPage from "./Components/FooterPage";

const About = () => {
  return (
    <>
      <NavbarPage />
      <div className="untree_co-section All">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center  md-3 mt-3">
              <span
                class="subtitle faabout"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                About Us
              </span>
              <h2 className="faheading">
                We Advera,A creator's platform to meet brands and crack awesome
                deals.
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="untree_co-section pt-0 All">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5 mb-5">
              <h2 className="line-bottom mb-4 faheading">The Company</h2>
              <p>
                We work together to meet new creator,advertise your brand and
                crack awesome deals and get more sells.We are connecting
                creators and brands since 2 years.
              </p>
              <ul className="list-unstyled ul-check mb-5 primary">
                <li>Transparent deals</li>
                <li>Get more deals</li>
                <li>Reach influencer directly</li>
              </ul>
              <div className="row count-numbers mb-5">
                <div className="col-4 col-lg-4">
                  <span className="counter d-block h2">
                    <span data-number="4000">21</span>
                    <span>+</span>
                  </span>
                  <span className="caption-2">Influencers</span>
                </div>
                <div className="col-4 col-lg-4">
                  <span className="counter d-block h2">
                    <span data-number="2000">15</span>
                    <span>+</span>
                  </span>
                  <span className="caption-2">Brands</span>
                </div>
                <div className="col-4 col-lg-4">
                  <span className="counter d-block h2">
                    <span data-number="200">2</span>
                    <span></span>
                  </span>
                  <span className="caption-2">Employees</span>
                </div>
              </div>
              <p>
                <a href="/signupInf" className="btn btn-black">
                  Register Now
                </a>
                <a href="/Newtosite" className="btn btn-outline-black">
                  Learn More
                </a>
              </p>
            </div>

            <div class="col-lg-6 " data-aos="fade-up" data-aos-delay="400">
              <div class="bg-1"></div>
              <a
                href="https://www.youtube.com/watch?v=mwtbEGNABWU&t=9s"
                data-fancybox
                class="video-wrap"
              >
                <img
                  src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="Company"
                  class="img-fluid rounded"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="untree_co-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-7 text-center">
              <h2 className="line-bottom text-center mb-4">Our Team</h2>
              <p>
                Our Team works together to build the site and provide the better
                expierience to user.User can grow more and more and make
                progress.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col col-md-6 col-sm-12">
              <div className="team text-center">
                <div className="mb-4 img-3"></div>
                <div className="person-body">
                  <h3 className="staff-name">Abhishek Thummar</h3>
                  <span className="d-block position mb-4">
                    Full stack Developer
                  </span>
                  <p className="mb-4">
                    Without requirements or design, programming is the art of
                    adding bugs to an empty text file.
                  </p>
                  <div style={{ color: "#5cccc9" }}>
                    <FacebookIcon /> &nbsp;
                    <TwitterIcon /> &nbsp;
                    <LinkedInIcon />
                  </div>
                </div>
              </div>
            </div>

            <div className="col col-md-6 col-sm-12">
              <div className="team text-center">
                <div className="mb-4 img-2"></div>
                <div className="person-body">
                  <h3 className="staff-name">Dharmil vaghasiya</h3>
                  <span className="d-block position mb-4">
                    Full stack Developer
                  </span>
                  <p className="mb-4">
                    Perfection (in design) is achieved not when there is nothing
                    more to add, but rather when there is nothing more to take
                    away.
                  </p>
                  <div style={{ color: "#5cccc9" }}>
                    <FacebookIcon /> &nbsp;
                    <TwitterIcon /> &nbsp;
                    <LinkedInIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="untree_co-section">
        <div className="testimonial-grid">
          <div
            className="testimonial-image img-4"
            data-aos="fade-right"
            data-aos-delay="100"
          ></div>
          <div
            className="testimonial-inner"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <blockquote>
              &ldquo;The public is more familiar with bad design than good
              design. It is, in effect, conditioned to prefer bad design,
              because that is what it lives with. The new becomes threatening,
              the old reassuring.&rdquo;
              <div className="person-image mt-3 d-flex align-items-center">
                <img
                  src="https://images.unsplash.com/photo-1590769620285-6926a01c2a58?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="CEO"
                  className="img-fluid"
                />
                <div>
                  <span className="name">Dharmil Vaghasiya</span>
                  <span className="position">CEO, Founder</span>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </div> */}

      <FooterPage />
    </>
  );
};

export default About;
