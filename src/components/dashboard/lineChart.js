import React, { useContext, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import AttendanceContext from '../../context/attendance/attendanceContext';

const LineChart = () => {
  const { attendance, getAllAttendance } = useContext(AttendanceContext);

  useEffect(() => {
    getAllAttendance();
  }, []);

  const processAttendanceData = () => {
    // Process the attendance data and calculate monthly percentages
    const monthlyData = Array.from({ length: 12 }, () => ({ total: 0, present: 0 }));
  
    attendance.forEach((entry) => {
      const date = new Date(entry.date);
      const month = date.getMonth();
  
      monthlyData[month].total += 1;
      if (entry.attendance) {
        monthlyData[month].present += 1;
      }
    });
  
    // Calculate monthly percentages and round to 2 decimal places
    const percentages = monthlyData.map((monthData) => {
      if (monthData.total === 0) {
        return 0;
      }
      return ((monthData.present / monthData.total) * 100).toFixed(2);
    });
  
    return percentages;
  };
  
  const chartData = processAttendanceData();

  const chartOptions = {
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
    },
    title: {
      text: '',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
          style: {
            colors: ["#000000"], // Set the color of data labels to black
          },
        },
      },
    },
  };

  const chartSeries = [
    {
      name: 'Attendance Percentage',
      data: chartData,
    },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={200} width={350} />
      <div style={{ position: 'absolute', top: '200px', left: '160px', zIndex: '999' }}>
        <p className='font-semibold text-xs dark:text-gray-400'>Attendance</p>
      </div>
    </div>
  );
};

export default LineChart;
