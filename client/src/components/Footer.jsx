// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
//       <img width={160} src={assets.logo} alt="" />
//       <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @GreatStack.dev | All right reserved.</p>
//       <div className='flex gap-2.5'>
//         <img width={38} src={assets.facebook_icon} alt="" />
//         <img width={38} src={assets.twitter_icon} alt="" />
//         <img width={38} src={assets.instagram_icon} alt="" />
//       </div>
//     </div>
//   )
// }

// export default Footer

import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-20">
      <div className="container px-4 2xl:px-20 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img width={140} src={assets.logo} alt="JobFinder Logo" />
          <span className="text-gray-700 text-sm max-sm:hidden">
            © 2025 JobFinder. All rights reserved.
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook">
            <img width={32} src={assets.facebook_icon} alt="Facebook" />
          </a>
          <a href="#" aria-label="Twitter">
            <img width={32} src={assets.twitter_icon} alt="Twitter" />
          </a>
          <a href="#" aria-label="Instagram">
            <img width={32} src={assets.instagram_icon} alt="Instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
