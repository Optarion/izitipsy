import React from 'react'
import fetch from 'isomorphic-unfetch'

export default function useFetchTickets () {
  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function getDBResults () {
      const results = await fetch('http://localhost:3000/api/dashboard')
      const tickets = await results.json()

      setData(tickets)
      setIsLoading(false)
    }

    getDBResults()
  }, [])

  return { data, isLoading }
}
