import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { useLanguage } from "../../providers/LanguageProvider";
import { useQuery } from "@tanstack/react-query";
import logo from "../../assets/Logo.png";
import defaultProfileImage from "../../assets/default-profile";
import { FaChevronDown, FaGraduationCap, FaChalkboardTeacher, FaGlobe } from 'react-icons/fa';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { currentLanguage, setCurrentLanguage, translate, languages } = useLanguage();
  const axiosSecure = useAxiosSecure();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [userData, setUserData] = useState({
    displayName: '',
    email: '',
    photoURL: defaultProfileImage
  });

  useEffect(() => {
    if (user) {
      setUserData({
        displayName: user.displayName || 'User',
        email: user.email || '',
        photoURL: user.photoURL || defaultProfileImage
      });
    }
  }, [user]);

  // Fetch students data using useQuery
  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/students');
        return response.data;
      } catch (err) {
        console.error('Error fetching students:', err);
        throw err;
      }
    },
  });

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleLanguage = () => setLanguageOpen(!languageOpen);

  const handleLogout = () => {
    logOut()
      .then(() => {
        setUserData({
          displayName: '',
          email: '',
          photoURL: defaultProfileImage
        });
        Swal.fire({
          icon: "success",
          title: translate("loggedOut"),
          text: translate("logoutSuccess"),
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.error("Logout error:", error);
        Swal.fire({
          icon: "error",
          title: translate("logoutFailed"),
          text: translate("logoutError"),
          confirmButtonText: translate("tryAgain"),
        });
      });
  };

  // Find the student matching the logged-in user's email
  const matchedStudent = user ? students.find(student => student.email === user.email) : null;
  const profileImage = matchedStudent?.photoURL || user?.photoURL || defaultProfileImage;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[#005482] shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          {/* Left Side - Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="LesonPaw" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8">
              <NavLink
                to="/find-teacher"
                className={({ isActive }) =>
                  `text-white hover:text-[#FCBB45] transition-colors ${
                    isActive ? "font-bold" : ""
                  }`
                }
              >
                {translate('findTeacher')}
              </NavLink>

              <NavLink
                to="/become-teacher"
                className={({ isActive }) =>
                  `text-white hover:text-[#FCBB45] transition-colors ${
                    isActive ? "font-bold" : ""
                  }`
                }
              >
                {translate('becomeTeacher')}
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-white hover:text-[#FCBB45] transition-colors ${
                    isActive ? "font-bold" : ""
                  }`
                }
              >
                {translate('about')}
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-white hover:text-[#FCBB45] transition-colors ${
                    isActive ? "font-bold" : ""
                  }`
                }
              >
                {translate('contactUs')}
              </NavLink>

              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  `text-white hover:text-[#FCBB45] transition-colors ${
                    isActive ? "font-bold" : ""
                  }`
                }
              >
                {translate('blog')}
              </NavLink>
            </div>
          </div>

          {/* Right Side - User Menu & Mobile Toggle */}
          <div className="flex items-center justify-end space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-3 text-white hover:text-[#FCBB45] transition-colors focus:outline-none px-3 py-2 rounded-lg hover:bg-white/10"
              >
                <FaGlobe className="h-5 w-5" />
                <span className="text-lg">{languages[currentLanguage].flag}</span>
                <span className="hidden md:block font-medium">{languages[currentLanguage].name}</span>
                <FaChevronDown className={`h-4 w-4 transition-transform duration-200 ${languageOpen ? 'rotate-180' : ''}`} />
              </button>

              {languageOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setLanguageOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 py-2 divide-y divide-gray-100">
                    {Object.entries(languages).map(([code, lang]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrentLanguage(code);
                          setLanguageOpen(false);
                        }}
                        className={`flex items-center w-full px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                          currentLanguage === code ? 'bg-gray-50' : ''
                        }`}
                      >
                        <span className="text-xl mr-3">{lang.flag}</span>
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-gray-900">{lang.name}</span>
                          <span className="text-xs text-gray-500 mt-0.5">
                            {code === 'en' ? 'English' : 
                             code === 'fr' ? 'Français' :
                             code === 'es' ? 'Español' :
                             'Kreyòl Ayisyen'}
                          </span>
                        </div>
                        {currentLanguage === code && (
                          <span className="ml-auto text-[#005482]">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-3 text-white hover:text-[#FCBB45] transition-colors focus:outline-none px-3 py-2 rounded-lg hover:bg-white/10"
                  >
                    <img
                      src={profileImage}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full border-2 border-[#FCBB45] object-cover shadow-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-profile.png";
                      }}
                    />
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm text-white">{matchedStudent?.fullName || user.displayName}</span>
                      <span className="text-xs text-gray-300">{user.email}</span>
                    </div>
                    <FaChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setDropdownOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 py-2">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{matchedStudent?.fullName || user.displayName}</p>
                          <p className="text-xs text-gray-500 mt-1 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <svg className="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            {translate('dashboard')}
                          </Link>
                          <button
                            onClick={() => {
                              handleLogout();
                              setDropdownOpen(false);
                            }}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <svg className="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                            </svg>
                            {translate('logout')}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <NavLink
                    to="/login"
                    className="px-4 py-2 text-white hover:text-[#FCBB45] transition-colors"
                  >
                    {translate('login')}
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="px-4 py-2 bg-[#DA3A60] text-white rounded-md hover:bg-[#DA3A60]/90 transition-colors"
                  >
                    {translate('signup')}
                  </NavLink>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#FCBB45] focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {user && (
            <div className="px-4 py-3 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <img
                  src={userData.photoURL}
                  alt={userData.displayName}
                  className="w-10 h-10 rounded-full border-2 border-[#FCBB45] object-cover shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultProfileImage;
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-white font-medium">{userData.displayName}</span>
                  <span className="text-sm text-gray-300">{userData.email}</span>
                </div>
              </div>
            </div>
          )}

          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-white hover:text-[#FCBB45] transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {translate('home')}
            </NavLink>

            <NavLink
              to="/find-teacher"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-white hover:text-[#FCBB45] transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {translate('findTeacher')}
            </NavLink>

            <NavLink
              to="/become-teacher"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-white hover:text-[#FCBB45] transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {translate('becomeTeacher')}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-white hover:text-[#FCBB45] transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {translate('about')}
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-white hover:text-[#FCBB45] transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {translate('contactUs')}
            </NavLink>

            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-white hover:text-[#FCBB45] transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {translate('blog')}
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-md text-white hover:text-[#FCBB45] transition-colors ${
                      isActive ? "font-bold" : ""
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  {translate('dashboard')}
                </NavLink>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 text-white hover:text-[#FCBB45] transition-colors"
                >
                  <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  {translate('logout')}
                </button>
              </>
            )}

            {!user && (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <NavLink
                  to="/login"
                  className="block px-3 py-2 rounded-md text-white hover:text-[#FCBB45] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {translate('login')}
                </NavLink>
                <NavLink
                  to="/signup"
                  className="block px-3 py-2 rounded-md bg-[#DA3A60] text-white hover:bg-[#DA3A60]/90 transition-colors mt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {translate('signup')}
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;