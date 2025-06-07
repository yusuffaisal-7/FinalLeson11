import React from 'react';
import { useLanguage } from '../../providers/LanguageProvider';

const LanguageSelector = () => {
  const { currentLanguage, setCurrentLanguage, languages } = useLanguage();

  return (
    <div className="relative inline-block">
      <select
        value={currentLanguage}
        onChange={(e) => setCurrentLanguage(e.target.value)}
        className="appearance-none bg-transparent border border-gray-300 rounded-lg px-4 py-2 pr-8 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#005482] focus:border-transparent"
      >
        {Object.entries(languages).map(([code, lang]) => (
          <option key={code} value={code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector; 