import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center rounded-t-lg mt-4 mx-2">
        <p>&copy; 2024 URL Shortener. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;