import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import AboutUs from './AboutUs'
import OurFeatures from './OurFeatures'
import HowItWorks from './HowItWorks'
import BenefitsSection from './BenefitsSection'
import CTAsection from './CTAsection'
import FAQsection from './FAQsection'
import PointSystem from './PointSystem'
import { useLocation } from 'react-router-dom'

function HomePage() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <div>
            {/* STEP 1: Uncomment ONE section at a time */}
            <HeroSection />
            <AboutUs />
            <OurFeatures />
            <PointSystem />
            <HowItWorks />
            <BenefitsSection />
            <CTAsection />
            <FAQsection />
        </div>
    )
}

export default HomePage
