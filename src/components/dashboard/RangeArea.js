import React, { useContext, useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import ProductContext from "../../context/product/productContext"

const RangeArea = () => {
  const { product, getAllProducts } = useContext(ProductContext)

  useEffect(() => {
    getAllProducts()
  }, [])
  const authToken =  localStorage.getItem('authToken');
  useEffect(() => { 
  }, [authToken])

useEffect(() => {
  setchart({
    series: generateChartData(),
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Purchase Price vs Sale Price',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], 
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: ''
        }
      },
      yaxis: {
        title: {
          text: ''
        },
        min: 5,
        max: 4000
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    },
  })
}, [product]);


const generateChartData = () => {
  const vendorPriceData = product.map((item) =>Math.abs (item.vendorPrice).toFixed(0))
  const priceData = product.map((item) => Math.abs(item.price).toFixed(0));


  return [
    {
      name: "Vendor Price",
      data: vendorPriceData
    },
    {
      name: "Sale Price",
      data: priceData
    }
  ]
}


  const [chart, setchart] = useState({
    series:   generateChartData(),
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Purchase Price vs Sale Price',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], 
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month'
        }
      },
      yaxis: {
        title: {
          text: 'Temperature'
        },
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    },
  })
  return (
    <div>
      <ReactApexChart options={chart.options} series={chart.series} type="line" height={200} width={500} />
    </div>
  )
}

export default RangeArea
