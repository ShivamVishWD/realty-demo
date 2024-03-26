const express = require('express');
const router = express.Router();
const conn = require('../database/mongoConfig');
const UserModel = require('../model/UserModel');
const UserContact = require('../model/UserContactModel');
const Service = require('../model/ServiceModel');
const Complaint = require('../model/ComplaintModel');
const ServiceRequest = require('../model/ServiceRequestModel');

router.get('/', async (req, res) => {
    res.json({ 
        status: 200,
        message: "Reality API is running"
    })
});

router.post('/insertService', async(req, res) => {
    console.log(req.body);
    try{
        const service = new Service(req.body);
        const result = await service.save();
        if(result)
            res.json({ status: 200, result });
        else
            res.json({ status: 404, message: "no data found" });
    }
    catch(err){
        console.log(err);
    }
});

router.get('/getService', async(req, res) => {
    try{
        const result = await Service.find({});
        console.log(result);
        if(result)
            res.json({ status: 200, result});
        else
            res.json({ status: 400, message: 'no service here'});
    }
    catch(err){
        console.log(err);
    }
});


router.post('/registerUser', async(req, res) => {
    console.log(req.body);    
    try{
        const user = new UserModel(req.body);
        const result = await user.save();
        if(result){
            return res.json({
                status:200,
                message: "Data Save Successfully"
            });
        }else{
            return res.json({
                status:400,
                message: "Some Error Try Again"
            });
        }
    }
    catch(err) {
        console.log(err);
    }
});

router.post('/userAuth', async(req, res) => {
    console.log(req.body);
    try{
        const result = await UserModel.findOne({ email: req.body.email, password: req.body.password, userType: req.body.userType });
        console.log(result, "User Data");
        if(result){
            req.session.userID = result._id;
            res.json({
                status: 200,
                message: "Successfully Auth",
                result
            });
        
        }else{
            res.json({
                status: 400,
                message: "Wrong Credential"
            });
        }
    }
    catch(err){
        console.log(err);
    }
});

router.get('/userDetail/', async(req, res) => {
    try{
        const id = req.session.userID;
        const result = await UserModel.findOne({_id: id});
        console.log(result, "User Detail");
        if(result)
            res.json({ status: 200, result });
        else
            res.json({ status: 400, message: "" });
    }
    catch(err){
        console.log(err);
    }
});

router.post('/insertUserContact/', async(req, res) => {
    
    console.log(req.body);
    console.log(req.session.userID);
    
    req.body.user_uid = req.session.userID;
    console.log(req.body);

    try{
        const userContact = new UserContact(req.body);
        const result = await userContact.save();
        console.log(result);
        if(result)
            res.json({ status: 200, result });
        else
            res.json({ status: 400, message: "No Data Found" });
        
    }
    catch(err){
        console.log(err);
    }
});

router.get('/getUserContact/:id', async(req, res) => {
    console.log(req.params.id);
    try{
        // const result = await UserContact.findOne({user_uid: req.params.id}).populate('user_uid').exec();
        const result = await UserContact.findOne({user_uid: req.params.id});
        console.log(result);
        if(result)
            res.json({status: 200, result});
        else
            res.json({success: 400, message: "No Contact Detail"});
    }
    catch(err){
        console.log(err);
    }
});

router.get('/userLogout/', (req, res) => {
    try{
        if(req.session.userID){
            // console.log(req.params.id);
            req.session.destroy();
            res.json({status: 200})
        }
    }
    catch(err) {
        console.log(err);
    }
});

// router.post('/serviceRequest', upload.single('servieFile'), (req, res) => {
//     console.log(req.body);
//     console.log(req.file);
//     let image = req.protocol + '://' + req.headers.host + '/' + req.file.path;
//     console.log(image);
// });

router.post('/serviceRequest', async(req, res) => {
    try{
        req.body.service_by = req.session.userID;
        const serviceRequest = new ServiceRequest(req.body);

        const result = await serviceRequest.save();
        if(result)
            res.json({ status: 200, result});
        else
            res.json({ status: 400, message: 'Service no inserted'});
    }
    catch(err){
        console.log(err);
    }
});

router.post('/insertComplaint/', async(req, res) =>{
    try{
        req.body.complaint_by = req.session.userID;
        req.body.complaint_isUrgent = req.body.complaint_isUrgent ? req.body.complaint_isUrgent : "Not Required";
        console.log(req.body);

        const userComplaint = new Complaint(req.body);
        console.log(userComplaint);
        const result = await userComplaint.save();
        console.log(result);
        if(result)
            res.json({ status: 200, result });
        else
            res.json({ status: 400, message: "Something Wrog Please Try Again"});
    }
    catch(err){
        console.log(err);
    }
});

router.get('/getUsercomplaints/', async(req, res) => {
    try{
        const result = await Complaint.find({ complaint_by: req.session.userID }).sort({complaint_dt: -1});
        console.log(result);
        if(result)
            res.json({ status: 200, result });
        else
            res.json({ status: 400, message: "Data not found" });
    }
    catch(err){
        console.log(err);
    } 
});

module.exports = router;