import React, { useContext, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import AttendanceContext from '../../../context/attendance/attendanceContext';

const ViewAttendance = () => {
  const { attendance, getAllAttendance } = useContext(AttendanceContext);

  useEffect(() => {
    getAllAttendance();
  }, []);

  const processAttendanceData = () => {
    const monthlyData = Array.from({ length: 12 }, () => ({ total: 0, present: 0 }));
  
    attendance.forEach((entry) => {
      const date = new Date(entry.date);
      const month = date.getMonth();
  
      monthlyData[month].total += 1;
      if (entry.attendance) {
        monthlyData[month].present += 1;
      }
    });
  
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
          position: 'top', 
          style: {
            colors: ["#000000"], 
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
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={400} width={1000} />
     
    </div>
  );
};

export default ViewAttendance;
