const express = require("express");
const router = express.Router();
const validator = require("../middleware/validator");
const vendor = require("../models/vendor");
const { check, validationResult } = require("express-validator");

router.post(
  "/add",
  [
    check("name").isLength({ min: 3 }),
    check("email").isEmail(),
  ],
  validator,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.json(result);

    try {
      if (req.user == null) return res.status(404).send("Invalid token, or empty");

      const { name, email } = req.body;

      const newVendor = await vendor.create({
        user: req.user.id,
        name: name,
        email: email,
      });

      res.json(newVendor);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/fetchAll", validator, async (req, res) => {
  try {
    const vendorsFromDb = await vendor.find({ user: req.user.id });
    res.json(vendorsFromDb);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/delete/:id", validator, async (req, res) => {
  const id = req.params.id;
  if (id === null) return res.status(500).send("Input correct id");

  try {
    const vendorFromDb = await vendor.findById(id);
    if (!vendorFromDb) return res.status(404).json("No such vendor exists");

    if (vendorFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user");

    const vendorDelete = await vendor.findByIdAndDelete(id);
    res.json(vendorDelete);
  } catch (err) {
    res.json(`${err}`);
  }
});

router.put("/update/:id", validator, async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.json(result);

  const id = req.params.id;
  if (id === null) return res.status(500).send("Input correct id");

  try {
    const vendorFromDb = await vendor.findById(id);
    if (!vendorFromDb) return res.status(404).json("No such vendor exists");

    if (vendorFromDb.user.toString() !== req.user.id) return res.status(404).send("Unauthorized user");

    const { name, email } = req.body;
    const newVendor = {};
    if (name) newVendor.name = name;
    if (email) newVendor.email = email;

    const vendorUpdate = await vendor.findByIdAndUpdate(id, { $set: newVendor }, { new: true });
    res.json(vendorUpdate);
  } catch (err) {
    res.json(`${err}`);
  }
});

module.exports = router;
