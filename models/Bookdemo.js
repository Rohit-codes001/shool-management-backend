import mongoose from "mongoose";

const bookDemoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    schoolName: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNo: {
      type: String,
      required: true,
      trim: true,
    },

    whatsAppNo: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    studentsRange: {
      type: String,
      required: true
    },

    teachersRange: {
      type: String,
      required: true
    
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    captchaToken: {
      type: String,
      
    },
  },
  {
    timestamps: true,
  }
);

const BookDemoModel =
  mongoose.models.BookedDemos ||
  mongoose.model("BookedDemos", bookDemoSchema);

export default BookDemoModel;