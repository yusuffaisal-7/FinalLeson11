import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaUsers, FaChalkboardTeacher, FaGlobe, FaLinkedin, 
  FaTwitter, FaEnvelope, FaCheckCircle, FaStar, FaClock, FaShieldAlt, 
  FaHandshake, FaLightbulb, FaChartLine, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useLanguage } from '../../providers/LanguageProvider';
import { AuthContext } from '../../providers/AuthProvider';
import imge1 from '../../assets/AboutUs3.jpg';
import imge2 from '../../assets/AboutUs2.jpg';
import imge3 from '../../assets/AboutUs.jpg';

const SectionHeader = ({ title, subtitle, isDark = false }) => {
  const { translate } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 sm:mb-16"
    >
      <div className="flex flex-col items-center px-4 sm:px-0">
        <div className="relative">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
            isDark ? 'text-white' : 'bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#005482] text-transparent bg-clip-text'
          }`}>
            {translate(title)}
          </h2>
          {/* Decorative Elements */}
          <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-8 sm:w-12 h-8 sm:h-12 border-t-4 border-l-4 border-[#FCBB45] rounded-tl-lg"></div>
          <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-8 sm:w-12 h-8 sm:h-12 border-b-4 border-r-4 border-[#DA3A60] rounded-br-lg"></div>
        </div>
        {/* Animated Lines */}
        <div className="flex items-center gap-2 sm:gap-4 mt-4 sm:mt-6">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '2rem', sm: '3rem' }}
            viewport={{ once: true }}
            className={`h-0.5 sm:h-1 ${isDark ? 'bg-[#FCBB45]' : 'bg-[#DA3A60]'}`}
          ></motion.div>
          <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${isDark ? 'bg-white' : 'bg-[#005482]'}`}></div>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '3rem', sm: '5rem' }}
            viewport={{ once: true }}
            className={`h-0.5 sm:h-1 ${isDark ? 'bg-white' : 'bg-[#70C5D7]'}`}
          ></motion.div>
          <div className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${isDark ? 'bg-white' : 'bg-[#005482]'}`}></div>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '2rem', sm: '3rem' }}
            viewport={{ once: true }}
            className={`h-0.5 sm:h-1 ${isDark ? 'bg-[#FCBB45]' : 'bg-[#DA3A60]'}`}
          ></motion.div>
        </div>
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-base sm:text-lg md:text-xl mt-4 sm:mt-6 max-w-3xl mx-auto px-4 sm:px-6 ${
              isDark ? 'text-white/80' : 'text-gray-600'
            }`}
          >
            {translate(subtitle)}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('students');
  const { translate } = useLanguage();
  const { user } = useContext(AuthContext);

  const stats = [
    { number: 5000, label: translate('studentsHelped'), icon: <FaGraduationCap />, description: translate('successfulLearners') },
    { number: 200, label: translate('expertTutors'), icon: <FaChalkboardTeacher />, description: translate('qualifiedEducators') },
    { number: 15, label: translate('subjectsCovered'), icon: <FaGlobe />, description: translate('diverseTopics') },
    { number: 98, label: translate('successRate'), icon: <FaUsers />, suffix: '%', description: translate('satisfactionRate') }
  ];

  const milestones = [
    { 
      year: '2023', 
      title: translate('ideaLaunch'), 
      description: translate('ideaLaunchDesc'),
      align: 'left'
    },
    { 
      year: '2024', 
      title: translate('prototypeTitle'), 
      description: translate('prototypeDesc'),
      align: 'right'
    },
    { 
      year: '2024', 
      title: translate('webLaunchTitle'), 
      description: translate('webLaunchDesc'),
      align: 'left'
    },
    { 
      year: '2025', 
      title: translate('recognitionTitle'), 
      description: translate('recognitionDesc'),
      align: 'right'
    }
  ];

  const teamMembers = [
    {
      name: 'Jean Baptiste',
      role: translate('founderRole'),
      image: imge1,
      bio: translate('founderBio'),
      achievements: [translate('yearsInEdTech'), translate('harvardGrad'), translate('educationAward')],
      social: { linkedin: '#', twitter: '#', email: '#' }
    },
    {
      name: 'Marie Claire',
      role: translate('educationRole'),
      image: imge2,
      bio: translate('educationBio'),
      achievements: [translate('formerProf'), translate('publishedAuthor'), translate('teachingAward')],
      social: { linkedin: '#', twitter: '#', email: '#' }
    },
    {
      name: 'Pierre Paul',
      role: translate('techRole'),
      image: imge3,
      bio: translate('techBio'),
      achievements: [translate('yearsInTech'), translate('mitGrad'), translate('techPatents')],
      social: { linkedin: '#', twitter: '#', email: '#' }
    }
  ];

  const values = [
    { icon: <FaHandshake />, title: translate('integrity'), description: translate('integrityDesc') },
    { icon: <FaLightbulb />, title: translate('innovation'), description: translate('innovationDesc') },
    { icon: <FaChartLine />, title: translate('growth'), description: translate('growthDesc') },
    { icon: <FaAward />, title: translate('excellence'), description: translate('excellenceDesc') }
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Parallax Effect */}
      <section className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7]">
          <div className="absolute inset-0 bg-[url('/path-to-pattern.png')] opacity-10"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            {translate('transformingEducation')}<br />{translate('inHaiti')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 sm:mb-12 px-4"
          >
            {translate('buildingBridges')}
          </motion.p>
          
          {/* Animated Stats with Hover Effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-[#FCBB45] text-3xl sm:text-4xl mb-3 sm:mb-4">{stat.icon}</div>
                <div className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  <CountUp end={stat.number} duration={2.5} suffix={stat.suffix || ''} />
                </div>
                <div className="text-white/90 font-medium mb-1 sm:mb-2 text-sm sm:text-base">{stat.label}</div>
                <div className="text-white/70 text-xs sm:text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Vision & Mission with Interactive Tabs */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="ourPurpose"
            subtitle="empoweringEducation"
          />

          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="inline-flex rounded-lg border border-[#005482] p-1">
              <button
                onClick={() => setActiveTab('students')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base transition-colors ${
                  activeTab === 'students'
                    ? 'bg-[#005482] text-white'
                    : 'text-[#005482] hover:bg-[#005482]/10'
                }`}
              >
                {translate('forStudents')}
              </button>
              <button
                onClick={() => setActiveTab('tutors')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md text-sm sm:text-base transition-colors ${
                  activeTab === 'tutors'
                    ? 'bg-[#005482] text-white'
                    : 'text-[#005482] hover:bg-[#005482]/10'
                }`}
              >
                {translate('forTutors')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {activeTab === 'students' ? (
              <>
                <div className="bg-gradient-to-br from-[#005482] to-[#70C5D7] rounded-2xl p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">{translate('forStudents')}</h3>
                  <ul className="space-y-4 sm:space-y-6">
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1 sm:p-1.5 mt-1">
                        <FaCheckCircle className="text-white w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-white text-base sm:text-xl">{translate('accessToTutors')}</span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1 sm:p-1.5 mt-1">
                        <FaCheckCircle className="text-white w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-white text-base sm:text-xl">{translate('flexibleScheduling')}</span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1 sm:p-1.5 mt-1">
                        <FaCheckCircle className="text-white w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-white text-base sm:text-xl">{translate('personalizedLearning')}</span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1 sm:p-1.5 mt-1">
                        <FaCheckCircle className="text-white w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-white text-base sm:text-xl">{translate('progressTracking')}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center lg:px-8">
                  <img 
                    src={imge1} 
                    alt="Student Learning"
                    className="rounded-2xl shadow-xl w-full h-[500px] object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center lg:px-8">
                  <img 
                    src={imge2} 
                    alt="Tutor Teaching"
                    className="rounded-2xl shadow-xl w-full h-[500px] object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="bg-gradient-to-br from-[#005482] to-[#70C5D7] rounded-2xl p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">{translate('forTutors')}</h3>
                  <ul className="space-y-4 sm:space-y-6">
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1 sm:p-1.5 mt-1">
                        <FaCheckCircle className="text-white w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-white text-base sm:text-xl">{translate('buildProfile')}</span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1 sm:p-1.5 mt-1">
                        <FaCheckCircle className="text-white w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-white text-base sm:text-xl">{translate('setSchedule')}</span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1 sm:p-1.5 mt-1">
                        <FaCheckCircle className="text-white w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-white text-base sm:text-xl">{translate('teachingResources')}</span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-[#FCBB45] rounded-full p-1 sm:p-1.5 mt-1">
                        <FaCheckCircle className="text-white w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-white text-base sm:text-xl">{translate('securePayment')}</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-[#FCBB45]"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#005482] via-[#70C5D7] to-[#005482] text-transparent bg-clip-text">
                {translate('ourJourney')}
              </h2>
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-[#DA3A60]"></div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 mb-4">
              <div className="h-0.5 w-12 bg-[#DA3A60]"></div>
              <div className="w-2 h-2 rounded-full bg-[#005482]"></div>
              <div className="h-0.5 w-20 bg-[#70C5D7]"></div>
              <div className="w-2 h-2 rounded-full bg-[#005482]"></div>
              <div className="h-0.5 w-12 bg-[#DA3A60]"></div>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {translate('journeySubtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#70C5D7] transform -translate-x-1/2"></div>

            {/* Timeline Items */}
            <div className="space-y-24">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: milestone.align === 'left' ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`flex items-center ${
                    milestone.align === 'left' ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${milestone.align === 'left' ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <h3 className="text-2xl font-bold text-[#005482] mb-2">{milestone.year}</h3>
                    <h4 className="text-xl text-[#DA3A60] font-semibold mb-2">{milestone.title}</h4>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-6 h-6 bg-[#FCBB45] rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#005482]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="ourValues"
            subtitle="principlesGuide"
            isDark={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 sm:p-8 text-center hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-[#FCBB45] text-3xl sm:text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-[#005482] mb-2">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="meetTeam" 
            subtitle="teamSubtitle"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-[#FCBB45]">{member.role}</p>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-gray-600 mb-4">{member.bio}</p>
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#005482] mb-2">{translate('achievements')}:</h4>
                    <ul className="space-y-2">
                      {member.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <FaStar className="text-[#FCBB45] flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200">
                    <a href={member.social.linkedin} className="text-[#005482] hover:text-[#DA3A60] transition-colors">
                      <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    <a href={member.social.twitter} className="text-[#005482] hover:text-[#DA3A60] transition-colors">
                      <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    <a href={member.social.email} className="text-[#005482] hover:text-[#DA3A60] transition-colors">
                      <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="trustAndSecurity"
            subtitle="yourSafety"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start gap-4">
                <div className="text-[#FCBB45] text-xl sm:text-2xl flex-shrink-0">
                  <FaShieldAlt />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#005482] mb-2">{translate('verifiedTutors')}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{translate('tutorsVerified')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-[#FCBB45] text-xl sm:text-2xl flex-shrink-0">
                  <FaClock />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#005482] mb-2">{translate('support247')}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{translate('supportAvailable')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-[#FCBB45] text-xl sm:text-2xl flex-shrink-0">
                  <FaHandshake />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#005482] mb-2">{translate('satisfactionGuarantee')}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{translate('qualityEducation')}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7] rounded-xl transform rotate-3"></div>
              <img
                src={imge3}
                alt="Trust & Security"
                className="relative rounded-xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      {!user && (
        <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#005482] to-[#70C5D7]">
            <div className="absolute inset-0 bg-[url('/path-to-pattern.png')] opacity-10"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">{translate('readyToTransform')}</h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
                {translate('joinThousands')}
              </p>
              <div className="flex justify-center">
                <Link
                  to="/signup"
                  className="inline-block bg-[#DA3A60] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-medium hover:bg-[#DA3A60]/90 transition-colors text-base sm:text-lg"
                >
                  {translate('getStarted')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutUs;