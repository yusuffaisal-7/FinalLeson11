import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaGraduationCap, FaBook, FaGlobe, FaUserClock, FaChalkboardTeacher } from 'react-icons/fa';
import useAxiosPublic from '../../../hooks/UseAxiosPublic';
import { useLanguage } from '../../../providers/LanguageProvider';

const TeacherCard = ({ tutor, onClick }) => {
  const { translate } = useLanguage();
  
  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1 cursor-pointer w-full mx-auto flex flex-col h-full"
      onClick={onClick}
    >
      {/* Header with Photo and Basic Info */}
      <div className="relative bg-[#70C5D7] bg-opacity-10 px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
        {/* Status Badge */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2"></span>
            {translate('available')}
          </span>
        </div>

        {/* Profile Photo */}
        <div className="flex items-center gap-4">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
            <img
              src={tutor.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"}
              alt={tutor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#005482]">{tutor.name}</h3>
            <div className="flex items-center gap-1 text-yellow-400 mt-1">
              <FaStar />
              <span className="text-sm text-gray-600">4.9 (127)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-5 flex-1">
        {/* Education and Subjects */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <FaGraduationCap className="text-[#005482] mt-1 flex-shrink-0" size={14} />
              <div>
                <h4 className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-medium">{translate('education')}</h4>
                <p className="text-xs sm:text-sm text-gray-800 font-medium">
                  {tutor.educationalQualifications || 'BSc in Mathematics, NSU'}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2 sm:space-x-3">
              <FaUserClock className="text-[#005482] mt-1 flex-shrink-0" size={14} />
              <div>
                <h4 className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-medium">{translate('experience')}</h4>
                <p className="text-xs sm:text-sm text-gray-800 font-medium">{tutor.experience}+ {translate('yearsExperience')}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <FaBook className="text-[#005482] mt-1 flex-shrink-0" size={14} />
              <div>
                <h4 className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-medium">{translate('subjects')}</h4>
                <p className="text-xs sm:text-sm text-gray-800 font-medium">
                  {tutor.subjects?.join(', ') || 'Mathematics, Physics'}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2 sm:space-x-3">
              <FaChalkboardTeacher className="text-[#005482] mt-1 flex-shrink-0" size={14} />
              <div>
                <h4 className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-medium">{translate('teachingMode')}</h4>
                <p className="text-xs sm:text-sm text-gray-800 font-medium">{tutor.teachingMode || translate('onlineInPerson')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="flex items-start space-x-2 sm:space-x-3 pt-2 border-t border-gray-100">
          <FaGlobe className="text-[#005482] mt-1 flex-shrink-0" size={14} />
          <div>
            <h4 className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-medium">{translate('languages')}</h4>
            <p className="text-xs sm:text-sm text-gray-800 font-medium">
              {tutor.languages?.join(', ') || 'English, +2 more'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
        <button 
          className="w-full bg-[#DA3A60] text-white py-2.5 sm:py-3 rounded-lg hover:bg-[#c43255] transition-all duration-300 font-medium flex items-center justify-center gap-2 text-sm sm:text-base transform hover:scale-105"
        >
          {translate('viewFullProfile')}
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Teacher = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { translate } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const { data: tutors = [], isLoading, error } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tutors');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#DA3A60]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error: {error.message}
      </div>
    );
  }

  const displayedTutors = showAll ? tutors : tutors.slice(0, 3);

  return (
    <section className="w-full bg-gray-50 py-10 sm:py-12 md:py-16">
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-20 h-16 sm:h-20 bg-[#70C5D7] opacity-10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-24 sm:h-32 bg-[#DA3A60] opacity-5 rounded-full blur-2xl"></div>
          
          {/* Main heading with gradient and animation */}
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#DA3A60] text-transparent bg-clip-text transform hover:scale-105 transition-transform duration-300 inline-block">
              {translate('meetExperts')}
            </h2>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <div className="h-0.5 sm:h-1 w-8 sm:w-10 bg-[#DA3A60] rounded-full"></div>
              <div className="h-0.5 sm:h-1 w-16 sm:w-20 bg-[#70C5D7] rounded-full"></div>
              <div className="h-0.5 sm:h-1 w-8 sm:w-10 bg-[#DA3A60] rounded-full"></div>
            </div>
          </div>

          {/* Subheading with animation */}
          <div className="relative group cursor-default">
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed group-hover:text-[#005482] transition-colors duration-300 px-4">
              {translate('teacherDesc')}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 xl:gap-8 max-w-[1920px] mx-auto">
          {displayedTutors.map((tutor) => (
            <TeacherCard
              key={tutor._id}
              tutor={tutor}
              onClick={() => navigate(`/tutor/${tutor._id}`)}
            />
          ))}
        </div>

        {tutors.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#DA3A60] text-white px-8 py-3 rounded-lg hover:bg-[#c43255] transition-all duration-300 font-medium transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              {showAll ? translate('showLess') : translate('showMore')}
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Teacher;