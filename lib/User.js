

const userSchema = new mongoose.Schema({
  // id : {
  //   type : String,
  //   required : true,
  //   unique : true
  // },  
  username : {
      type : String,
      // required : true,
      // unique :true
    },
    email : {
      type : String,
      // required : true,
      // unique : true
    },
    password : {
      type :String,
      // required : true
    }
  
  })
var User = mongoose.model("User", userSchema);

module.exports = User;