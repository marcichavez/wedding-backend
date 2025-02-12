exports.GUEST_STATS_PIPELINES = {
  TOTAL_INVITATIONS: [
    {
      $group: {
        _id: null,
        total: {
          $sum: 1,
        },
      },
    },
  ],
  TOTAL_NEGATIVE_RESPONSE: [
    {
      $match: {
        isAttending: "No",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: 1,
        },
      },
    },
  ],
  TOTAL_POSITIVE_RESPONSE: [
    {
      $match: {
        isAttending: "Yes",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: 1,
        },
      },
    },
  ],
  TOTAL_PENDING_RESPONSE: [
    {
      $match: {
        isAttending: { $nin: ["Yes", "No"] },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: 1,
        },
      },
    },
  ],
  TOTAL_ALLOCATED_SEATS: [
    {
      $match: {
        isAttending: {
          $ne: "No",
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$allowedPlusses",
        },
      },
    },
  ],
  TOTAL_CONFIRMED_SEATS: [
    {
      $match: {
        isAttending: "Yes",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$_totalAttendees",
        },
      },
    },
  ],
  TOTAL_CONFIRMED_KIDS: [
    {
      $match: {
        isAttending: "Yes",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$_attendeesDemographic.kids",
        },
      },
    },
  ],
  TOTAL_CONFIRMED_ADULTS: [
    {
      $match: {
        isAttending: "Yes",
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$_attendeesDemographic.adults",
        },
      },
    },
  ],
};

// totalInvitation
// totalNegativeResponse
// totalPositiveResponse
// totalPendingResponse
// totalAllocatedSeat (allowedPlusses + invitee)
// totalConfirmedSeat (isAttending == Yes, _totalAttendees)

// totalChildren
// totalAdults
