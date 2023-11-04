const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    profileImage: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    whatsAppNumber: { type: Number, required: true },
    lineOne: { type: String, required: true },
    lineTwo: { type: String, required: true },
    streetName: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: Number , required: true },
    collegeName: { type: String, required: true },
    courseName: { type: String, required: true },
    graduationYear: { type: Date , required: true },
    certificateName: { type: String, required: true },
    certificateCourseName: { type: String, required: true },
    certifiedYear: { type: Date , required: true },
    companyName: { type: String, required: true },
    jobRole: { type: String, required: true },
    duration: { type: Number , required: true },
    dateOfJoining: { type: Date , required: true },
    dateOfReleaving: { type: Date , required: true },
    noticePeriod: { type: Number , required: true },
    declaration: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

module.exports = mongoose.model("Profile", profileSchema);