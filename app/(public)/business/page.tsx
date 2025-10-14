import BusinessListings from '@/components/Business/BusinessListings';
import BusinessListingsFAQ from '@/components/Business/BusinessListingsFAQ';
import BuisinessTestimonial from '@/components/Business/BusinessTestimonial';
import ConnectAndGrow from '@/components/Business/ConnectAndGrow';
import GetInTouch from '@/components/Business/GetInTouch';
import JoinBusinessNetwork from '@/components/Business/JoinBusinessNetwork';
import React from 'react';

const page = () => {
    return (
        <div>
           <ConnectAndGrow></ConnectAndGrow>
           <JoinBusinessNetwork></JoinBusinessNetwork>
           <BusinessListings></BusinessListings>
           <BuisinessTestimonial></BuisinessTestimonial>
           <BusinessListingsFAQ></BusinessListingsFAQ>
           <GetInTouch></GetInTouch>
        </div>
    );
};

export default page;