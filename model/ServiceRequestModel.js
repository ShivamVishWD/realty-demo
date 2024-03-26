const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({ 
    service_type: {
        type: String,
        required: true,
    },
    service_subject: {
        type: String,
        required: true,
    },
    service_desc: {
        type: String,
        required: true,
    },
    service_by: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema, 'ServiceRequest');