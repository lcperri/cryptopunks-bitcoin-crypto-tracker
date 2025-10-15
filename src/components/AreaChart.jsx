import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const AreaChart = ( {historicalData} , currencySymbol ) => {
  console.log(currencySymbol)
  const [data, setData] = useState([['Date', 'Prices']])

  useEffect(() => {
    if (historicalData?.prices) {
      // console.log('ingrese')
      const formattedData = historicalData.prices.map(item => [
        new Date(item[0]),
        item[1] 
      ])
      // console.log(formattedData)
      setData([['Date', 'Prices'], ...formattedData])
    }
  }, [historicalData])

  const options = {
    backgroundColor: 'transparent',
    legend: 'none',
    curveType: 'function',

    hAxis: {
      textStyle: {color: '#FFFFFF'},
      gridlines: {color: '#444444'},
      format: 'MMM dd'
    },

    vAxis: {
      textStyle: {color: '#FFFFFF'},
      gridlines: {color: '#444444'},
      format: `#,##0.00`
      // format: `${currencySymbol}#,##0.00`
    },

    chartArea: {
      backgroundColor: {
        fill: 'transparent',
        opacity: 0
      },
      width: '80%',
      height: '80%',
    },

    colors: ['#10B981'],
    lineWidth: 3,

    //Lineas de tendencia especificas:
    trendLines: {
      0: { 
        type: 'linear',
        color: '#00FFFF',
        lineWidth: 1,
        opacity: 0.4,
        showR2: false
      }
    },

    crosshair: {
      trigger: 'both',
      orientation: 'vertical',
      color: '#00FFFF',
      opacity: 0.2
    },

    tooltip: {
      textStyle: {color: '#000000'},
      showColorCode: true,
      isHtml: true
    }
  }

  return (
    <Chart chartType='AreaChart' className='h-58 w-80 md:w-full md:h-75 lg:w-full lg:h-85'
      data={data} options={options} loader={<div className='text-emerald-400'> Cargando datos del mercado... </div>}
      rootProps={{ 'data-testid': '1' }}
    />
  )
}

export default AreaChart