const { response, json } = require("express");
const EventModel = require("../models/EventModel");

const getEvent = async (req, res = response) => {
  const events = await EventModel.find().populate("user", "name");

  res.status(201).json({
    msg: "get evento",
    eventos: events
  });
};

const createEvent = async (req, res = response) => {
  const event = new EventModel(req.body);

  try {
    event.user = req.uid;

    const eventDB = await event.save();

    res.status(200).json({
      msg: "crear evento",
      evento: eventDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error interno"
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(400).json({
        msg: "No existe el evento"
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        msg: "No tiene privilegio de editar este evento"
      });
    }

    const newEvent = {
      ...req.body,
      user: uid
    };

    const eventUpdated = await EventModel.findByIdAndUpdate(eventId, newEvent, { new: true });

    res.status(201).json({
      msg: "modificar evento",
      evento: eventUpdated
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error interno"
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(400).json({
        msg: "No existe el evento"
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        msg: "No tiene privilegio de eliminar este evento"
      });
    }

    const eventDeleted = await EventModel.findByIdAndDelete(eventId);

    res.status(201).json({
      msg: "Eliminar evento",
      evento: eventDeleted
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error interno"
    });
  }
};

module.exports = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};
