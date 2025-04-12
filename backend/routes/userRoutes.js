const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../Middlewares/auth");
const {users,listJobs,deleteJob,deleteUser,viewReview} = require("../Controllers/adminController");
const {clientProfile} = require("../Controllers/userController");
const { myProposal,viewProposals,addProposal} = require("../Controllers/freelancerController");

/*ADMIN ROUTES*/
router.get('/users',verifyToken,checkRole('admin'),users);
router.delete('/deleteUser',verifyToken,checkRole('admin'),deleteUser);
router.get('/jobs',verifyToken,checkRole('admin'),listJobs);
router.delete('/deleteJob',verifyToken,checkRole(['admin', 'client']),deleteJob);
router.get('/viewReview',verifyToken,checkRole(['admin','client','freelancer']),viewReview);




/*client routes*/
router.post('/clientProfile',verifyToken,checkRole('client'),clientProfile);
router.put('/updateClientProfile',verifyToken,checkRole('client'),updateClientProfile);
router.post('/addJob',verifyToken,checkRole('client'),addJob);
router.get('/viewJob',verifyToken,checkRole(['client','freelancer']),viewJob);
router.put('/updateJob',verifyToken,checkRole('client'),updateJob);
router.post('/addContract',verifyToken,checkRole('client'),addContract);
router.post('/addReview',verifyToken,checkRole('client'),addReview);
router.get('/viewProposals',verifyToken,checkRole('client'),viewProposals);



/*FREELANCER ROUTES*/
//router.get('/viewJobsById',verifyToken,viewJobById);
router.post('/addProposal',verifyToken,checkRole('freelancer'),addProposal);
router.get('/myProposal',verifyToken,checkRole(['client','freelancer']),myProposal);
router.post('/freelancerProfile',verifyToken,checkRole('freelancer'),freelancerProfile);
router.put('/updateFreelancerProfile',verifyToken,checkRole('freelancer'),updateFreelancerProfile);
router.get('/viewContract',verifyToken,checkRole(['client','freelancer']),viewContractByUser);



module.exports = router;