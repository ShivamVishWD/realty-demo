const express = require('express');
const router = express.Router();
const conn = require('../database/config');
import upload from '../middleware/imageUploader';
var nodemailer = require('nodemailer');
router.get('/', async (req, res) => {
    conn.query("SELECT * FROM service", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.json({
            status:200,
            result
        })
      });
});

router.post('/insertService', (req, res) => {
    // console.log(req.body);
    var sql = "INSERT INTO service (service_by, service_type, service_desc, service_cost) VALUES ('"+req.body.serviceName+"','"+req.body.serviceType+"','"+req.body.serviceDesc+"',"+req.body.serviceCost+")";
    conn.query(sql, function (err, result) {
        if (err) throw err;
        res.json({
            status:200,
            result
        })
        // console.log("1 record inserted");
    });
});

router.get('/getService', (req, res) => {
    var sql = "SELECT * FROM service  ORDER BY created_at DESC";
    conn.query(sql, function (err, result){
        if(err) throw err;
        console.log(result);
        res.json({
            status:200,
            result
        })
    });
});


router.post('/registerUser', (req, res) => {
    // console.log(req.body);
    var sql = "INSERT INTO users(user_name, user_email, user_password) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.password+"')";
    conn.query(sql, function(err, result){
        if(err) throw err;
        res.json({
            status: 200,
            result
        })
    });
});

router.post('/userAuth', (req, res) => {
    // console.log(req.body);
    const sql = "SELECT * FROM users WHERE user_email = '"+req.body.email+"' AND user_password = '"+req.body.password+"'";
    conn.query(sql, function(err, result){
        if(err) throw err;
        console.log(result, 'login data');
        req.session.userId = result[0].user_id;
        res.json({
            status:200,
            result
        })
    });
});

router.get('/userDetail/:id', (req, res) => {
    // console.log( req.params.id);
    const sql = "SELECT * FROM users WHERE user_id = '"+req.params.id+"'";
    conn.query(sql, function(err, result){
        if(err) throw err;
        console.log(result,'user data');
        res.json({
            status: 200,
            result
        })
    });
});

router.post('/insertUserContact/:id', (req, res) => {
    // console.log(req.body);
    const sql = "INSERT INTO user_contact(user_uid, user_flat, user_tower, user_society, user_mobile) VALUES ('"+req.params.id+"','"+req.body.profile_flat+"','"+req.body.profile_tower+"','"+req.body.profile_society+"','"+req.body.profile_number+"')";
    conn.query(sql, function(err, result){
        if(err) throw err;
        res.json({
            status: 200
        })
    })
});

router.get('/getUserContact/:id', (req, res) => {
    const sql = "SELECT * FROM user_contact WHERE user_uid = '"+req.params.id+"'";
    conn.query(sql, function(err, result){
        if(err) throw err;
        res.json({
            status: 200,
            result
        })
    })
});

router.get('/userLogout/:id', (req, res) => {
    if(req.params.id){
        // console.log(req.params.id);
        req.session.destroy();
        res.json({status: 200})
    }
});

// router.post('/serviceRequest', upload.single('servieFile'), (req, res) => {
//     console.log(req.body);
//     console.log(req.file);
//     let image = req.protocol + '://' + req.headers.host + '/' + req.file.path;
//     console.log(image);
// });

router.post('/serviceRequest', (req, res) => {
    // console.log(req.body);
    const sql = "INSERT INTO service_request(service_type, service_subject, service_desc) VALUES ('"+req.body.requestType+"', '"+req.body.subject+"','"+req.body.serviceDescription+"')";
    conn.query(sql, async function (err, result){
        if(err) throw err;
            // const result = await OrderModel.find({ _id: id }).populate('AddressID').exec();
            // const deliveryBoy = await DeliveryModel.find({ _id: result[0].DeliveryBoyID });
            // console.log(deliveryBoy, 'delivery boy');
            let testAccount = await nodemailer.createTestAccount();
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.sendgrid.net",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'apikey', // generated ethereal user
                    pass: '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', // generated ethereal password
                },
            });
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: 'prince@quadrafort.com', // sender address
                to: 'officialprince52@gmail.com', // list of receivers
                subject: "Ticket Confirmed", // Subject line
            });
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
        res.json({
            status: 200
        })
    });
});

router.post('/insertComplaint/:uid', (req, res) =>{
    // console.log(req.body);
    // console.log(Object.keys(req.body))
    let complain = req.body.complaint_isUrgent ? req.body.complaint_isUrgent : 'Not Required';
    const sql = "INSERT INTO complaints(complaint_category, complaint_for, complaint_desc, complaint_isUrgent, complaint_by) VALUES ('"+req.body.complaint_category+"','"+req.body.complaint_for+"','"+req.body.complaint_desc+"','"+complain+"','"+req.params.uid+"')";
    conn.query(sql, function (err, result){
        if(err) throw err;
        res.json({
            status: 200,
            result
        })
    });
});

router.get('/getUsercomplaints/:uid', (req, res) => {
    const sql = "SELECT * FROM complaints WHERE complaint_by = '"+req.params.uid+"'";
    conn.query(sql, function (err, result){
        if(err) throw err;
        res.json({
            status: 200,
            result
        })
    }) 
});

module.exports = router;