const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../Middlewares/auth");
const {deleteJob,deleteUser,viewReview} = require("../Controllers/adminController");
const {
    addReview,sendMessage,getLastPostedJobIdviewClient,viewJob,jobProfile,clientProfile,getBidDetails} = require("../Controllers/userController");
const {getFreelancerCount,getJobCount,getOpenProjectCount} = require('../Controllers/dashboardController')
const { myProposal,viewProposals,addProposal,freelancerProfile,inviteFreelancer,bid} = require("../Controllers/freelancerController");
const { createPayment,initialPaymentRelease,markAsCompleted} = require("../Controllers/paymentController");
const { create } = require("../Models/jobModel");
const Freelancer = require("../Models/freelancerProfileModel");

/*ADMIN ROUTES*/

router.get('/viewClients',viewClients);
router.delete('/deleteUser',verifyToken,checkRole('admin'),deleteUser);
router.delete('/deleteJob',verifyToken,checkRole(['admin', 'client']),deleteJob);
router.get('/viewReview',verifyToken,checkRole(['admin','client','freelancer']),viewReview);




/*client routes*/
router.post('/addJob',verifyToken,checkRole('client'),addJob);
router.post('/addReview',verifyToken,checkRole(['client']),addReview);
router.get('/viewProposals',verifyToken,checkRole('client'),viewProposals);
router.post('/getLastPostedJobId',verifyToken,checkRole('client'),getLastPostedJobId);
router.post('/inviteFreelancer',verifyToken,checkRole('client'),inviteFreelancer);
router.post('/sendMessage',verifyToken,checkRole('client'),sendMessage);
router.get('/getFreelancerCount', verifyToken,checkRole('client'), getFreelancerCount);
router.get('/getJobCount', verifyToken,checkRole('client'), getJobCount);
router.get('/getOpenProjectCount', verifyToken,checkRole('client'), getOpenProjectCount);
router.get('/getProposalCount',verifyToken,checkRole('client'),getProposalCount);
router.get('/myProposal',verifyToken,checkRole(['client']),myProposal);
router.get('/clientProfile/:clientId',verifyToken,checkRole(['client','freelancer']),clientProfile);
router.get('/acceptBid',verifyToken,checkRole(['client']),acceptBid);
router.get('/getBidDetails/:bidId',verifyToken,checkRole(['client','freelancer']),getBidDetails);
router.post('/createPayment',verifyToken,checkRole(['client']),createPayment);
router.post('/initialPaymentRelease',verifyToken,checkRole(['client','freelancer']),initialPaymentRelease);



//router.get('/getPaymentCount',verifyToken,checkRole(['client']),getPaymentCount);



/*FREELANCER ROUTES*/
router.get('/getFreelancers',getFreelancers);
router.get('/getFreelancers',verifyToken,checkRole(['admin','client','freelancer']),getFreelancers);
router.get('/viewJob',verifyToken,checkRole(['admin','client','freelancer']),viewJob);
router.get('/freelancerProfile/:freelancerId',verifyToken,checkRole(['client','freelancer']),freelancerProfile);
router.post('/bid',verifyToken,checkRole(['freelancer']),bid);
router.post('/addProposal',verifyToken,checkRole('freelancer'),addProposal);
router.get('/myProposal',verifyToken,checkRole(['client','freelancer']),myProposal);
router.get('/getMessages',verifyToken,checkRole(['client','freelancer']),getMessages);
router.get('/jobProfile/:jobId',verifyToken,checkRole(['freelancer']),jobProfile);
router.post('/markAsCompleted/:jobId',verifyToken,checkRole(['freelancer']),markAsCompleted);


/*PAYMENT ROUTES*/




module.exports = router;