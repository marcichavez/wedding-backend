const GuestSchema = require("../models/guest.model");
const { GUEST_STATS_PIPELINES } = require("../constants");

exports.addGuest = async (req, res, next) => {
  try {
    var guest = req.body;
    var createdGuest = await GuestSchema.create(guest);
    res.status(200).json({
      status: "success",
      env: {
        createdGuest,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error,
    });
  }
};

exports.getManyGuests = async (req, res, next) => {
  var filter = req.params;
  // console.log(filter);
  var guests = await GuestSchema.find();
  res.status(200).json({
    status: "success",
    env: {
      guests,
    },
  });
};

exports.getOneGuestByName = async (req, res, next) => {
  console.log("searching name");
  var { name } = req.params;
  var guest = await GuestSchema.findOne({ name });
  res.status(200).json({
    status: "success",
    env: {
      guest,
    },
  });
};

exports.getGuestsStats = async (req, res, next) => {
  var stats = {
    totalInvitation: (
      await GuestSchema.aggregate(GUEST_STATS_PIPELINES.TOTAL_INVITATIONS)
    )[0]?.total,

    totalNegativeResponse: (
      await GuestSchema.aggregate(GUEST_STATS_PIPELINES.TOTAL_NEGATIVE_RESPONSE)
    )[0]?.total,

    totalPositiveResponse: (
      await GuestSchema.aggregate(GUEST_STATS_PIPELINES.TOTAL_POSITIVE_RESPONSE)
    )[0]?.total,

    totalPendingResponse: (
      await GuestSchema.aggregate(GUEST_STATS_PIPELINES.TOTAL_PENDING_RESPONSE)
    )[0]?.total,

    totalAllocatedSeat: (
      await GuestSchema.aggregate(GUEST_STATS_PIPELINES.TOTAL_ALLOCATED_SEATS)
    )[0]?.total,

    totalConfirmedSeat: (
      await GuestSchema.aggregate(GUEST_STATS_PIPELINES.TOTAL_CONFIRMED_SEATS)
    )[0]?.total,

    totalConfirmedKids: (
      await GuestSchema.aggregate(GUEST_STATS_PIPELINES.TOTAL_CONFIRMED_KIDS)
    )[0]?.total,

    totalConfirmedAdults: (
      await GuestSchema.aggregate(GUEST_STATS_PIPELINES.TOTAL_CONFIRMED_ADULTS)
    )[0]?.total,
  };

  stats.totalAllocatedSeat += stats.totalInvitation;

  res.status(200).json({
    status: "success",
    env: {
      stats,
    },
  });
};

exports.editGuest = async (req, res, next) => {
  var { id } = req.params;
  var { name, allowedPlusses, plusses } = req.body;
  var guest = await GuestSchema.findById(id);

  guest.name = name;
  guest.allowedPlusses = allowedPlusses;
  guest.plusses = plusses;
  console.log(guest);

  guest = await guest.save();
  res.status(200).json({
    status: "success",
    env: { guest },
  });
};

exports.isGuestAttending = async (req, res, next) => {
  var { id } = req.params;
  var { plusses, isAttending, email, mobileNumber, notes } = req.body;
  var guest = await GuestSchema.findById(id);

  guest.isAttending = isAttending;
  if (isAttending === "Yes") {
    guest.plusses = plusses;
    guest.email = email;
    guest.mobileNumber = mobileNumber;
    guest.notes = notes;
    guest._totalAttendees = plusses.length + 1;

    guest._attendeesDemographic.kids = plusses.filter((o) => o.age <= 5).length;
    guest._attendeesDemographic.adults =
      plusses.filter((o) => o.age > 5).length + 1;
  } else if (isAttending === "No") {
    guest.plusses = [];
    guest._totalAttendees = 0;
    guest._attendeesDemographic.kids = 0;
    guest._attendeesDemographic.adults = 0;
  }

  guest = await guest.save();

  res.status(200).json({
    status: "success",
    env: {
      guest,
    },
  });
};

exports.deleteGuest = async (req, res, next) => {
  var { id } = req.params;
  var guest = await GuestSchema.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    env: {
      guest,
    },
  });
};
