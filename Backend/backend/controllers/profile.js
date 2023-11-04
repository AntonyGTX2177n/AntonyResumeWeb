const Post = require("../models/profile");

exports.createProfile = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
        profileImage: url + "/images/" + req.file.filename,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        whatsAppNumber: req.body.whatsAppNumber,
        lineOne: req.body.lineOne,
        lineTwo: req.body.lineTwo,
        streetName: req.body.streetName,
        state: req.body.state,
        country: req.body.country,
        zipCode: req.body.zipCode,
        collegeName: req.body.collegeName,
        courseName: req.body.courseName,
        graduationYear: req.body.graduationYear,
        certificateName: req.body.certificateName,
        certificateCourseName: req.body.certificateCourseName,
        certifiedYear: req.body.certifiedYear,
        companyName: req.body.companyName,
        jobRole: req.body.jobRole,
        duration: req.body.duration,
        dateOfJoining: req.body.dateOfJoining,
        dateOfReleaving: req.body.dateOfReleaving,
        noticePeriod: req.body.noticePeriod,
        declaration: req.body.declaration,
        creator: req.userData.userId
    });
    post
      .save()
      .then(createdPost => {
        res.status(201).json({
          message: "Post added successfully",
          post: {
            ...createdPost,
            id: createdPost._id
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Creating a post failed!"
        });
      });
}

exports.updateProfile = (req, res, next) => {
  let profileImage = req.body.profileImage;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    profileImage = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    profileImage: profileImage,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    whatsAppNumber: req.body.whatsAppNumber,
    lineOne: req.body.lineOne,
    lineTwo: req.body.lineTwo,
    streetName: req.body.streetName,
    state: req.body.state,
    country: req.body.country,
    zipCode: req.body.zipCode,
    collegeName: req.body.collegeName,
    courseName: req.body.courseName,
    graduationYear: req.body.graduationYear,
    certificateName: req.body.certificateName,
    certificateCourseName: req.body.certificateCourseName,
    certifiedYear: req.body.certifiedYear,
    companyName: req.body.companyName,
    jobRole: req.body.jobRole,
    duration: req.body.duration,
    dateOfJoining: req.body.dateOfJoining,
    dateOfReleaving: req.body.dateOfReleaving,
    noticePeriod: req.body.noticePeriod,
    declaration: req.body.declaration,
    creator: req.userData.userId
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
    .then(result => {
      if (result) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
      console.log(result);
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "Couldn't udpate post!"
      });
    });
};

exports.getProfiles = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
};

exports.getProfile = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
};

exports.deleteProfile = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
};