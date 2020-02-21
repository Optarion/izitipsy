import withDb from "../../utils/db"
import Ticket from "../../schemas/tickets"

export default withDb(async (req, res) => {
  /* NOTA: I tried to use mongodb's agregation to compute the heavy grouping calculations.
  But it seems like there is no way to dynamicaly create ranges so it would be painfull to manualy
  define all the 20$ range groups from 0 to 12500 (the highest ticket price). */
  const tickets = await Ticket.find().limit()

  const ticketsGroupedByPrice = tickets.reduce((groupedTickets, ticket) => {
    const { amount, tips } = ticket

    const groupRange = getTicketPriceRange(amount)
    const ticketRangeGroup = groupedTickets[groupRange]

    return {
      ...groupedTickets,
      [groupRange]: ticketRangeGroup
        ? {
          id: groupRange,
          quantity: ticketRangeGroup.quantity + 1,
          totalTips: ticketRangeGroup.totalTips + tips,
          totalTransfered: ticketRangeGroup.totalTransfered + amount + tips
        }
        : {
          id: groupRange,
          quantity: 1,
          totalTips: tips,
          totalTransfered: amount + tips
        }
    }
  }, {})

  return res.status(200).json(Object.values(ticketsGroupedByPrice))
})

function getTicketPriceRange (amount) {
  const stringifiedAmount = String(Math.round(amount))
  const amountTens = Number(stringifiedAmount.substr(-2))
  const basePriceRange = Math.round(amount) - amountTens

  let ticketPriceRange = 0
  if (amountTens < 100 || amountTens === 0) ticketPriceRange = basePriceRange + 100
  if (amountTens < 80) ticketPriceRange = basePriceRange + 80
  if (amountTens < 60) ticketPriceRange = basePriceRange + 60
  if (amountTens < 40) ticketPriceRange = basePriceRange + 40
  if (!amountTens || amountTens < 20) ticketPriceRange = basePriceRange + 20

  return ticketPriceRange
}
