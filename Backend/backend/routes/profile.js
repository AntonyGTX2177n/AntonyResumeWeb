const express = require("express");

const PostController = require("../controllers/profile");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", checkAuth, extractFile, PostController.createProfile);

router.put("/:id", checkAuth, extractFile, PostController.updateProfile);

router.get("", PostController.getProfiles);

router.get("/:id", PostController.getProfile);

router.delete("/:id", checkAuth, PostController.deleteProfile);

module.exports = router;