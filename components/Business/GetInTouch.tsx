"use client";

const GetInTouch = () => {
  return (
    <section className='bg-white py-24 relative'>
      {/* MAIN GRID */}
      <div className='max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 relative'>
        {/* LEFT CONTENT */}
        <div className='flex flex-col justi pt-10'>
          <h2 className='text-5xl font-serif text-gray-900 mb-4'>
            Get in Touch
          </h2>

          <p className='text-gray-600 mb-10 max-w-sm'>
            Contact us to list your business or inquire about memberships.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className='relative flex justify-end'>
          <div className='  p-8 w-full md:w-[90%]'>
            <form className='space-y-6'>
              {/* Business Name */}
              <div>
                <label className='block text-sm text-gray-700 mb-2'>
                  Business Name
                </label>
                <input
                  type='text'
                  placeholder='Enter your business name'
                  className='w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                />
              </div>

              {/* Email */}
              <div>
                <label className='block text-sm text-gray-700 mb-2'>
                  Contact Email*
                </label>
                <input
                  type='email'
                  placeholder='Enter your email address'
                  className='w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                />
              </div>

              {/* Message */}
              <div>
                <label className='block text-sm text-gray-700 mb-2'>
                  Message to GlowGigs*
                </label>
                <textarea
                  rows={4}
                  placeholder='Describe your job openings'
                  className='w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none'></textarea>
              </div>

              {/* Button */}
              <a
                href='https://mail.google.com/mail/?view=cm&fs=1&to=info@glowgigs.com'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block bg-blue-600 text-white px-10 py-3 rounded-full font-semibold hover:bg-blue-700 transition text-center'>
                Reach Out
              </a>
            </form>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH IMAGE BELOW */}
      {/* <div className="max-w-7xl mx-auto mt-20 rounded-2xl overflow-hidden">
        <Image
          src="/Home/getintouch.avif"
          alt="Get in touch visual"
          width={1200}
          height={500}
          className="w-full h-[420px] object-cover"
        />
      </div> */}
    </section>
  );
};

export default GetInTouch;
