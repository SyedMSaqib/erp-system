import React, { useContext, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import profitContext from "../../context/profit/profitContext";
import toast from "react-hot-toast";

const PredictionsChart = () => {
  const { predictions, getProfitForecast } = useContext(profitContext);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProfitForecast();
      } catch (error) {
        console.error("Error fetching data:", error);
        
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    setupChartData();

  
    
  }, [predictions])
  
  const setupChartData = () => {
  
    const newData = predictions && predictions.predictions && Array.isArray(predictions.predictions)
      ? predictions.predictions.map((prof) => Math.abs(prof.yhat).toFixed(0))
      : [];

    const newTime = predictions && predictions.predictions && Array.isArray(predictions.predictions)
      ? predictions.predictions.map((prof) => new Date(prof.ds))
      : [];

      const formattedTime = newTime.map(date => {
        const options = { month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
      });
    

    const additionalColors = ["#BC8F8F", "#3CB371", "#FF6347", "#9370DB", "#20B2AA", "#FFA07A", "#4682B4", "#CD853F"];
    const colors = [
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      "#00D9E9",
      "#FF66C3",
      "#FFD26F",
      ...additionalColors,
    ];

    setChartData({
      series: [{ data: newData }],
      options: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: "",
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
          categories: formattedTime,
          labels: {
            style: {
              colors: colors,
              fontSize: "10px",
            },
          },
        },
      },
    });
  };
  if(predictions.predictions )
  return (
    <div id="chart">
      {chartData && (
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} width={1000} />
      )}
    </div>
  );
 if(predictions.status===500)
  {
    toast.error("Check server or Flask APi, or data length is less than 2")
  }
};

export default PredictionsChart;
