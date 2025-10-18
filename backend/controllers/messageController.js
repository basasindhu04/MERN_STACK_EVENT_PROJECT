import { Message } from "../models/messageSchema.js";

export const sendMessage = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const { name, email, subject, message } = req.body;

    // ✅ Trim all fields to avoid spaces-only errors
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const savedMessage = await Message.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: savedMessage, // optional: return saved data
    });
  } catch (error) {
    if(error.name ==="ValidationError"){
      let errorMessage = "";
      if(error.errors.name){
        errorMessage = error.errors.name.message + " "
      }
      if(error.errors.email){
        errorMessage = error.errors.email.message + " "
      }
      if(error.errors.subject){
        errorMessage = error.errors.subject.message + " "
      }
      if(error.errors.message){
        errorMessage = error.errors.message.message + " "
      }
      return res.status(400).json({
        success: false,
        error: errorMessage,
      });
    }




    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
