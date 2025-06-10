

// import React, { useState, useEffect, useContext } from 'react';
// import Swal from 'sweetalert2';
// import { useLanguage } from '../providers/LanguageProvider';
// import { AuthContext } from '../providers/AuthProvider';
// import useAxiosSecure from '../hooks/useAxiosSecure';
// import { Link } from 'react-router-dom';

// const Contact = () => {
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [mapError, setMapError] = useState(false);
//   const { translate } = useLanguage();
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleMapError = () => {
//     setMapError(true);
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) {
//       return Swal.fire('Error', translate('pleaseEnterMessage'), 'error');
//     }
//     setIsSubmitting(true);
//     try {
//       await axiosSecure.post('/send-message', { message, email: user?.email });
//       setMessage('');
//       Swal.fire(translate('sent'), translate('messageSent'), 'success');
//     } catch (error) {
//       Swal.fire(
//         translate('error'),
//         error.response?.data?.message || translate('failedToSendMessage'),
//         'error'
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#005482] to-[#70C5D7]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             {translate('getInTouch')} <span className="text-[#FCBB45]">LessonPaw</span>
//           </h1>
//           <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
//             {translate('contactSubtitle')}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left Column - Contact Form */}
//           <div className="lg:col-span-8 space-y-8">
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//               <div className="p-8">
//                 <h2 className="text-2xl font-bold text-[#005482] mb-6">{translate('sendMessage')}</h2>
//                 {user ? (
//                   <form onSubmit={handleSendMessage} className="space-y-6">
//                     <div>
//                       <textarea
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA3A60] focus:border-transparent resize-none transition duration-200"
//                         placeholder={translate('writeMessage')}
//                         rows="8"
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="w-full bg-[#DA3A60] text-white py-4 rounded-xl text-base font-semibold hover:bg-[#c43255] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isSubmitting ? translate('sending') : translate('sendMessage')}
//                     </button>
//                   </form>
//                 ) : (
//                   <div className="flex flex-col items-center py-8">
//                     <h4 className="text-2xl font-bold text-gray-900 mb-4">{translate('signInToMessage')}</h4>
//                     <p className="text-gray-600 mb-8 max-w-md text-center">{translate('pleaseLoginMessage')}</p>
//                     <Link
//                       to="/login"
//                       className="inline-block bg-[#DA3A60] text-white py-4 px-8 rounded-xl text-center font-semibold hover:bg-[#c43255] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
//                     >
//                       {translate('login')}
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Google Maps Integration */}
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//               <div className="p-8">
//                 <h2 className="text-2xl font-bold text-[#005482] mb-6">{translate('ourLocation')}</h2>
//                 <div className="relative rounded-xl overflow-hidden">
//                   {mapError ? (
//                     <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
//                       <div className="text-center p-6">
//                         <svg className="w-12 h-12 text-gray-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         <p className="text-gray-600 mb-2">Map loading failed</p>
//                         <a 
//                           href="https://www.google.com/maps/place/Haiti/@19.1399952,-72.3570972,8z"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-[#005482] hover:text-[#70C5D7] transition-colors"
//                         >
//                           View on Google Maps
//                         </a>
//                       </div>
//                     </div>
//                   ) : (
//                     <iframe
//                       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d967068.9076569386!2d-73.18063697866716!3d18.791091386096897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb6c6f37fcbbb11%3A0xb51438b24c54f6d3!2sHaiti!5e0!3m2!1sen!2sus!4v1709926166599!5m2!1sen!2sus"
//                       className="w-full h-[400px] rounded-xl"
//                       style={{ border: 0 }}
//                       allowFullScreen=""
//                       loading="lazy"
//                       referrerPolicy="no-referrer-when-downgrade"
//                       onError={handleMapError}
//                       title="Haiti Map"
//                     />
//                   )}
//                 </div>
//                 <div className="mt-4 flex justify-between items-center">
//                   <p className="text-sm text-gray-600">
//                     45 Boulevard Jean-Jacques Dessalines, Turgeau, Port-au-Prince
//                   </p>
//                   <a
//                     href="https://www.google.com/maps/dir//Port-au-Prince,+Haiti/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center text-base text-[#005482] hover:text-[#70C5D7] transition-colors"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     {translate('getDirections')}
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Information Cards */}
//           <div className="lg:col-span-4 space-y-8">
//             {/* Business Hours Card */}
//             <div className="bg-white rounded-2xl shadow-xl">
//               <div className="p-8">
//                 <h2 className="text-2xl font-bold text-[#005482] mb-6">{translate('businessHours')}</h2>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">{translate('mondayFriday')}</span>
//                     <span className="text-gray-900 font-semibold">9:00 AM - 6:00 PM</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">{translate('saturday')}</span>
//                     <span className="text-gray-900 font-semibold">10:00 AM - 4:00 PM</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">{translate('sunday')}</span>
//                     <span className="text-gray-900 font-semibold">{translate('closed')}</span>
//                   </div>
//                   <div className="pt-4 border-t border-gray-100">
//                     <p className="text-sm text-gray-500">
//                       {translate('All times are in Eastern Time (ET)')}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Information Card */}
//             <div className="bg-white rounded-2xl shadow-xl">
//               <div className="p-8">
//                 <h2 className="text-2xl font-bold text-[#005482] mb-6">{translate('contactInfo')}</h2>
//                 <div className="space-y-6">
//                   <div className="flex items-start space-x-4">
//                     <div className="w-10 h-10 rounded-full bg-[#70C5D7]/10 flex items-center justify-center flex-shrink-0">
//                       <svg className="w-5 h-5 text-[#70C5D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Email</p>
//                       <a href="mailto:support@lessonpaw.com" className="text-base text-[#005482] hover:text-[#70C5D7] transition-colors font-medium">
//                         support@lessonpaw.com
//                       </a>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-4">
//                     <div className="w-10 h-10 rounded-full bg-[#70C5D7]/10 flex items-center justify-center flex-shrink-0">
//                       <svg className="w-5 h-5 text-[#70C5D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Phone</p>
//                       <a href="tel:(123) 456-7890" className="text-base text-[#005482] hover:text-[#70C5D7] transition-colors font-medium">
//                         (123) 456-7890
//                       </a>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-4">
//                     <div className="w-10 h-10 rounded-full bg-[#70C5D7]/10 flex items-center justify-center flex-shrink-0">
//                       <svg className="w-5 h-5 text-[#70C5D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600 mb-1">Address</p>
//                       <p className="text-base text-[#005482] font-medium">
//                         45 Boulevard Jean-Jacques Dessalines<br />
//                         Turgeau<br />
//                         Port-au-Prince, Haiti
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Connect With Us Card */}
//             <div className="bg-white rounded-2xl shadow-xl">
//               <div className="p-8">
//                 <h2 className="text-2xl font-bold text-[#005482] mb-6">{translate('connectWithUs')}</h2>
//                 <div className="flex justify-center space-x-8">
//                   <a href="#" className="text-gray-400 hover:text-[#70C5D7] transition-colors">
//                     <span className="sr-only">Facebook</span>
//                     <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                     </svg>
//                   </a>
//                   <a href="#" className="text-gray-400 hover:text-[#70C5D7] transition-colors">
//                     <span className="sr-only">Twitter</span>
//                     <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                     </svg>
//                   </a>
//                   <a href="#" className="text-gray-400 hover:text-[#70C5D7] transition-colors">
//                     <span className="sr-only">Instagram</span>
//                     <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
//                       <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 0 010-2.4z" clipRule="evenodd" />
//                     </svg>
//                   </a>
//                   <a href="#" className="text-gray-400 hover:text-[#70C5D7] transition-colors">
//                     <span className="sr-only">LinkedIn</span>
//                     <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.221 0h.003z" />
//                     </svg>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { useLanguage } from '../providers/LanguageProvider';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapError, setMapError] = useState(false);
  const { translate } = useLanguage();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMapError = () => {
    setMapError(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return Swal.fire('Error', translate('pleaseEnterMessage'), 'error');
    }
    setIsSubmitting(true);
    try {
      await axiosSecure.post('/send-message', { message, email: user?.email });
      setMessage('');
      Swal.fire(translate('sent'), translate('messageSent'), 'success');
    } catch (error) {
      Swal.fire(
        translate('error'),
        error.response?.data?.message || translate('failedToSendMessage'),
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005482] to-[#70C5D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {translate('getInTouch')} <span className="text-[#FCBB45]">LessonPaw</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {translate('contactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#005482] mb-6">{translate('sendMessage')}</h2>
                {user ? (
                  <form onSubmit={handleSendMessage} className="space-y-6">
                    <div>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA3A60] focus:border-transparent resize-none transition duration-200"
                        placeholder={translate('writeMessage')}
                        rows="8"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#DA3A60] text-white py-4 rounded-xl text-base font-semibold hover:bg-[#c43255] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? translate('sending') : translate('sendMessage')}
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center py-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">{translate('signInToMessage')}</h4>
                    <p className="text-gray-600 mb-8 max-w-md text-center">{translate('pleaseLoginMessage')}</p>
                    <Link
                      to="/login"
                      className="inline-block bg-[#DA3A60] text-white py-4 px-8 rounded-xl text-center font-semibold hover:bg-[#c43255] transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {translate('login')}
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Google Maps Integration */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#005482] mb-6">{translate('ourLocation')}</h2>
                <div className="relative rounded-xl overflow-hidden">
                  {mapError ? (
                    <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
                      <div className="text-center p-6">
                        <svg className="w-12 h-12 text-gray-400 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-gray-600 mb-2">Map loading failed</p>
                        <a 
                          href="https://www.google.com/search?q=JobPaw"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#005482] hover:text-[#70C5D7] transition-colors"
                        >
                          View on Google Maps
                        </a>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d941.0478927843384!2d-72.29750799094754!3d18.511492847705023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb9e7cd4a1c7d15%3A0x7b6ea9c8afeb3bd2!2sGPG8%2BGM%20Petion-Ville%2C%20Haiti!5e0!3m2!1sen!2sus!4v1709926166599!5m2!1sen!2sus"
                      className="w-full h-[400px] rounded-xl"
                      style={{ 
                        border: 0,
                        filter: 'grayscale(100%)'
                      }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      onError={handleMapError}
                      title="JobPaw Office Location - GPG8+GM Petion-Ville, Haiti"
                    />
                  )}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    JobPaw - GPG8+GM, Delmas 95, Petion-Ville 6121, Haiti
                  </p>
                  <a
                    href="https://www.google.com/maps/place/GPG8%2BGM+Petion-Ville,+Haiti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-base text-[#005482] hover:text-[#70C5D7] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {translate('getDirections')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Information Cards */}
          <div className="lg:col-span-4 space-y-8">
            {/* Business Hours Card */}
            <div className="bg-white rounded-2xl shadow-xl">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#005482] mb-6">{translate('businessHours')}</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{translate('mondayFriday')}</span>
                    <span className="text-gray-900 font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{translate('saturday')}</span>
                    <span className="text-gray-900 font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{translate('sunday')}</span>
                    <span className="text-gray-900 font-semibold">{translate('closed')}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      {translate('All times are in Eastern Time (ET)')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-xl">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#005482] mb-6">{translate('contactInfo')}</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#70C5D7]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#70C5D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <a href="mailto:info@lesonpaw.com" className="text-base text-[#005482] hover:text-[#70C5D7] transition-colors font-medium">
                        info@lesonpaw.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#70C5D7]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#70C5D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone</p>
                      <a href="tel:+15093701923" className="text-base text-[#005482] hover:text-[#70C5D7] transition-colors font-medium">
                        +1 (509) 3701 9232
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#70C5D7]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#70C5D7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Address</p>
                      <p className="text-base text-[#005482] font-medium">
                        4, Allées des Acajous<br />
                        Delmas 95, Petion-Ville<br />
                        6121, Haiti
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connect With Us Card */}
            <div className="bg-white rounded-2xl shadow-xl">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#005482] mb-6">{translate('connectWithUs')}</h2>
                <div className="flex justify-center space-x-8">
                  <a href="#" className="text-gray-400 hover:text-[#70C5D7] transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#70C5D7] transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#70C5D7] transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#70C5D7] transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.221 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;