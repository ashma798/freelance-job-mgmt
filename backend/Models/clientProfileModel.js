
const mongoose = require('mongoose');
const clientSchema = new  mongoose.Schema({
    user_id:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    company_name:
    {
        type:String,
        required : false

    },
    website:{
        type:String,
         required : false
       
    }
  
    
},
{
    timeStamps:true
});

    
const Client = new mongoose.model("client_profile",clientSchema);
module.exports = Client;


