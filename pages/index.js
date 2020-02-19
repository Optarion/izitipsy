import React from 'react'
import fetch from 'isomorphic-unfetch'
import './scss/index.scss'

function HomePage () {
  const [data, setData] = React.useState([])

  React.useEffect(() => {
    async function getDBResults () {
      const results = await fetch('http://localhost:3000/api/dashboard')

      const tickets = await results.json()

      setData(tickets)
    }

    getDBResults()
  }, [])

  console.log('data', data)

  return (
    <>
      <div className='app-title'>Symplik - Bénéfice par prix du billet</div>
    </>
  )
}

export default HomePage
