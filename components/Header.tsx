
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm shadow-lg sticky top-0 z-10 p-4 border-b border-indigo-500/30">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Angira
        </h1>
        <p className="text-sm text-gray-400 mt-1">Your Intelligent Personal Assistant</p>
      </div>
    </header>
  );
};

export default Header;
