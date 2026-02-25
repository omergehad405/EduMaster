import React from 'react'
import HeroSection from './HeroSection'
import AboutUs from './AboutUs'
import OurFeatures from './OurFeatures'
import HowItWorks from './HowItWorks'
import BenefitsSection from './BenefitsSection'
import CTAsection from './CTAsection'
import FAQsection from './FAQsection'

function HomePage() {
    return (
        <div>
            {/* STEP 1: Uncomment ONE section at a time */}
            <HeroSection />
            <AboutUs />
            <OurFeatures />
            <HowItWorks />
            <BenefitsSection />
            <CTAsection />
            <FAQsection />
        </div>
    )
}

export default HomePage
