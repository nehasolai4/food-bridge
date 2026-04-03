const express = require("express");
const router = express.Router();

const {
  createRequest,
  getDonorRequests,
  getRequests,
  updateRequestStatus,
  getAcceptorRequests
} = require("../controllers/requestController");

// create request
router.post("/create", createRequest);

// get all requests (optional)
router.get("/", getRequests);

// donor requests
router.get("/donor/:id", getDonorRequests);

// acceptor requests
router.get("/acceptor/:id", getAcceptorRequests);

// update status (accept/reject/completed)
router.put("/:id", updateRequestStatus);

module.exports = router;