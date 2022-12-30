import './App.css';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query'
import { Currencies } from './types/Currencies';


const getBCData = () => fetch('https://blockchain.info/ticker').then((res) => res.json())

const INTERVAL_TIME = 30000;

const App = () => {
  const [defaultCurrency, setDefaultCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState<Currencies | undefined>({})
  const { data, isLoading } = useQuery<Currencies>
    (
      'bc-data',
      getBCData,
      {
        refetchInterval: INTERVAL_TIME
      }
    );


  useEffect(() => {
    if (data && !isLoading) {
      setCurrencies(data)
      // console.log(data)
    }
  }, [data, isLoading])

  // console.log(currency)
  // console.log(data)

  // useEffect(() => {
  //   const interval = setInterval(refetch, INTERVAL_TIME);
  //   return () => clearInterval()
  // }, [refetch])


  const handleCurrencySelection = (e: any) => {
    setDefaultCurrency(e.currentTarget.value);
  }


  // if (isLoading) {
  //   return <div>Loading...</div>
  // }
  // else if (error) {
  //   return <div>Something went wrong...</div>
  // }

  const options = currencies ?
    Object.keys(currencies).map(currency => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    )) : ''


  return (
    <div className='wrapper'>
      <h2>Bitcoin price</h2>
      {isLoading ? <div>Loading...</div> : ''}
      <select value={defaultCurrency} onChange={handleCurrencySelection}>
        {/* {Object.keys(currencies).map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))} */}
        {options}
      </select>
      <table>
        <tbody>
          <tr>
            <td>{data && data[defaultCurrency].symbol}</td>
            <td>{data && data[defaultCurrency].last}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
