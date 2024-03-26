const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({ 
    complaint_category: {
        type: String,
        required: true,
    },
    complaint_for: {
        type: String,
        required: true,
    },
    complaint_desc: {
        type: String,
        required: true,
    },
    complaint_isUrgent: {
        type: String,
        required: true,
    },
    complaint_by: {
        type: String,
        required: true,
    },
    complaint_status: {
        type: String,
        required: true,
        default: 'Open'
    },
    complaint_code: {
        type: String, 
        required: true,
        default: ""
    },
    complaint_dt: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Complaint', ComplaintSchema, 'Complaint');