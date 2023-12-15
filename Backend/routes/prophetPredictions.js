const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator")
const salesTrail = require("../models/salesTrails")



router.get('/predictions/:month',validator, async (req, res) => {
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
        let profit=[]
        for(sale of saleTrails)
        {
            const formattedDate = sale.date.toISOString().split('T')[0]
            profit.push({
                profit:sale.profit,
                date:formattedDate
            })
        }
        
        const flaskApiUrl = 'http://127.0.0.1:5001/predictions';

        const response = await fetch(flaskApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sales: profit }),
        });

  
      if (response.ok) {
        const predictions = await response.json();
        console.log(saleTrails)
        res.json(predictions);
      } else {
        console.error('Error calling Flask API:', response.statusText);
        res.status(500).send('Internal Server Error');
      }
    } catch (error) {
      console.error('Error calling Flask API:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
  module.exports = router
  