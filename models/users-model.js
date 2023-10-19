const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minLength: 6 },
    name: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    image: { type: String, default: '' },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String, default: '' },
})

module.exports = model("User", UserSchema);
