import { createContext, useEffect, useState } from "react";

export const CryptoContext = createContext() 

const CryptoContextProvider = (props) => {
    const [cryptoList, setcCryptoList] = useState([])
    const [filteredCryptos, setFilteredCryptos] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [currentCurrency, setCurrentCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    //API: CG-CXW9XUztgUpe1VAhYBVYCoLd
    const fetchCryptoData = async () => {
        const options = { 
                method: 'GET', 
                headers: {'x-cg-demo-api-key': 'CG-CXW9XUztgUpe1VAhYBVYCoLd'}, 
                body: undefined
        }   

        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency.name}`,
                options
            )
            const data = await res.json()
            setcCryptoList(data)
        } catch (err) {
            console.error('Failed to fetch crypto data:', err)
        }
    }

    //RE FETCH CUANDO LA MONEDA CAMBIA:
    useEffect(() => {
        fetchCryptoData()
    }, [currentCurrency])

    //VUELVE A FILTRAR CUANDO LA LISTA O LOS TERMINOS DE BUSQUEDA CAMBIAN:
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredCryptos(cryptoList)
        } else {
            setFilteredCryptos(
                cryptoList.filter(e => e.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
            )
        }
    }, [cryptoList, searchTerm])

    const contextValue = {
        cryptoList,
        filteredCryptos,
        currentCurrency,
        setCurrentCurrency,
        searchTerm, 
        setSearchTerm
    }

    return (
        <CryptoContext.Provider value={contextValue}>
            {props.children}
        </CryptoContext.Provider>
    )
}

export default CryptoContextProvider