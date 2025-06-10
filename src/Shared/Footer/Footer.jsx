

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaEnvelope,
// } from "react-icons/fa";

// import logo from "../../assets/Logo.png";
// import { useLanguage } from "../../providers/LanguageProvider";

// const Footer = () => {
//   const { translate } = useLanguage();

//   return (
//     <footer className="bg-[#005482] text-white w-full">
//       <div className="max-w-[1920px] mx-auto px-6 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//           {/* Company Info */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <img src={logo} alt="LessonPaw" className="h-8 w-auto" />
//               <h2 className="text-2xl font-bold">LessonPaw</h2>
//             </div>
//             <p className="text-gray-300">{translate("connectingStudents")}</p>
//             <div className="flex space-x-4">
//               <a
//                 href="https://facebook.com"
//                 className="hover:text-[#DA3A60] transition-colors"
//               >
//                 <FaFacebookF size={20} />
//               </a>
//               <a
//                 href="https://twitter.com"
//                 className="hover:text-[#DA3A60] transition-colors"
//               >
//                 <FaTwitter size={20} />
//               </a>
//               <a
//                 href="https://instagram.com"
//                 className="hover:text-[#DA3A60] transition-colors"
//               >
//                 <FaInstagram size={20} />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4">
//               {translate("quickLinks")}
//             </h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/" className="hover:text-[#DA3A60] transition-colors">
//                   {translate("home")}
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/find-teacher"
//                   className="hover:text-[#DA3A60] transition-colors"
//                 >
//                   {translate("findTeacher")}
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/become-teacher"
//                   className="hover:text-[#DA3A60] transition-colors"
//                 >
//                   {translate("becomeTeacher")}
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   className="hover:text-[#DA3A60] transition-colors"
//                 >
//                   {translate("about")}
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   className="hover:text-[#DA3A60] transition-colors"
//                 >
//                   {translate("contactUs")}
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/blogs"
//                   className="hover:text-[#DA3A60] transition-colors"
//                 >
//                   {translate("blog")}
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Subjects */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4">
//               {translate("subjects")}
//             </h3>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="https://www.google.com/search?q=mathematics"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-[#DA3A60] transition-colors"
//                 >
//                   {translate("mathematics")}
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://www.google.com/search?q=science"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-[#DA3A60] transition-colors"
//                 >
//                   {translate("sciences")}
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://www.google.com/search?q=language"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-[#DA3A60] transition-colors"
//                 >
//                   {translate("languages")}
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://www.google.com/search?q=history"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-[#DA3A60] transition-colors"
//                 >
//                   {translate("history")}
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://www.google.com/search?q=computer+science"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-[#DA3A60] transition-colors"
//                 >
//                   {translate("computerScience")}
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="https://www.google.com/search?q=Art+and+music"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="hover:text-[#DA3A60] transition-colors"
//                 >
//                   {translate("artsMusic")}
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4">
//               {translate("contactUs")}
//             </h3>
//             <ul className="space-y-4">
//               <li className="flex items-center gap-3">
//                 <FaMapMarkerAlt className="text-[#DA3A60]" />
//                 <span>
//                   4, Allées des Acajous, Delmas 95, Petion-Ville 6121, Haiti
//                 </span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <FaPhone className="text-[#DA3A60]" />
//                 <span>+1 (509) 3701 9232</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <FaEnvelope className="text-[#DA3A60]" />
//                 <span>info@jobpaw.com</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-700">
//         <div className="max-w-[1920px] mx-auto px-6 py-6">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-gray-400">{translate("allRightsReserved")}</p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

import logo from "../../assets/Logo.png";
import { useLanguage } from "../../providers/LanguageProvider";

const Footer = () => {
  const { translate } = useLanguage();

  return (
    <footer className="bg-[#005482] text-white w-full">
      <div className="max-w-[1920px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="LessonPaw" className="h-8 w-auto" />
              <h2 className="text-2xl font-bold">LessonPaw</h2>
            </div>
            <p className="text-gray-300">{translate("connectingStudents")}</p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-[#DA3A60] transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-[#DA3A60] transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-[#DA3A60] transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {translate("quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#DA3A60] transition-colors">
                  {translate("home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/find-teacher"
                  className="hover:text-[#DA3A60] transition-colors"
                >
                  {translate("findTeacher")}
                </Link>
              </li>
              <li>
                <Link
                  to="/become-teacher"
                  className="hover:text-[#DA3A60] transition-colors"
                >
                  {translate("becomeTeacher")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#DA3A60] transition-colors"
                >
                  {translate("about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#DA3A60] transition-colors"
                >
                  {translate("contactUs")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="hover:text-[#DA3A60] transition-colors"
                >
                  {translate("blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {translate("subjects")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.google.com/search?q=mathematics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DA3A60] transition-colors"
                >
                  {translate("mathematics")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/search?q=science"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DA3A60] transition-colors"
                >
                  {translate("sciences")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/search?q=language"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DA3A60] transition-colors"
                >
                  {translate("languages")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/search?q=history"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DA3A60] transition-colors"
                >
                  {translate("history")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/search?q=computer+science"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DA3A60] transition-colors"
                >
                  {translate("computerScience")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/search?q=Art+and+music"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DA3A60] transition-colors"
                >
                  {translate("artsMusic")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {translate("contactUs")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#DA3A60]" />
                <span>
                  4, Allées des Acajous, Delmas 95, Petion-Ville 6121, Haiti
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-[#DA3A60]" />
                <span>+1 (509) 3701 9232</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#DA3A60]" />
                <span>info@lesonpaw.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-[1920px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">{translate("allRightsReserved")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;