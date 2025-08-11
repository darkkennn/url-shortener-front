import React from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Total URLs">
          <p className="text-4xl font-bold text-indigo-600">1234</p>
          <p className="text-gray-600">Shortened URLs created</p>
        </Card>
        <Card title="Total Clicks">
          <p className="text-4xl font-bold text-emerald-600">5678</p>
          <p className="text-gray-600">Total clicks on your URLs</p>
        </Card>
        <Card title="Active Users">
          <p className="text-4xl font-bold text-purple-600">98</p>
          <p className="text-gray-600">Currently active users</p>
        </Card>
      </div>
      <div className="mt-8 text-center">
        <Button onClick={() => console.log('View Reports')}>View Detailed Reports</Button>
      </div>
    </div>
  );
};

export default Dashboard;