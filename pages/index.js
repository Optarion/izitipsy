import React from 'react'
import fetch from 'isomorphic-unfetch'
import './scss/index.scss'

import Loader from 'react-loader-spinner'
import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const config = {
  defaultBaseBankFee: 0.3,
  defaultAdditionalBankFees: 2.9
}

function HomePage () {
  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [bankFee, setBankFee] = React.useState(config.defaultBaseBankFee)
  const [additionalBankFee, setAdditionalBankFee] = React.useState(config.defaultAdditionalBankFees / 100)

  React.useEffect(() => {
    async function getDBResults () {
      const results = await fetch('http://localhost:3000/api/dashboard')

      const tickets = await results.json()

      setIsLoading(false)
      setData(tickets)
    }

    getDBResults()
  }, [])

  const onChangeBankFee = event => {
    setBankFee(event.target.value / 100)
  }

  const displayAdditionalBankFee = additionalBankFee => {
    return additionalBankFee * 100
  }

  const onChangeAdditionalFee = event => {
    setAdditionalBankFee(event.target.value / 100)
  }

  const calculateAverageFee = ticketGroup => {
    const { quantity, totalTips, totalTransfered } = ticketGroup

    const ticketGroupBankFee = 0.3 * quantity + additionalBankFee * totalTransfered

    return ((totalTips - ticketGroupBankFee) / quantity).toFixed(2)
  }

  return (
    <>
      <div className='app-title'>Symplik - Profit by ticket price</div>
      <div>Bank fees: <input type='text' value={bankFee} onChange={onChangeBankFee} />$ + <input type='text' value={displayAdditionalBankFee(additionalBankFee)} onChange={onChangeAdditionalFee} />%</div>

      {isLoading
        ? <Loader
          type='TailSpin'
          color='#00BFFF'
          timeout={3000} />
        : <table>
          <thead>
            <tr>
              <td>Ticket price</td>
              <td>Quantity</td>
              <td>Average profit</td>
            </tr>
          </thead>
          <tbody>
            {data.map(ticketGroup => (
              <tr key={ticketGroup.id}>
                <td>{`< ${ticketGroup.id}$`}</td>
                <td>{ticketGroup.quantity}</td>
                <td>{calculateAverageFee(ticketGroup)}$</td>
              </tr>
            ))}
          </tbody>
        </table>}
    </>
  )
}

export default HomePage
