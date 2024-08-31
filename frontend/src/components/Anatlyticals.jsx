// src/pages/Analytics.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Analytics = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [viewMode, setViewMode] = useState('monthly');
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Fetch classes
    axios.get('/api/classes')
      .then(response => setClasses(response.data))
      .catch(error => console.error('Error fetching classes:', error));

    // Fetch analytics data
    fetchAnalyticsData();
  }, [month, year, viewMode]);

  const fetchAnalyticsData = () => {
    const url = `/api/analytics?view=${viewMode}&month=${month}&year=${year}`;
    axios.get(url)
      .then(response => setAnalyticsData(response.data))
      .catch(error => console.error('Error fetching analytics data:', error));
  };

  const handleClassChange = (event) => {
    const classId = event.target.value;
    setSelectedClass(classId);
    fetchClassAnalytics(classId);
  };

  const fetchClassAnalytics = (classId) => {
    axios.get(`/api/classes/${classId}/analytics`)
      .then(response => setAnalyticsData(response.data))
      .catch(error => console.error('Error fetching class analytics:', error));
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const getGenderChartData = () => {
    if (!analyticsData) return {};
    const maleCount = analyticsData.maleCount || 0;
    const femaleCount = analyticsData.femaleCount || 0;
    return {
      labels: ['Male', 'Female'],
      datasets: [{
        label: 'Gender Distribution',
        data: [maleCount, femaleCount],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      }],
    };
  };

  const getFinancialChartData = () => {
    if (!analyticsData) return {};
    return {
      labels: ['Expenses', 'Income'],
      datasets: [{
        label: 'Financial Overview',
        data: [analyticsData.totalExpenses, analyticsData.totalIncome],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      }],
    };
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* Class Selection */}
      <div className="mb-4">
        <label htmlFor="classSelect" className="block text-sm font-medium text-gray-700">Select Class</label>
        <select
          id="classSelect"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          onChange={handleClassChange}
          value={selectedClass || ''}
        >
          <option value="">--Select a Class--</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>{cls.name}</option>
          ))}
        </select>
      </div>

      {/* Analytics Data */}
      {selectedClass && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Class Analytics</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Bar
              data={getGenderChartData()}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Student Gender Distribution',
                    padding: {
                      top: 10,
                      bottom: 20,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      {/* Financial Analytics */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Financial Analytics</h2>
        <div className="flex space-x-4 mb-4">
          <button
            className={`p-2 border rounded-md ${viewMode === 'monthly' ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => handleViewModeChange('monthly')}
          >
            Monthly
          </button>
          <button
            className={`p-2 border rounded-md ${viewMode === 'yearly' ? 'bg-blue-500 text-white' : ''}`}
            onClick={() => handleViewModeChange('yearly')}
          >
            Yearly
          </button>
        </div>

        {viewMode === 'monthly' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month</label>
              <input
                type="month"
                id="month"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                value={`${year}-${month}`}
                onChange={e => {
                  const [selectedYear, selectedMonth] = e.target.value.split('-');
                  setYear(selectedYear);
                  setMonth(selectedMonth);
                }}
              />
            </div>
          </div>
        )}

        {viewMode === 'yearly' && (
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              id="year"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              value={year}
              onChange={handleYearChange}
              min="2000"
            />
          </div>
        )}

        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar
            data={getFinancialChartData()}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Financial Overview',
                  padding: {
                    top: 10,
                    bottom: 20,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
