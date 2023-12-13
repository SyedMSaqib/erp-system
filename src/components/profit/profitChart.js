import React, { useContext, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import profitContext from "../../context/profit/profitContext";


const ProfitChart = () => {
const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#00D9E9", "#FF66C3", "#FFD26F"];

  const formatMongoDate = (mongoDate) => {
    const dateObject = new Date(mongoDate);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    const hours = dateObject.getHours().toString().padStart(2, "0");
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const { getProfit, Month, profit } = useContext(profitContext);
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
    },
  });

  useEffect(() => {
   
     getProfit();


   
  }, [Month]);

  useEffect(() => {
    if (profit && profit.saleTrails) {
      const newData = profit.saleTrails.map((prof) => Math.abs(prof.profit).toFixed(0));
      const newTime = profit.saleTrails.map((prof) => formatMongoDate(prof.date));

      setChartData((prevData) => ({
        ...prevData,
        series: [{ data: newData }],
        options: {
          ...prevData.options,
          xaxis: {
            ...prevData.options.xaxis,
            categories: newTime,
          },
        },
      }));
    }
  }, [profit]);

  if (!Month) return null;

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} width={1000} />
    </div>
  );
};

export default ProfitChart;
