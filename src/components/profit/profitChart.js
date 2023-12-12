import React from 'react';
import ReactApexChart from 'react-apexcharts';

const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#00D9E9', '#FF66C3', '#FFD26F'];

const ProfitChart = () => {
  const chartData = {
    series: [{
      data: [21, 22, 10, 28, 16, 21, 13, 30,21, 22, 10, 28, 16, 21, 13, 30,21, 22, 10, 28, 16, 21, 13, 30  ,21, 22, 10, 28, 16, 21, 13, 30 ]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          ['John', 'Doe'],
          ['Joe', 'Smith'],
          ['Jake', 'Williams'],
          'Amber',
          ['Peter', 'Brown'],
          ['Mary', 'Evans'],
          ['David', 'Wilson'],
          ['Lily', 'Roberts'],
          ['John', 'Doe'],
          ['Joe', 'Smith'],
          ['Jake', 'Williams'],
          'Amber',
          ['Peter', 'Brown'],
          ['Mary', 'Evans'],
          ['David', 'Wilson'],
          ['Lily', 'Roberts'],
          ['John', 'Doe'],
          ['Joe', 'Smith'],
          ['Jake', 'Williams'],
          'Amber',
          ['Peter', 'Brown'],
          ['Mary', 'Evans'],
          ['David', 'Wilson'],
          ['Lily', 'Roberts'],
          ['John', 'Doe'],
          ['Joe', 'Smith'],
          ['Jake', 'Williams'],
          'Amber',
          ['Peter', 'Brown'],
          ['Mary', 'Evans'],
          ['David', 'Wilson'],
          ['Lily', 'Roberts'],
        ],
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          }
        }
      }
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} width={1000}/>
    </div>
  );
};

export default ProfitChart;
