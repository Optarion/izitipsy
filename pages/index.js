import React from 'react'
import fetch from 'isomorphic-unfetch'
import './scss/index.scss'

const config = {
  defaultBankFee: 2.9
}

function HomePage () {
  const [data, setData] = React.useState([])
  const [bankFee, setBankFee] = React.useState(config.defaultBankFee / 100)

  React.useEffect(() => {
    async function getDBResults () {
      const results = await fetch('http://localhost:3000/api/dashboard')

      const tickets = await results.json()

      setData(tickets)
    }

    getDBResults()
  }, [])

  const displayBankFee = bankFee => {
    return bankFee * 100
  }

  const onChangeFees = event => {
    setBankFee(event.target.value / 100)
  }

  const calculateAverageFee = ticketGroup => {
    const { quantity, totalTips, totalTransfered } = ticketGroup

    const ticketGroupBankFee = 0.3 * quantity + bankFee * totalTransfered

    return (totalTips - ticketGroupBankFee).toFixed(2)
  }

  return (
    <>
      <div className='app-title'>Symplik - Profit by ticket price</div>
      <div>Bank fee: <input type='text' value={displayBankFee(bankFee)} onChange={onChangeFees} />%</div>

      <table>
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
      </table>
    </>
  )
}

export default HomePage
