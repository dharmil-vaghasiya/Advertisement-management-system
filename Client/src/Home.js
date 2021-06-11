import React  from 'react';
import NavbarPage from './Components/NavbarPage';
import CarouselPage from './Components/CarouselPage';
import FooterPage from './Components/FooterPage'
import { useHistory, useLocation } from 'react-router-dom'
import "./About.css";
const Home = () => {
    const history = useHistory()
    const location = useLocation();
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, "", window.location.href);
    };


    return (
        <>

            <NavbarPage />
            <CarouselPage />
            <FooterPage />

        </>
    )
}

export default Home;