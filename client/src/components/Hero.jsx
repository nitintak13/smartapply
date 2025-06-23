// import { useContext, useRef } from 'react'
// import { assets } from '../assets/assets'
// import { AppContext } from '../context/AppContext'

// const Hero = () => {

//     const { setSearchFilter, setIsSearched } = useContext(AppContext)

//     const titleRef = useRef(null)
//     const locationRef = useRef(null)

//     const onSearch = () => {
//         setSearchFilter({
//             title: titleRef.current.value,
//             location: locationRef.current.value
//         })
//         setIsSearched(true)
//     }

//     return (
//         <div className='container 2xl:px-20 mx-auto my-10'>
//             <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl'>
//                 <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
//                 <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
//                 <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
//                     <div className='flex items-center'>
//                         <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
//                         <input type="text"
//                             placeholder='Search for jobs'
//                             className='max-sm:text-xs p-2 rounded outline-none w-full'
//                             ref={titleRef}
//                         />
//                     </div>
//                     <div className='flex items-center'>
//                         <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
//                         <input type="text"
//                             placeholder='Location'
//                             className='max-sm:text-xs p-2 rounded outline-none w-full'
//                             ref={locationRef}
//                         />
//                     </div>
//                     <button onClick={onSearch} className='bg-blue-600 px-6 py-2 rounded text-white m-1'>Search</button>
//                 </div>
//             </div>

//             <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
//                 <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
//                     <p className='font-medium'>Trusted by</p>
//                     <img className='h-6' src={assets.microsoft_logo} alt="" />
//                     <img className='h-6' src={assets.walmart_logo} alt="" />
//                     <img className='h-6' src={assets.accenture_logo} alt="" />
//                     <img className='h-6' src={assets.samsung_logo} alt="" />
//                     <img className='h-6' src={assets.amazon_logo} alt="" />
//                     <img className='h-6' src={assets.adobe_logo} alt="" />
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Hero
import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

export default function Hero() {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true);
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white py-20">
      <div className="container mx-auto px-4 2xl:px-20 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Discover Exciting Career Opportunities
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-base md:text-lg opacity-90">
          Explore thousands of curated job listings and take the next step in
          your professional journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center bg-white rounded-lg p-4 shadow-lg max-w-3xl mx-auto">
          <div className="flex items-center flex-1 px-3 py-2 mb-3 sm:mb-0 sm:mr-2 bg-gray-100 rounded">
            <img
              src={assets.search_icon}
              alt="Search Icon"
              className="h-5 w-5 mr-2 text-gray-400"
            />
            <input
              ref={titleRef}
              type="text"
              placeholder="Job title or keyword"
              className="w-full outline-none text-gray-700 bg-transparent placeholder-gray-500"
            />
          </div>

          <div className="flex items-center flex-1 px-3 py-2 mb-3 sm:mb-0 sm:mr-2 bg-gray-100 rounded">
            <img
              src={assets.location_icon}
              alt="Location Icon"
              className="h-5 w-5 mr-2 text-gray-400"
            />
            <input
              ref={locationRef}
              type="text"
              placeholder="City or country"
              className="w-full outline-none text-gray-700 bg-transparent placeholder-gray-500"
            />
          </div>

          <button
            onClick={onSearch}
            className="bg-indigo-600 hover:bg-indigo-800 transition px-6 py-2 rounded-lg text-white font-semibold"
          >
            Search Jobs
          </button>
        </div>

        <div className="mt-12 pt-6">
          <p className="uppercase text-sm opacity-80 mb-4">Our Partners</p>
          <div className="flex items-center justify-center flex-wrap gap-6">
            {[
              assets.microsoft_logo,

              assets.accenture_logo,
              assets.samsung_logo,
              assets.amazon_logo,
              assets.adobe_logo,
            ].map((logo, idx) => (
              <img
                key={idx}
                src={logo}
                alt="Partner logo"
                className="h-8 opacity-80 hover:opacity-100 transition"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
