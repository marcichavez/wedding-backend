const router = require("express").Router();
const guestController = require("../controllers/guest.controller");

router
  .route("/")
  .get(guestController.getManyGuests)
  .post(guestController.addGuest);

router
  .route("/:id")
  .post(guestController.editGuest)
  .delete(guestController.deleteGuest);

router.route("/rsvp/:id").post(guestController.isGuestAttending);

router.route("/search/:name").get(guestController.getOneGuestByName);

router.route("/stats").get(guestController.getGuestsStats);

module.exports = router;
