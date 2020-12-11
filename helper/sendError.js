//
const sendErrorMessage = (error, req, res) => {
  res.status(error.statuscode).json({
    status: error.status,
    message: error.message,
  });
};
module.exports = sendErrorMessage;
