const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    const UserDetails = req.session.userID ? req.session.userID : '616052e7f52e5c8095f19819';
    // console.log(UserDetails);
    res.render('Index', { url: baseUrl, userDetail: UserDetails });
});

router.get('/login', (req, res) => {
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    const UserDetails = req.session.userID ? req.session.userID : '616052e7f52e5c8095f19819';
    res.render('Login', { url: baseUrl, userDetail: UserDetails });
});

router.get('/aboutus', (req, res) => {
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    const UserDetails = req.session.userID ? req.session.userID : '616052e7f52e5c8095f19819';
    res.render('AboutUs', { url: baseUrl, userDetail: UserDetails });
});

router.get('/signup', (req, res) => {
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    const UserDetails = req.session.userID ? req.session.userID : '616052e7f52e5c8095f19819';
    res.render('Signup', { url: baseUrl, userDetail: UserDetails });
});

router.get('/community', (req, res) => {
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    const UserDetails = req.session.userID ? req.session.userID : '616052e7f52e5c8095f19819';
    if (UserDetails === req.session.userID)
        res.render('community', { url: baseUrl, userDetail: UserDetails });
    else
        res.render('login', { url: baseUrl, userDetail: UserDetails });
});

router.get('/profile', (req, res) => {
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    const UserDetails = req.session.userID ? req.session.userID : '616052e7f52e5c8095f19819';
    if (UserDetails === req.session.userID)
        res.render('Profile', { url: baseUrl, userDetail: UserDetails });
    else
        res.render('login', { url: baseUrl, userDetail: UserDetails });
});

router.get('/construction', (req, res) => {
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    const UserDetails = req.session.userID ? req.session.userID : '616052e7f52e5c8095f19819';
    if (UserDetails === req.session.userID)
        res.render('ConstructionProfile', { url: baseUrl, userDetail: UserDetails });
    else
        res.render('login', { url: baseUrl, userDetail: UserDetails });
});

router.get('/contact', (req, res) => {
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    const UserDetails = req.session.userID ? req.session.userID : '616052e7f52e5c8095f19819';
    res.render('Contact', { url: baseUrl, userDetail: UserDetails });
});

router.get('/help', (req, res) => {
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    const UserDetails = req.session.userID ? req.session.userID : '616052e7f52e5c8095f19819';
    if (UserDetails === req.session.userID)
        res.render('Help', { url: baseUrl, userDetail: UserDetails });
    else
        res.render('login', { url: baseUrl, userDetail: UserDetails });
});

router.get('/propertyDetail', (req, res) => {
    const baseUrl = req.protocol + '://' + req.headers.host + '/';
    const UserDetails = req.session.userID ? req.session.userID : '616052e7f52e5c8095f19819';
    if (UserDetails === req.session.userID)
        res.render('PropertyDetail', { url: baseUrl, userDetail: UserDetails });
    else
        res.render('login', { url: baseUrl, userDetail: UserDetails });
});


module.exports = router;