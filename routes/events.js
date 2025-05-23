const express = require("express");
const router = express.Router();
const connectDB = require("../database");
const EventModal = require("../models/Event");

// router.get("/", async (req, res) => {
  

//   try {
//     const client = await connectDB();
//     const db = client.db("book-app");
//     // const events = await db.collection('events').find().toArray();
   
  
//     const name = req.query?.name || req.params?.name 
//     const club = req.query?.club || req.params?.club 
//     console.log({name, club}, req.query)
//     const events = await db.collection('events').find({
//   $or: [
//     { name: name },
//     { club: club }
//   ]
// }).toArray();

//     console.log({ events });
//     res.render("events", { events });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Database error");
//   }
// });

// router.get("/search", async (req, res) => {
//   try {
//     const client = await connectDB();
//     const db = client.db("book-app");
//     const events = await EventModal.find().exec();
// res.render("events", { events });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Database error");
//   }
// });

router.get("/", async (req, res) => {
  try {
    const client = await connectDB();
    const db = client.db("book-app");

    const query = req.query?.query || ""; 

    let filter = {};

    if (query) {
      const regex = new RegExp(query, "i"); 
      filter = {
        $or: [
          { name: regex },
          { club: regex },
          { college: regex },
          { description: regex },
          { location: regex }
        ]
      };
    }
    const events = await db.collection("events").find(filter).toArray();
    res.render("events", { events });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

module.exports = router;
