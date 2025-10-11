import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoContext } from '../context/CryptoContext'
import AreaChart from './AreaChart'
import { ArrowDown, ArrowUp } from 'lucide-react'

const CoinPage = () => {
    const {cryptoId} = useParams()
    const [coinDetails, setCoinDetails] = useState(null)
    const [chartData, setChartData] = useState(null)
    const [period, setPeriod] =useState('10')
    const [error, setError] =useState(null)

    const { currentCurrency } = useContext(CryptoContext)

    if (!cryptoId) 
        return (
            <div className='min-h-screen flex items-center justify-center bg-gray-900 text-white'>
                <p>Error. No se ha recibido el Id de la moneda.</p>
            </div>
    )

    const requestOptions = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-CXW9XUztgUpe1VAhYBVYCoLd' }
    }

    useEffect(() => {
        const fetchData = async () => {
            setError(null)
            try {
                const detailsRes = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`, requestOptions)
                if(!detailsRes.ok) throw new Error(`Error obteniendo detalles de la cripto: ${detailsRes.statusText}`)
                
                setCoinDetails(await detailsRes.json())

                const chartRes = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=${currentCurrency.name}&days=${period}&interval=daily`,
                requestOptions)

                // console.log('request options: ', requestOptions)
                if (!chartRes.ok) throw new Error(`Error recibiendo los datos del chart: ${chartRes.statusText}`)
                // console.log(await chartRes.json())
                setChartData(await chartRes.json())
            } catch (err) {
                console.error(err)
                setError(err.messsage)
            }
        } 
        fetchData();
    }, [currentCurrency, cryptoId, period])

    if (error)        
        return (
            <div className='min-h-screen flex items-center justify-center bg-gray-900 text-white'>
                <p>{error}</p>
            </div>
        )

        if (!coinDetails || !chartData)
            <div className='min-h-screen flex items-center justify-center bg-gray-900 text-white'>
                <div className='aimate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500' />
            </div>

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-900/90 text-white 
        px-4 sm:px-[5%] md:px-[8%] py-6'>
            <div className='flex flex-col items-center md:flex-row gap-4 mb-6 bg-gray-800/30 backdrop-blur-lg p-4 rounded-xl
            border  border-emerald-500/20'>
                <img src={coinDetails?.image?.large} alt={coinDetails?.name} 
                className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20'/>

                <div className='text-center md:text-left'>
                    <h1 className='text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400
                    bg-clip-text text-transparent'>
                        {coinDetails?.name}
                        <span className='text-xl md:text-2xl ml-2 text-cyan-400/80 block mt-1'>
                            {coinDetails?.symbol?.toUpperCase()}
                        </span>
                    </h1>
                    <p className='mt-1 ml-2 text-sm text-white/90'>
                        Puesto: #{coinDetails?.market_cap_rank} 
                    </p>
                </div>
            </div>

            <div className='mb-6 bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-emerald-500/20'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2'>
                    <h2 className='text-lg font-semibold text-emerald-400/90'>
                        {currentCurrency.symbol} Gráfico del precio
                    </h2>
                    <div className='relative group'>
                        <select value={period} onChange={e => setPeriod(e.target.value)}
                        className='bg-gray-800/90 border border-emerald-500/30 rounded-lg px-3
                        py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500/50'>
                            <option value="1">1D (24 horas)</option>
                            <option value="7">1S (1 semana)</option>
                            <option value="30">1M (1 mes)</option>
                            <option value="365">1Y (1 año)</option>
                        </select>
                        <div className='absolute -inset-0.5 bg-gradient-to-r from-emerald-600/20 to-cyan-500/20 rounded-lg
                        blur opacity-30 group-hover:opacity-50 transition duration-300 -z-10' />
                    </div>
                </div>

                <div className='h-64 md:h-80'>
                    <AreaChart historicalData={chartData} currencySymbol={currentCurrency.symbol}/>
                </div>
            </div>

            {/* VISTA PARA MÓVILES */}
            <div className='space-y-3 md:hidden'>
                <div className='bg-gray-800/30 backdrop-blur-md p-4 rounded-lg border border-emerald-500/20'>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm text-cyan-400/80'>Precio actual</span>
                        <span className='text-lg font-bold text-emerald-400'>
                            {currentCurrency.symbol}
                            {coinDetails?.market_data.current_price[currentCurrency.name].toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className='bg-gray-800/30 backdrop-blur-md p-4 rounded-lg border border-emerald-500/20'>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm text-cyan-400/80'>Cap. de mercado</span>
                        <span className='text-lg font-bold text-emerald-400'>
                            {currentCurrency.symbol}
                            {coinDetails?.market_data.market_cap[currentCurrency.name].toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* VISTA PARA ESCRITORIO */}
            <div className='hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
                <div className='bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-emerald-500/20'>
                    <h3 className='text-sm text-cyan-400/80 mb-2 '>Precio actual</h3>
                    <p className='text-2xl font-bold text-emerald-400'>
                        {currentCurrency.symbol}
                        {coinDetails?.market_data.current_price[currentCurrency.name].toLocaleString()}
                    </p>
                </div>

                <div className='bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-emerald-500/20'>
                    <h3 className='text-sm text-cyan-400/80 mb-2 '>Cap. de mercado</h3>
                    <p className='text-2xl font-bold text-emerald-400'>
                        {currentCurrency.symbol}
                        {coinDetails?.market_data.market_cap[currentCurrency.name].toLocaleString()}
                    </p>
                </div>

                <div className='bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-emerald-500/20'>
                    <h3 className='text-sm text-cyan-400/80 mb-2 '>Rango 24h </h3>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center text-green-400'>
                            <ArrowUp className='-w-5 h-5 mr-1'/>
                            {currentCurrency.symbol}                     
                            {coinDetails?.market_data.high_24h[currentCurrency.name].toLocaleString()}
                        </div>
                        <div className='flex items-center text-red-400'>
                            <ArrowDown className='-w-5 h-5 mr-1'/>
                            {currentCurrency.symbol}                     
                            {coinDetails?.market_data.low_24h[currentCurrency.name].toLocaleString()}
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className='space-y-3 md:space-y-0 md:grid md:grid-cols-2 gap-4'>
                <div className='bg-gray-800/30 backdrop-blur-md p-4 rounded-lg md:rounded-xl border border-emerald-500/20'>
                        <div className='flex justify-between items-center'>
                            <span className='text-sm md:text-base text-emerald-400/90'>
                                Cambio 24h
                            </span>
                            <div className='flex items-center gap-2'>
                                <span className={` text-base md:text-lg ${coinDetails?.market_data.price_change_percentage_24h > 0 ?
                                'text-green-400' : 'text-red-400'} `}>
                                    {coinDetails?.market_data.price_change_percentage_24h}%
                                </span>
                                    {coinDetails?.market_data.price_change_percentage_24h > 0 ? 
                                        (<ArrowUp className='-w-5 h-5 text-green-400'/>) : (<ArrowDown className='-w-5 h-5 text-red-400'/>)
                                    }
                            </div>
                        </div>
                </div>

                <div className='bg-gray-800/30 backdrop-blur-md p-4 rounded-lg md:rounded-xl border border-emerald-500/20'>
                    <div className='flex justify-between items-center'>
                            <span className='text-sm md:text-base text-emerald-400/90'>
                                Volumen 24h
                            </span>
                            <span className='text-lg md:text-xl text-cyan-400'>
                                {currentCurrency.symbol}
                                {coinDetails?.market_data.total_volume[currentCurrency.name].toLocaleString()}
                            </span>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default CoinPage