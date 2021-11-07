import React from 'react';
import Navigaation from '../../Shared/Navigation/Navigaation';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';

const Home = () => {
    return (
        <div>
            <Navigaation></Navigaation>
            <Services></Services>
            <AppointmentBanner></AppointmentBanner>
            <Banner></Banner>
        </div>
    );
};

export default Home;