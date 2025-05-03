// Home Page
import React, { useEffect, useRef } from 'react'
import MentorDirectory from "../components/public-views/MentorDirectory";
import SignUp from '../components/auth/signup-section/SignUp';

const HomePage = (props) => {
  // set referencess for dynamic column adjustments
  const rightColumnRef = useRef(null);
  const leftColumnRef = useRef(null);
  const dropdownRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const matchColumnHeights = () => {
      if (rightColumnRef.current && leftColumnRef.current && dropdownRef.current) {
        const rightHeight = rightColumnRef.current.clientHeight;
        const dropdownHeight = dropdownRef.current.clientHeight;
        
        // Set scrollable area height
        cardsContainerRef.current.style.height = `${rightHeight - dropdownHeight}px`;
        // Match overall column height
        leftColumnRef.current.style.height = `${rightHeight}px`;
      }
    };

    matchColumnHeights();
    window.addEventListener('resize', matchColumnHeights);
    return () => window.removeEventListener('resize', matchColumnHeights);
  }, []);

  return (
    <>
      <div className="bg-[url('https://images.unsplash.com/photo-1531101930610-1b86e66d5fd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] relative z-0 bg-cover bg-no-repeat w-full min-h-screen after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-50">
        <div className="relative z-10 flex flex-col justify-center items-center text-center text-white px-6 pt-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg uppercase">
            Bennington Rising Mentorship Program
          </h2>
          <p className="text-2xl mb-6 text-shadow-sm pt-6">
          Bennington Rising aims to empower local youth and college students through mentorship and structured collaboration on community projects that promote mental well-being and a sense of belonging.
          </p>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 p-4'>
            <div ref={leftColumnRef} className='col-span-1 md:col-span-2 p-4 flex flex-col'>
              <div ref={dropdownRef}>
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
              </div>
              <div ref={cardsContainerRef} className='overflow-y-auto mt-2'>
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
            </div>
                 <div ref={rightColumnRef} className='col-span-1 md:col-span-2'>
              <div className="flex flex-col justify-between gap-4 items-center h-full">
                <div className='bg-[#1b0a5f] rounded-lg p-4 w-full h-full flex flex-col justify-center items-center'>
                  <h2 className='uppercase text-xl font-bold mb-3 border-b-2 border-white pb-1 w-full text-center'>Welcome!</h2>
                  <p>We need you. Have a real-world impact while collaborating with college students to co-develop amazing projects. You will gain valuable skills while boosting your resume.<br />This program requires commitment of approximately 1 hour per week from now until late December. Join us in the fun.</p>
                </div>
                <div className='bg-[#1b0a5f] rounded-lg p-4 w-full h-full flex flex-col justify-center items-center'>
                  <h2 className='uppercase text-xl font-bold mb-3 border-b-2 border-white pb-1 w-full text-center'>Instructions for mentees</h2>
                  <p>Click on a mentor card to the left, and sign up to be part of the team co-developing a specific community project. Some mentees are working on video projects while others are creating science lessons for elementary kids. Explore the mentors and choose one that aligns with your interests. This is going to fun and help you build important skills that colleges and employers want.</p>
                </div>
                <div className='bg-[#1b0a5f] rounded-lg p-4 w-full h-full flex flex-col justify-center items-center'>
                  <h2 className='uppercase text-xl font-bold mb-3 border-b-2 border-white pb-1 w-full text-center'>Video project statement</h2>
                  <p>Join two college students and make a 2-3 minute video showing your teams meaning of "You belong here." Who is "you", what you mean by "belong", and wherever "here" is up to you and the team. In late fall, your team's short video will be shown, together with other "You belong here" videos, as a public movie premier at a red carpet event in downtown Bennington.</p>
                </div>
                <div className='bg-[#1b0a5f] rounded-lg p-4 w-full h-full flex flex-col justify-center items-center'>
                  <h2 className='uppercase text-xl font-bold mb-3 border-b-2 border-white pb-1 w-full text-center'>Science Eduction project statement</h2>
                  <p>Join two college students and co-develop a brief hands-on science lesson for elementary school kids. Your team will create an exciting lesson with an activity that sparks curiosity in young learners—while building your skills in collaborative problem-solving, science communication, educational design. You and your team will deliver the brief lesson to elementary school kids, showing them that science is fun.</p>
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