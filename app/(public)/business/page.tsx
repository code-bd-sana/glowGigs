
import PriceingEmployee from '@/components/Business/BusinessListings';
import BusinessListingsFAQ from '@/components/Business/BusinessListingsFAQ';
import BuisinessTestimonial from '@/components/Business/BusinessTestimonial';
import ConnectAndGrow from '@/components/Business/ConnectAndGrow';
import GetInTouch from '@/components/Business/GetInTouch';
import JoinBusinessNetwork from '@/components/Business/JoinBusinessNetwork';
import TermsOfUse from '@/components/Business/TermsOfUse';
import React from 'react';

const page = () => {
    return (
        <div>
           <ConnectAndGrow></ConnectAndGrow>
  
           <PriceingEmployee/>
        
           <BuisinessTestimonial></BuisinessTestimonial>
           <BusinessListingsFAQ></BusinessListingsFAQ>
           <GetInTouch></GetInTouch>
           {/* <TermsOfUse></TermsOfUse> */}
        </div>
    );
};

export default page;