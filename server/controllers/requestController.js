const Request = require("../models/Request");
const Food = require("../models/Food");

// 🔥 CREATE REQUEST
exports.createRequest = async (req, res) => {
  try {
    const { foodId, acceptorId } = req.body;

    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    const request = new Request({
      foodId,
      donorId: food.donorId,
      acceptorId
    });

    await request.save();

    res.json({ message: "Request sent successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 GET REQUESTS FOR DONOR
exports.getDonorRequests = async (req, res) => {
  try {
    const requests = await Request.find({ donorId: req.params.id })
      .populate("foodId")
      .populate("acceptorId","name email phone");

    res.json(requests);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAcceptorRequests = async (req, res) => {
  try {
    const requests = await Request.find({ acceptorId: req.params.id })
      .populate("foodId")
      .populate("donorId", "name email phone");

    res.json(requests);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const requestId = req.params.id;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // ✅ Prevent multiple accepts
    if (status === "accepted") {
      const alreadyAccepted = await Request.findOne({
        foodId: request.foodId,
        status: "accepted"
      });

      if (alreadyAccepted) {
        return res.status(400).json({
          message: "This food is already accepted by someone else"
        });
      }
    }

    // ✅ Only allow completed if already accepted
    if (status === "completed" && request.status !== "accepted") {
      return res.status(400).json({
        message: "Only accepted requests can be completed"
      });
    }

    request.status = status;
    await request.save();

    res.json({ message: "Status updated", request });

  } catch (err) {
    console.log(err); // 🔥 check terminal for real error
    res.status(500).json({ message: "Server error" });
  }
};