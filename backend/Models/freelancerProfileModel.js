
const mongoose = require('mongoose');
const freelancerSchema = new  mongoose.Schema({
    user_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    
    portfolio_links:{
        type:[String]
       
    },
    hourly_rate:{
        type:Number,
        required:true

    },
    experience:{
        type:String,
        required:true
        
    },
    skills:{
        type:[String],
        required:true

    } 
    
},
{
    timeStamps:true
});

    
const Freelancer = new mongoose.model("freelancer_profile",freelancerSchema);
module.exports = Freelancer;






