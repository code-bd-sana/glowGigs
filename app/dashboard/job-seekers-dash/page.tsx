import JobApplications from '@/components/JobSeeker/MyApplications';
import StatusCards from '@/components/JobSeeker/StatusCards';
import React from 'react';

const page = () => {
    return (
        <div>
            <StatusCards></StatusCards>
            <JobApplications></JobApplications>
        </div>
    );
};

export default page;