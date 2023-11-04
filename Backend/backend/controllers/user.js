const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

//----Method without password encryption
exports.createUser = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    termsAndCondition: req.body.termsAndCondition
  });
  user
  .save()
  .then(result => {
    res.status(201).json({
      message: "User created!",
      result: result
    });
  })
  .catch(err => {
    res.status(500).json({
      message: "Invalid authentication credentials!"
    });
  }); 
}



//---method with password encryption--//

// exports.createUser = (req, res, next) => {
//   bcrypt.hash(req.body.password,  10).then(hash => {
//     const user = new User({
//       email: req.body.email,
//       password: hash
//     });
//     user
//       .save()
//       .then(result => {
//         res.status(201).json({
//           message: "User created!",
//           result: result
//         });
//       })
//       .catch(err => {
//         res.status(500).json({
//           message: "Invalid authentication credentials!"
//         });
//       });
//   });
// }


//---Login-method -without-login-policy---//

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ 
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed user not found"
        });
      }
      fetchedUser = user;
 
    }).then(createToken => {
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "AntonyGTX",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });    
}


//---Login method with encryption policy---//

// exports.userLogin = (req, res, next) => {
//   let fetchedUser;
//   User.findOne({ email: req.body.email })
//     .then(user => {
//       if (!user) {
//         return res.status(401).json({
//           message: "Auth failed"
//         });
//       }
//       fetchedUser = user;
//       return bcrypt.compare(req.body.password, user.password);
//     })
//     .then(result => {
//       if (!result) {
//         return res.status(401).json({
//           message: "Auth failed"
//         });
//       }
//       console.log(fetchedUser);
//       const token = jwt.sign(
//         { email: fetchedUser.email, userId: fetchedUser._id },
//         "",
//         { expiresIn: "1h" }
//       );
//       res.status(200).json({
//         token: token,
//         expiresIn: 3600,
//         userId: fetchedUser._id
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       return res.status(401).json({
//         message: "Invalid authentication credentials!"
//       });
//     });
// }