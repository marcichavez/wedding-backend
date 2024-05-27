exports.getWeddingDate = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    env: {
      weddingDate: new Date(
        "Wed Feb 26 2025 15:30:00 GMT+0800 (Philippine Standard Time)"
      ),
    },
  });
};
