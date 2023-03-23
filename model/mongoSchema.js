const mongoose = require("mongoose");

/* creating the structure for storing data of User  */
const userSchema = new mongoose.Schema(
  {
    OTP : Number,
    token: String,
    name: String,
    email: {
      type: String,
      lowercase: true,
    },
    phone: String,
    password: String,
  },
  { versionKey: false , timestamps: true}
);

/* creating collection for database of User*/
const User = new mongoose.model("User", userSchema);

/* creating the structure for storing data of addData  */
const addDataSchemaMongoose = new mongoose.Schema(
    {
      userID : String,
      title: String,
      description: String,
      image : {
        type : String,
        default : "public/images-1679563231778.jpg"
    }, 
    category : String,
    startTime : Date ,
    endTime: Date,
    status : {
      type : String,
      default : "active"
    }
    },
    { versionKey: false , timestamps : true }
);

/* creating collection for database */
const taskManager = new mongoose.model("taskManager", addDataSchemaMongoose);

module.exports = { User , taskManager};