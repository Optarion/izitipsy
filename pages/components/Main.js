import React from 'react'
import Loader from 'react-loader-spinner'
import useFetchTickets from '../hooks'

export default function Main ({ bankFee, additionalBankFee }) {
  const { data, isLoading } = useFetchTickets()

  const calculateAverageProfit = ticketGroup => {
    const { quantity, totalTips, totalTransfered } = ticketGroup

    const ticketGroupBankFee = bankFee * quantity + additionalBankFee * totalTransfered

    return ((totalTips - ticketGroupBankFee) / quantity).toFixed(2)
  }

  return (
    <main className='app-main'>
      {isLoading
        ? <Loader
          type='TailSpin'
          color='#00BFFF'
          timeout={3000} />
        : <table className='app-table'>
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
                <td>{calculateAverageProfit(ticketGroup)}$</td>
              </tr>
            ))}
          </tbody>
        </table>}
    </main>
  )
}
