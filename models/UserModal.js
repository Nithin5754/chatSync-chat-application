import { hash } from "bcrypt";
import { genSalt } from "bcrypt";
import mongoose, { Document, Schema } from "mongoose";


const UserSchema= new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  profile_image: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Fprofile-icon-png&psig=AOvVaw2KkxnpaXU0MTaVhlbHsRdT&ust=1684305011140000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOCJ46Kb-f4CFQAAAAAdAAAAABAJ",
  },
  password: {
    type: String,
  },
  color: {
    type: Number,
    default:0
  },
  profileSetup: {
    type: Boolean,
    default:false
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


UserSchema.pre("save", async function (next) {
  const salt=await genSalt();
  this.password=await hash(this.password,salt);
  next();
});

UserSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
