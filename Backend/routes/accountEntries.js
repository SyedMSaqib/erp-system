const express = require("express");
const router = express.Router();
const validator = require("../middleware/validator");
const receivable = require("../models/receivable");
const payable = require("../models/payable");
const ledger = require("../models/ledger");

router.get("/ledger", validator, async (req, res) => {
    try {
      const Ledger = await ledger.find({ user: req.user.id });
      res.json(Ledger);
    } catch (err) {
      res.json(err);
    }
  });
router.get("/payables", validator, async (req, res) => {
    try {
      const payables= await payable.find({ user: req.user.id });
      res.json(payables);
    } catch (err) {
      res.json(err);
    }
  });
router.get("/receivables", validator, async (req, res) => {
    try {
      const receivables = await receivable.find({ user: req.user.id });
      res.json(receivables);
    } catch (err) {
      res.json(err);
    }
  });
module.exports = router;
