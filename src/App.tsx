import './App.css';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query'
import { Currencies } from './types/Currencies';
import axios from 'axios';


const getBCData = async (): Promise<Currencies> => await (await fetch('https://blockchain.info/ticker')).json()

// const getBCData = async () => {
//   axios.get('https://blockchain.info/ticker')
//     .then(res => {
//       console.log(res.data);
//     })
// }

const INTERVAL_TIME = 30000;

const App = () => {
  const [currency, setCurrency] = useState('USD');
  const { data, isLoading, error } = useQuery<Currencies>
    (
      'bc-data',
      getBCData,
      {
        refetchInterval: INTERVAL_TIME
      }
    );

  // console.log(currency)
  // console.log(data)

  // useEffect(() => {
  //   const interval = setInterval(refetch, INTERVAL_TIME);
  //   return () => clearInterval()
  // }, [refetch])


  const handleCurrencySelection = (e: any) => {
    setCurrency(e.currentTarget.value);
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  else if (error) {
    return <div>Something went wrong...</div>
  }


  return (
    <div className='wrapper'>
      <h2>Bitcoin price</h2>
      <select value={currency} onChange={handleCurrencySelection} >
        {data && Object.keys(data).map(currency => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <table>
        <tbody>
          <tr>
            <td>{data && data[currency].symbol}</td>
            <td>{data && data[currency].last}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
