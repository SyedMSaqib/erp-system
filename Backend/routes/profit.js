const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator")
const salesTrail = require("../models/salesTrails")
const ledger = require("../models/ledger")

router.get("/profit/:month", validator, async (req, res) => {
  try {
    const monthName = req.params.month
    const monthIndex = new Date(Date.parse(`1 ${monthName} 2000`)).getMonth()
    const requestedMonth = monthIndex+1
   

    const startDate = new Date(new Date().getFullYear(), requestedMonth - 1, 1)
    const endDate = new Date(new Date().getFullYear(), requestedMonth, 0, 23, 59, 59, 999)

    const saleTrails = await salesTrail.find({
      user: req.user.id,
      paid: true,
      date: { $gte: startDate, $lt: endDate },
    })

    const Ledger = await ledger.find({
      user: req.user.id,
      date: { $gte: startDate, $lt: endDate },
    })
    let totalSales=0
    for(sales of saleTrails)
    {
        totalSales++
    }
    let totalProfitLoss = 0
    let totalTransaction= 0
    for (prof of Ledger) {
      totalProfitLoss += prof.amount
      totalTransaction++
    }

    res.status(200).json({ saleTrails: saleTrails, profit: totalProfitLoss,totalTransaction:totalTransaction,totalSales:totalSales, status: 200 })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
