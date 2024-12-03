const mongoose = require("mongoose");
const validator = require("validator");

const GuestSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide name"],
      unique: true,
    },
    isAttending: {
      type: String,
      enum: ["Yes", "No", null],
      default: null,
    },
    notes: {
      type: String,
    },
    allowedPlusses: { type: Number },
    plusses: [
      {
        name: {
          type: String,
        },
        age: {
          type: Number,
        },
        isPermanent: {
          type: Boolean,
        },
      },
    ],
    _totalAttendees: {
      type: Number,
      default: 0,
    },
    _attendeesDemographic: {
      // age between 0 - 7
      kids: {
        type: Number,
        default: 0,
      },
      adults: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

const Guest = mongoose.model("Guest", GuestSchema);

module.exports = Guest;
