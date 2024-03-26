const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({ 
    service_by: {
        type: String,
        required: true,
    },
    service_type: {
        type: String,
        required: true,
    },
    service_desc: {
        type: String,
        required: true,
    },
    service_cost: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Service', ServiceSchema, 'Service');;