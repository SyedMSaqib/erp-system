import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const Scatter = () => {
    const [chart, setchart] = useState({
        series: [44, 55, 13, 43, 22],
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }
    })
  return (
    <div>
      <ReactApexChart options={chart.options} series={chart.series} type="pie"  height={200} width={350}/>
    </div>
  )
}

export default Scatter
