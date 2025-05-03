// Home Page
import React from 'react'
import MentorDirectory from "../components/public-views/MentorDirectory";
import SignUp from '../components/auth/signup-section/SignUp';

const HomePage = (props) => {
  return (
    <>
      <div className="bg-[url('https://images.unsplash.com/photo-1531101930610-1b86e66d5fd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] relative z-0 bg-cover bg-no-repeat w-full lg:h-screen after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-50">
        <div className="relative z-10 flex flex-col justify-center items-center text-center text-white px-6 pt-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg uppercase">
            Benn Rising Mentorship Program
          </h2>
          <p className="text-3xl mb-6 text-shadow-sm pt-6">
            Goal Statement
          </p>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 p-4'>
            <div className='col-span-1 md:col-span-2 overflow-y-scroll h-[45vh] p-4'>
              <label className='uppercase'>Sort by Interests</label>
              <select className='w-full border-4 border-[#1b0a5f] p-2 rounded-md' name="interests" id="interests">
              <option value="" disabled selected>
                Select an option
              </option>
                <option value="science" className="text-black">Science</option>
                <option value="technology" className="text-black">Technology</option>
                <option value="engineering" className="text-black">Engineering</option>
                <option value="mathematics" className="text-black">Mathematics</option>
              </select>
              <div className='py-2'>
                <MentorDirectory token={props.token}/>
              </div>
              <div className='py-2'>
                <MentorDirectory token={props.token}/>
              </div>
              <div className='py-2'>
                <MentorDirectory token={props.token}/>
              </div>
            </div>
            <div className='col-span-1 md:col-span-2'>
              <div className="flex flex-col justify-between gap-4 items-center h-full">
                <div className='bg-[#1b0a5f] rounded-lg p-4 w-full h-full flex flex-col justify-center items-center'>
                  <h2 className='uppercase'>Welcome Statement</h2>
                </div>
                <div className='bg-[#1b0a5f] rounded-lg p-4 w-full h-full flex flex-col justify-center items-center'>
                  <h2 className='uppercase'>Introduction to Mentee</h2>
                </div>
                <div className='bg-[#1b0a5f] rounded-lg p-4 w-full h-full flex flex-col justify-center items-center'>
                  <h2 className='uppercase'>Video project statement</h2>
                </div>
                <div className='bg-[#1b0a5f] rounded-lg p-4 w-full h-full flex flex-col justify-center items-center'>
                  <h2 className='uppercase'>Science Eduction project statement</h2>
                </div>
              </div>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage