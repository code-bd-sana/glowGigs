const BusinessListingsFAQ = () => {
  return (
    <section className='bg-[linear-gradient(86deg,rgba(201,199,56,0.27),rgba(40,103,199,0.6))] py-24'>
      <div className='max-w-7xl mx-auto px-6 md:px-0'>
        {/* Heading */}
        <h2 className='text-5xl font-serif text-gray-900 text-center mb-16'>
          FAQ
        </h2>

        {/* FAQ Grid */}
        <div className='grid md:grid-cols-2 gap-x-16 gap-y-14'>
          {/* Q1 */}
          <div>
            <p className='text-xl font-semibold text-gray-900 mb-2'>
              How to submit a listing?
            </p>
            <p className='text-gray-600 leading-relaxed'>
              You can submit your business listing through our online form
              available on the website.
            </p>
          </div>

          {/* Q2 */}
          <div>
            <p className='text-xl font-semibold text-gray-900 mb-2'>
              Who can apply for jobs?
            </p>
            <p className='text-gray-600 leading-relaxed'>
              Professionals seeking employment can apply directly to job
              listings or message employers if they have a pro subscription.
            </p>
          </div>

          {/* Q3 */}
          <div>
            <p className='text-xl font-semibold text-gray-900 mb-2'>
              What is a pro subscription?
            </p>
            <p className='text-gray-600 leading-relaxed'>
              A pro subscription allows users to message specialists directly,
              access the showcase page, post unlimited job postings. and much
              more!
            </p>
          </div>

          {/* Q4 */}
          <div>
            <p className='text-xl font-semibold text-gray-900 mb-2'>
              Is there a fee to list?
            </p>
            <p className='text-gray-600 leading-relaxed'>
              Submitting a business listing on our basic membership is
              completely free.
            </p>
          </div>

          {/* Q5 */}
          <div>
            <p className='text-xl font-semibold text-gray-900 mb-2'>
              How long does listing last?
            </p>
            <p className='text-gray-600 leading-relaxed'>
              Listings remain active until the position is filled or removed by
              the business owner.
            </p>
          </div>

          {/* Q6 */}
          <div>
            <p className='text-xl font-semibold text-gray-900 mb-2'>
              Can I edit my business listing later?
            </p>
            <p className='text-gray-600 leading-relaxed'>
              Yes, you can edit your business listing anytime through your
              account dashboard after logging in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessListingsFAQ;
