const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    projects: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('students', StudentsSchema);