const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minLength: 6 },
    name: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    image: { type: String },
    isActivated: { type: Boolean, required: true, default: false },
    activationLink: { type: String },
})

module.exports = model("User", UserSchema);
