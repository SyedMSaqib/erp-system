const express = require("express")
const router = express.Router()
const validator = require("../middleware/validator")
const salesTrail=require("../models/salesTrails")
const receivable = require("../models/receivable")
const ledger = require("../models/ledger")



router.put(
    "/addSaleTrail/:id",
    validator,
    async (req, res) => {
        const id = req.params.id
    
      try {
        if (req.user == null) return res.status(404).send("Invalid token, or empty")
        const updatedSaleTrails={
            paid:true,
            date: new Date()
        } 
       const saleRecord= await salesTrail.findByIdAndUpdate(id,{$set:updatedSaleTrails},{new:true})
       await receivable.create({
        user: req.user.id,
        journalEntry: "cr",
        Description: saleRecord.customerName,
        amount: -saleRecord.saleAmount,
      })
      await ledger.create({
        user: req.user.id,
        journalEntry: "dr",
        Description: "Receivable",
        amount:saleRecord.saleAmount,
      })
        res.status(200).send({status:200,msg:"Updated"})
      } catch (err) {
        res.status(500).json(err)
      }
    }
  )

  router.get("/fetchAllSaleTrails", validator, async (req, res) => {
    try {
      const saleTrails = await salesTrail.find({ user: req.user.id })
  
      res.status(200).json({saleTrails:saleTrails,status:200})
    } catch (err) {
      res.json(err)
    }
  })
  module.exports = router