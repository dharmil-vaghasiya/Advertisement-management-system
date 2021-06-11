import React from "react";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
} from "mdbreact";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
// import "./carous.css";
const CarouselPage = () => {
  return (
    <>
      <MDBContainer className="mt-5 mb-5">
        <MDBCarousel
          activeItem={1}
          length={3}
          showControls={true}
          showIndicators={true}
          className="z-depth-1"
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                  alt="First slide"
                />
                <MDBMask overlay="black-light" />
              </MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">Influencer</h3>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1081&q=80"
                  alt="Second slide"
                />
                
              </MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">Influencer Advertisement</h3>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"
                  alt="Third slide"
                />
                
              </MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">Brands Advertisement</h3>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer>

      <div className="untree_co-section bg-light">
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
      </div>

    </>
  );
};

export default CarouselPage;
