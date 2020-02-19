import withDb from "../../utils/db"
import Ticket from "../../schemas/tickets"

export default withDb(async (req, res) => {
  const results = await Ticket.find()

  return res.status(200).json(results)
})
