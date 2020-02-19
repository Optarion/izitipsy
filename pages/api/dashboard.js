import withDb from "../../utils/db"
import Ticket from "../../schemas/tickets"

export default withDb(async (req, res) => {
  /* NOTA: I tried to use mongodb's agregation to compute the heavy grouping calculations.
  But it seems like there is no way to dynamicaly create ranges so it would be painfull to manualy
  define all the 20$ range groups from 0 to 12500 (the highest ticket price). */
  const tickets = await Ticket.find().limit()

  const ticketsGroupedByPrice = tickets.reduce((groupedTickets, ticket) => {
    const { amount, tips } = ticket

    const stringifiedAmount = String(amount)
    const amountTens = Number(stringifiedAmount.substr(-2))
    const baseGroupRange = amount - amountTens

    let groupRange = stringifiedAmount.substring(0, stringifiedAmount.length - 2)
    if (amountTens < 100 || amountTens === 0) groupRange = baseGroupRange + 100
    if (amountTens < 80) groupRange = baseGroupRange + 80
    if (amountTens < 60) groupRange = baseGroupRange + 60
    if (amountTens < 40) groupRange = baseGroupRange + 40
    if (!amountTens || amountTens < 20) groupRange = baseGroupRange + 20

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
