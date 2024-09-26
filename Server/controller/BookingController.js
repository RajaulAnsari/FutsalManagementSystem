const Booking = require("../models/Booking");
// const Customer = require("../models/Customer");
const { sendEmail } = require("../EmailService/Mailing");

// Save booking
const save = async (req, res) => {
  try {
    const booking = new Booking(req.body);

    const populatedBooking = await booking.populate("customerId", "email");

    const customerEmail = populatedBooking.customerId.email;

    await booking.save();

    await sendEmail(
      customerEmail,
      "Ground Booking",
      `<h1>Booking Successful</h1>`
    );

    res.status(201).json({ message: "Booking Successful", booking });
  } catch (e) {
    console.error("Error during booking:", e.message);
    res.status(500).json({ error: e.message });
  }
};

const getData = async (req, res) => {
  try {
    const booking = await Booking.find().populate(["customerId", "groundId"]);
    res.status(200).json(booking);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  save,
  getData,
};
