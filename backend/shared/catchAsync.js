const catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res)
    } catch (error) {
      console.error("Error fetching task form data:", error)
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

module.exports = catchAsync
