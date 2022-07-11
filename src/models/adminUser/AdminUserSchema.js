import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    role: {
      type: String,
      required: true,
      default: "Admin",
    },
    lName: {
      type: String,
      required: true,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 15,
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      maxlength: 100,
    },
    dob: {
      type: Date,
      default: null,
    },
    address: {
      type: String,
      maxlength: 100,
    },
    verificationCode: {
      type: String,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Admin_user", AdminSchema);
