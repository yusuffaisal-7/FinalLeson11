import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaHeadset, FaComments, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../../../providers/LanguageProvider';

const Message = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [message, setMessage] = useState('');
  const { translate } = useLanguage();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return Swal.fire('Error', translate('pleaseEnterMessage'), 'error');
    }
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
    }
  };

  const supportFeatures = [
    {
      icon: <FaHeadset className="text-4xl text-[#DA3A60]" />,
      title: translate('support247'),
      description: translate('supportAvailable')
    },
    {
      icon: <FaComments className="text-4xl text-[#70C5D7]" />,
      title: translate('quickResponse'),
      description: translate('supportResponse')
    },
    {
      icon: <FaEnvelope className="text-4xl text-[#FCBB45]" />,
      title: translate('contactSupport'),
      description: translate('supportDesc')
    }
  ];

  return (
    <div className="w-full bg-white py-12 sm:py-16 md:py-20">
      <div className="w-full px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
              {translate('supportHelp')} <span className="text-[#DA3A60]">{translate('supportTeam')}</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              {translate('supportDesc')}
            </p>
          </motion.div>

          {/* Support Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16"
          >
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="mb-4 sm:mb-6 flex justify-center">
                  {React.cloneElement(feature.icon, {
                    className: `text-3xl sm:text-4xl ${feature.icon.props.className.split(' ').pop()}`
                  })}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form Section */}
          <div className="bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left side - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4 sm:space-y-6"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{translate('contactSupport')}</h3>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {translate('supportDesc')}
                </p>
                <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-8">
                  <div className="flex items-center space-x-3 sm:space-x-4 text-gray-600">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#DA3A60] bg-opacity-10 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-[#DA3A60] text-lg sm:text-xl" />
                    </div>
                    <span className="text-sm sm:text-base">support@lesonpaw.com</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4 text-gray-600">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#DA3A60] bg-opacity-10 rounded-full flex items-center justify-center">
                      <FaHeadset className="text-[#DA3A60] text-lg sm:text-xl" />
                    </div>
                    <span className="text-sm sm:text-base">+1 (509) 3701 9232</span>
                  </div>
                </div>
              </motion.div>

              {/* Right side - Message Form or Login Prompt */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg"
              >
                {user ? (
                <form onSubmit={handleSendMessage} className="space-y-4 sm:space-y-6">
                  <div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA3A60] focus:border-transparent resize-none"
                      placeholder={translate('writeMessage')}
                      rows="6"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#DA3A60] text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:bg-[#c43255] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {translate('sendMessage')}
                  </button>
                </form>
                ) : (
                  <div className="text-center space-y-4 sm:space-y-6">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900">{translate('signInToMessage')}</h4>
                    <p className="text-sm sm:text-base text-gray-600">{translate('pleaseLoginMessage')}</p>
                    <Link
                      to="/login"
                      className="inline-block w-full bg-[#DA3A60] text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:bg-[#c43255] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                    >
                      {translate('login')}
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;