// import { assets } from '../assets/assets'

// const AppDownload = () => {
//     return (
//         <div className='container px-4 2xl:px-20 mx-auto my-20'>
//             <div className='relative bg-gradient-to-r from-violet-50 to-purple-50 p-12 sm:p-24 lg:p-32 rounded-lg'>
//                 <div>
//                     <h1 className='text-2xl sm:text-4xl font-bold mb-8 max-w-md'>Download Mobile App For Better Experience</h1>
//                     <div className='flex gap-4'>
//                         <a href="#" className='inline-block'>
//                             <img className='h-12' src={assets.play_store} alt="" />
//                         </a>
//                         <a href="#" className='inline-block'>
//                             <img className='h-12' src={assets.app_store} alt="" />
//                         </a>
//                     </div>
//                 </div>
//                 <img className='absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden' src={assets.app_main_img} alt="" />
//             </div>
//         </div>
//     )
// }

// export default AppDownload
// import { assets } from "../assets/assets";

// const AppDownload = () => {
//   return (
//     <div className="container px-4 2xl:px-20 mx-auto my-20">
//       <div className="bg-white border border-gray-200 p-8 rounded-lg text-center">
//         <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
//           Download the JobFinder App
//         </h2>
//         <p className="text-gray-600 max-w-xl mx-auto mb-6">
//           Experience seamless job search, real-time updates, and apply with just
//           a tap. Your next job opportunity is now at your fingertips.
//         </p>

//         <div className="flex justify-center gap-4 mb-6">
//           <a href="#">
//             <img className="h-12" src={assets.play_store} alt="Play Store" />
//           </a>
//           <a href="#">
//             <img className="h-12" src={assets.app_store} alt="App Store" />
//           </a>
//         </div>

//         <div className="mt-4 text-sm text-gray-500">
//           Trusted by thousands of job seekers and growing daily 🚀
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppDownload;
import React, { useState } from "react";
import { assets } from "../assets/assets";

const reviews = [
  {
    text: "Found my current role in a week, thanks to JobFinder!",
    name: "Priya, PM",
  },
  { text: "Instant alerts kept me ahead. Love it!", name: "Rahul, SDE" },
  { text: "Applying with one tap is a game-changer.", name: "Anjali, UXD" },
];

const AppDownload = () => {
  const [idx, setIdx] = useState(0);
  const change = (dir) =>
    setIdx((prev) => (prev + dir + reviews.length) % reviews.length);

  return (
    <div className="max-w-lg mx-auto my-16 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        Get JobFinder App
      </h2>
      <p className="text-gray-600 mb-6">
        Seamless search, live updates & one-tap apply.
      </p>

      <div className="flex justify-center space-x-4 mb-6">
        <a href="#">
          <img src={assets.play_store} alt="Play Store" className="h-10" />
        </a>
        <a href="#">
          <img src={assets.app_store} alt="App Store" className="h-10" />
        </a>
      </div>

      <div className="relative p-4 bg-gray-50 rounded">
        <p className="italic text-gray-700 mb-2">“{reviews[idx].text}”</p>
        <p className="text-sm text-gray-500 text-right">
          — {reviews[idx].name}
        </p>
        <button
          onClick={() => change(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2"
          aria-label="Previous"
        >
          <img src={assets.arrow_left} alt="Prev" className="h-5" />
        </button>
        <button
          onClick={() => change(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2"
          aria-label="Next"
        >
          <img src={assets.arrow_right} alt="Next" className="h-5" />
        </button>
      </div>
    </div>
  );
};

export default AppDownload;
