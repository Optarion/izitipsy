import React from 'react'
import fetch from 'isomorphic-unfetch'
import './scss/index.scss'

function HomePage () {
  const [data, setData] = React.useState([])
  const [fees, setFees] = React.useState('2.9')

  React.useEffect(() => {
    async function getDBResults () {
      const results = await fetch('http://localhost:3000/api/dashboard')

      const tickets = await results.json()

      setData(tickets)
    }

    getDBResults()
  }, [])

  const onChangeFees = event => {
    setFees(event.target.value)
  }

  return (
    <>
      <div className='app-title'>Symplik - Bénéfice par prix du billet</div>
      <div>Frais bancaires: <input type='text' value={fees} onChange={onChangeFees} /></div>
    </>
  )
}

export default HomePage
