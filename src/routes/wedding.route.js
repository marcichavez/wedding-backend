const router = require("express").Router();
const weddingController = require("../controllers/wedding.controller");

router.route("/wedding-date").get(weddingController.getWeddingDate);

module.exports = router;
