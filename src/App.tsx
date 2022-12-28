import React, { useEffect, useState } from 'react'
import preloader from './img/preloader.gif'
import './App.css'
import { useQuery } from 'react-query'
import { Currencies } from './types/Currencies';

// console.log(preloader)

function App() {
  const [defaultCurrency, setDefaultCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState<Currencies | undefined>({})
  const { isLoading, isSuccess, data, refetch } = useQuery('repoData', () =>
    fetch('https://blockchain.info/ticker').then((res) => res.json())
  )
  const INTERVAL_TIME = 30000

  const handleCurrencySelection = (e: any) => {
    setDefaultCurrency(e.currentTarget.value);
  }

  // console.log(data)

  useEffect(() => {
    if (isSuccess) {
      setCurrencies(data)
    }
    // console.log(data)
  }, [data, isSuccess])

  useEffect(() => {
    const interval = setInterval(refetch, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, [refetch])

  const options = currencies ?
    Object.keys(currencies).map(currency => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    )) : ''

  return (
    <div className='wrapper'>
      <header className='App-header'>
        {isLoading && <img src={preloader} alt='preloader' />}
        <h1 className='btc'>BTC Price</h1>
        <select value={defaultCurrency} onChange={handleCurrencySelection}>
          {options}
        </select>
      </header>
      <table>
        <tbody>
          <tr>
            <th>Symbol</th>
            <th>Last price</th>
            <th>Buy</th>
            <th>Sell</th>
          </tr>
          <tr>
            <td>{data && data[defaultCurrency].symbol}</td>
            <td>{data && data[defaultCurrency].last}</td>
            <td className='font-color-green'>{data && data[defaultCurrency].buy}</td>
            <td className='font-color-red'>{data && data[defaultCurrency].sell}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App
