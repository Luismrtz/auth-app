import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

export default userModel;