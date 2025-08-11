import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

const Home = () => {
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Welcome Home!</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-xl text-center">
        This is a basic frontend application demonstrating a minimal setup with React and Tailwind CSS.
      </p>

      <div className="mb-8">
        <Button onClick={handleButtonClick}>
          Click Me
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <Card title="Feature One">
          <p className="text-gray-700">
            This is the description for feature one. It highlights a key aspect of our application.
          </p>
        </Card>
        <Card title="Feature Two">
          <p className="text-gray-700">
            Here's more detail about another exciting feature that makes our app stand out.
          </p>
        </Card>
        <Card title="Feature Three">
          <p className="text-gray-700">
            And finally, a third feature to showcase the versatility and power of our platform.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Home;