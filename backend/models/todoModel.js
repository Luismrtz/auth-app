import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    userId: {type: String, required: true},
}, {
    timestamps: true
});
const todoModel = mongoose.model("Todo", todoSchema);

export default userModel;