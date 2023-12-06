const express = require("express");
const router = express.Router();
const validator = require("../middleware/validator");
const venderTrails = require("../models/venderTrails");
const payable = require("../models/payable");
const ledger = require("../models/ledger");

router.put(
  "/addVenderTrail/:id",
  validator,
  async (req, res) => {
    const id = req.params.id;

    try {
      if (req.user == null) return res.status(404).send("Invalid token, or empty");
      const updatedVenderTrails = {
        paid: true,
        date: new Date()
      };
     const venderDetials= await venderTrails.findByIdAndUpdate(id, { $set: updatedVenderTrails }, { new: true });
     await payable.create({
      user: req.user.id,
      journalEntry: "dr",
      Description: venderDetials.venderName,
      amount: venderDetials.purchaseAmount,
    })
    await ledger.create({
      user: req.user.id,
      journalEntry: "cr",
      Description: "Payable",
      amount:-venderDetials.purchaseAmount,
    })
     
      res.status(200).send({ status: 200, msg: "Updated" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/fetchAllVenderTrails", validator, async (req, res) => {
  try {
    const VenderTrails = await venderTrails.find({ user: req.user.id });
    
    res.status(200).json({ venderTrails: VenderTrails, status: 200 });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
