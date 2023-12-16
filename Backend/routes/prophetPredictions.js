const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator")
const salesTrail = require("../models/salesTrails")

router.get("/predictions", validator, async (req, res) => {
  try {
    const currentMonth = new Date().getMonth();

    const startDate = new Date(new Date().getFullYear(), currentMonth, 1);
    const endDate = new Date(new Date().getFullYear(), currentMonth + 1, 0, 23, 59, 59, 999);


    const saleTrails = await salesTrail.find({
      user: req.user.id,
      paid: true,
      date: { $gte: startDate, $lt: endDate },
    })
    let profit = []
    for (sale of saleTrails) {
      const formattedDate = sale.date.toISOString().split("T")[0]
      profit.push({
        profit: Math.abs(sale.profit).toFixed(0),
        date: formattedDate,
      })
    }

    const flaskApiUrl = "http://127.0.0.1:5001/predictions"

    const response = await fetch(flaskApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sales: profit }),
    })

    if (response.ok) {
      const predictions = await response.json()
      res.json({predictions:predictions,status:200})
    } else {
      console.error("Error calling Flask API:", response.statusText)
      res.status(500).send({error:"Flask API error processing data",status:500})
    }
  } catch (error) {
    console.error("Error calling Flask API:", error.message)
    res.status(500).send({error:"Internal Server Error",status:500})
  }
})

module.exports = router
