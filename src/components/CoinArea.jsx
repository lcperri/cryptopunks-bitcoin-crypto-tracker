import React, { useContext, useState } from 'react'
import { CryptoContext } from '../context/CryptoContext'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const CoinArea = () => {
    const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false)
    const { filteredCryptos, currentCurrency, setCurrentCurrency} = useContext(CryptoContext)

    const handleCurrencySelect = (selectedCurrency) => {
        switch (selectedCurrency) {
            case 'usd':
                setCurrentCurrency({ name: "usd", symbol: "$" })
                break
            case 'eur':
                setCurrentCurrency({ name: "eur", symbol: "€" })
                break
            default:
                setCurrentCurrency({ name: "usd", symbol: "$" })
        }
        setIsCurrencyDropdownOpen(false)
        
    }
  return (
    <div className=' min-h-screen bg-gradient-to-br from-gray-800 via-gray-900/90 to-gray-900 text-white
    px-4 sm:px-[5%] py-6 md:py-10 relative z-0'>
        
        {/* HERO SECTION */}
        <div className='flex-1 text-center mb-8 md:mb-12 space-y-4 group relative '>
            <div className='relative inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 ' >
            </div>
            <h1 className=' text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400
            via-cyan-300 to-emerald-400 bg-clip-text text-transparent animate-gradient-x leading-tight 
            hover:text-amber-400 transition-all duration-300 '>
                CryptoPunks <br/>
                <span className=' text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-cyan-400 to-emerald-400
                bg-clip-text text-transparent '>
                    Inteligencia de mercado
                </span>
            </h1>
            <p className='text-gray-300/80 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mt-4'>
                Sigue al mercado cripto, con análisis avanzados, conversiones de moneda y predicciones de las métricas
                <span className='bg-gradient-to-r from-emerald-400/80 to-cyan-400/80 bg-clip-text text-transparent mx-2'>
                    en tiempo real.
                </span>
            </p>
        </div>

        {/* TASK HEADER */}
        <div className='hidden md:grid grid-cols-5 gap-4 text-sm py-4 px-4 mb-2 bg-gray-800/40 backdrop-blur-lg rounded-xl 
        border border-emerald-500/20'>
            <p className=' text-emerald-400/90 '>Puesto</p>
            <p className=' text-cyan-400/90 '>Moneda</p>

            <div className='relative flex items-center gap-1 cursor-pointer group'
            onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}>
                <span>Precio:</span>
                <div className=' flex items-center gap-1 '>
                    <span className='text-emerald-400/90'>
                        {currentCurrency.symbol}
                    </span>

                    <ChevronDown className={`w-4 h-4 text-cyan-400/80 transition-transform 
                    ${isCurrencyDropdownOpen ? "rotate-180" : ""}`} />
                </div>
            </div>
            <p className=' text-center '> 24h </p>
            <p className=' text-right '> Cap. Mercado</p>
        </div>

        {/* DROPDOWN DE MONEDA */}
        {isCurrencyDropdownOpen && (
        <div className=' absolute w-[90%] bg-gray-800/95 backdrop-blur-xl rounded-lg border border-emerald-500/20 shadow-2xl z-50 '>
            {["usd", "eur", "pen (No disponible aún)"].map((code) => (
                <div key={code} className=' px-4 py-3 hover:bg-emerald-600/30 transition-colors cursor-pointer
                flex items-center gap-2 ' onClick={() => handleCurrencySelect(code)} >
                    <span className=' text-emerald-400/80 '>
                        {code === "usd" ? "$" : (code === "eur" ? "€" : "S/")}
                    </span>
                    <span className=' text-gray-100 '> {code.toUpperCase()} </span>
                </div>
            ))}
        </div>
        )}

        {/* LISTA DE MONEDAS */}
        <div className='space-y-3 relative z-10 '>
            { filteredCryptos.slice(0, 12).map(item => (
                <Link to={`/crypto/${item.id}`} key={item.id} className=' block p-4 bg-gray-800/30 backdrop-blur-md hover:bg-gray-700/40 rounded-xl
                border border-emerald-500/10 hover:border-cyan-500/30 transition-all duration-300 group' >
                    {/* MOBILE LAYOUT */}
                    <div className=' md:hidden space-y-3 '>
                        <div className=' flex items-center justify-between '>
                            <div className=' flex items-center gap-3 '>
                                <span className=' text-emerald-400/80 text-sm'>
                                    #{item.market_cap_rank}
                                </span>
                                <img src={item.image} alt={item.name} className=' w-7 h-7 sm:w-8 sm:h-8 rounded-full 
                                bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-0.5 ' />
                                <div>
                                    <p className=' font-medium text-gray-100 sm:text-base text-sm '>
                                        {item.name}
                                    </p>
                                    <p className=' text-sm sm:text-sm text-cyan-400/80 mt-0.5 '>
                                        {item.symbol.toUpperCase()}
                                    </p>
                                </div>
                            </div>

                            <div className=' text-right '>  
                                <p className=' text-sm sm:text-base text-gray-100 '>
                                    {currentCurrency.symbol} {item.current_price.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className='flex items-center justify-between pt-2 border-t border-emerald-500/10'>
                            <div className={` flex items-center gap-1 text-sm sm:text-base
                            ${item.price_change_percentage_24h > 0 ? 'text-emerald-400' : 'text-red-400'} `}>
                                    <span> {item.price_change_percentage_24h > 0 ? '▲ ' : '▼ '} </span>
                                    {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
                            </div>

                            <div className='text-right'>
                                <p className='text-sm sm:text-base text-gray-100'>
                                    {currentCurrency.symbol} {item.market_cap.toLocaleString()}
                                </p>
                                <p className='text-xs sm:text-sm text-emerald-400/60 mt-0.5'>
                                    Vol: {currentCurrency.symbol}{item.total_volume.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP VIEW */}
                    <div className='hidden md:grid grid-cols-5 gap-4 items-center'>
                        {/* Puesto */}
                        <span className='text-white/90 text-sm lg:text-base'>
                            #{item.market_cap_rank}
                        </span>
                        {/* Moneda */}
                        <div className='flex items-center gap-3'>
                            <img src={item.image} alt={item.name} className='w-8 h-8 lg:w-10 lg:h-10 rounded-full
                            bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-0.5'/>
                            <div>
                                <p className='font-medium text-gray-100 text-base lg:text-lg'>
                                    {item.name} 
                                </p>
                                <p className='text-sm lg:text-base text-cyan-400/80'>
                                    {item.symbol.toUpperCase()}
                                </p>
                            </div>
                        </div>
                        {/* Tipo de Cambio y Precio */}
                        <div className=''>
                            <span> {currentCurrency.symbol} </span>
                            <span> {item.current_price.toLocaleString()} </span>
                        </div>
                        {/* cambio en 24 horas */}
                        <div className={`text-center px-2 py-1 rounded-full text-sm lg:text-sm ${item.price_change_percentage_24h > 0 ? 
                        'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400' }`
                        }>
                            {item.price_change_percentage_24h > 0 ? '▲ ' : '▼ '}
                            {Math.abs(item.price_change_percentage_24h).toFixed(2)}%
                        </div>
                        {/* Capitalizacion de mercado y volumen */}
                        <div className='text-right'>
                            <p className='text-sm sm:text-base text-gray-100'>
                                {currentCurrency.symbol} {item.market_cap.toLocaleString()}
                            </p>
                            <p className='text-xs sm:text-sm text-emerald-400/60 mt-0.5'>
                                Vol: {currentCurrency.symbol} {item.total_volume.toLocaleString()}
                            </p>
                        </div>
                    </div>

                </Link>
            ))}
        </div>

    </div>
  )
}

export default CoinArea