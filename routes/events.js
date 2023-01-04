const express = require("express");
const {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/evenController");
const { validateJwt } = require("../middlewares/validateJWT");
const router = express.Router();
const { check } = require("express-validator");
const { fieldValidators } = require("../middlewares/fieldValidators");
const { isDate } = require("../helpers/isDate");

router.get("/", getEvent);
// todas las peticiones debajo de esta, deben validar token
router.use(validateJwt);

router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalización es obligatoria").custom(isDate),
    fieldValidators
  ],
  createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
