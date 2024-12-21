import React from 'react';
import BannerCompo from './BannerCompo';
import Latest from '../../Components/Latest';
import FindUs from '../../Components/FindUs';
import History from '../../Components/History';
import Community from '../../Components/Community';
import AboutUs from '../../Components/AboutUs';

const Home = () => {
    return (
        <div>
            <BannerCompo></BannerCompo>
            <Latest></Latest>
            <AboutUs></AboutUs>
            <History></History>
            <Community></Community>
            <FindUs></FindUs>
        </div>
    );
};

export default Home;