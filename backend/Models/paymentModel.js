const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
    job_id: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "jobs",
         required: true 
        },
    client_id: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "users",
        required: true
       },
    freelancer_id: { 
      type: mongoose.Schema.Types.ObjectId,
       ref: "users",
        required: true 
      },
    amount: { 
      type: Number, 
      required: true 
    },
    status: { 
      type: String,
       enum: ["pending", "paid", "refunded", "failed"],
        default: "pending" 
      },
    method: { 
      type: String 
    }
  },
  {
    timeStamps:true
});

    
  module.exports = mongoose.model("payment", paymentSchema);