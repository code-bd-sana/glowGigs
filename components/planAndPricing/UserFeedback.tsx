import React from 'react'
import SecondaryButton from '../shared/SecondaryButton'
import Link from 'next/link'

export default function UserFeedback() {
  return (
    <div className='flex flex-col justify-center items-center mt-16  mx-auto w-full '>
      <h4 className='font-bold text-lg'>Already a Glow Member?</h4>
      <p className='text-lg text-gray-800'>Access your account here</p>
      <Link href={'/login'}>
        <SecondaryButton text='Login' />
      </Link>
    </div>
  )
}
