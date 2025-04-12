const mongoose = require('mongoose');
const jobModel = require("../Models/jobModel");
const proposalModel = require("../Models/proposalsModel");
const freelancerProfileModel = require("../Models/freelancerProfileModel");


    freelancerProfile =  async (req, res) => {
        try {
            const {user_id,portfolio_links,hourly_rate,experience,skills} = req.body;

            if (user_id && hourly_rate && experience && skills ) {
               
                const newFreelancerProfile = new freelancerProfileModel({
                    user_id,
                      portfolio_links,
                      hourly_rate: mongoose.Types.Decimal128.fromString(hourly_rate.toString()),
                      experience,
                      skills
               });
               newFreelancerProfile.save()
                    .then((response) => {
                        console.log("response: ", response);

                        return res.status(201).json({
                            success: true,
                            statusCode: 201,
                            message: "Freelancer Profile added successfully",
                        });
                    })
                    .catch((error) => {
                        console.log("error: ", error);

                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "Profile adding failed"
                            });
                        })
                    
            } else {
                return res.status(200).json({
                    success: false,
                    statusCode: 400,
                    message: "Missing required fields"
                });
            }

        } catch (err) {
            console.log("Error saving freelancer profile:", error.message);
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    },
     updateFreelancerProfile = async (req, res) => {
        try {
          const { freelancerId, updatedData } = req.body;
      
          const updatedProfile = await freelancerProfileModel.findByIdAndUpdate(
            freelancerId,
            updatedData,
            { new: true } 
          );
      
          if (!updatedProfile) {
            return res.status(404).json({
              success: false,
              statusCode: 404,
              message: "Profile not found"
            });
          }
      
          return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Profile updated successfully",
            data: updatedProfile
          });
        } catch (e) {
          res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error"
          });
        }
      },
      addProposal =  async (req, res) => {
        try {
            const {freelancer_id,job_id,cover_letter,proposed_budget,status} = req.body;

            if (freelancer_id && job_id && proposed_budget) {
               
                const newProposal = new proposalModel({
                    freelancer_id,
                    job_id,
                    cover_letter,
                    proposed_budget,
                    status
               });
               newProposal.save()
                    .then((response) => {
                        console.log("response: ", response);

                        return res.status(201).json({
                            success: true,
                            statusCode: 201,
                            message: "Proposal added successfully",
                        });
                    })
                    .catch((error) => {
                        console.log("error: ", error);

                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "adding Proposal failed"
                            });
                        })
                    
            } else {
                return res.status(200).json({
                    success: false,
                    statusCode: 400,
                    message: "Missing required fields"
                });
            }

        } catch (err) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    },
    myProposal = async (req, res) => {
        try {
            const freelancerId = req.freelancerId;
    
            const proposals = await proposalModel.find({ freelancer_id: freelancerId })
                .populate('job_id')
                .populate('freelancer_id');
    
            if (!proposals.length) {
                return res.status(404).json({
                    success: false,
                    statusCode: 404,
                    message: "No proposals found for this freelancer"
                });
            }
    
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Proposals retrieved successfully",
                data: proposals
            });
    
        } catch (error) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    },
    viewProposals =  async (req, res) => {
        try {
            const allProposals = await proposalModel.find();
    
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Proposals retrieved successfully",
                count: allProposals.length,
                data: allProposals
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Failed to fetch proposals"
            })
        }
    },
      deleteJob = async (req, res) => {
              try {
                  const { jobId } = req.body;
                  console.log("Api call:", jobId);
          
                  if (!jobId) {
                      return res.status(400).json({
                          success: false,
                          statusCode: 400,
                          message: "Job ID is required",
                      });
                  }
          
                  const deletedJob = await jobModel.findByIdAndDelete(jobId);
                  console.log("jb:",deletedJob);
          
                  if (!deletedJob) {
                      return res.status(404).json({
                          success: false,
                          statusCode: 404,
                          message: "Job not found",
                      });
                  }
          
                  return res.status(200).json({
                      success: true,
                      statusCode: 200,
                      message: "Job deleted successfully",
                      data: deletedJob
                  });
          
              } catch (e) {
                  return res.status(500).json({
                      success: false,
                      statusCode: 500,
                      message: `Internal Server Error: ${e.message}`
                  });
              }
          },
      updateJob = async (req, res) => {
        try {
          const { jobId, updatedData } = req.body;
      
          const updatedJob = await jobModel.findByIdAndUpdate(
            jobId,
            updatedData,
            { new: true } 
          );
      
          if (!jobId) {                                    
            return res.status(404).json({
              success: false,
              statusCode: 404,
              message: "job not found"
            });
          }
      
          return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "job updated successfully",
            data: updatedJob
          });
        } catch (e) {
          console.error("Update error:", e);
          res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error"
          });
        }
      },
      addContract =  async (req, res) => {
        try {
            const {job_id,client_id,freelancer_id,start_date,end_date,status} = req.body;

            if (job_id && client_id && freelancer_id && start_date && end_date && status) {
               
                const newContract = new contractModel({
                    job_id,
                    client_id,
                    freelancer_id,
                    start_date,
                    end_date,
                    status
               });
               newContract.save()
                    .then((response) => {
                        console.log("response: ", response);

                        return res.status(201).json({
                            success: true,
                            statusCode: 201,
                            message: "Contract added successfully",
                        });
                    })
                    .catch((error) => {
                        console.log("error: ", error);

                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "adding new contract failed"
                            });
                        })
                    
            } else {
                return res.status(200).json({
                    success: false,
                    statusCode: 400,
                    message: "Missing required fields"
                });
            }

        } catch (err) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    },
    viewContractByUser =  async (req, res) => {
    
            try {
                const { freelancer_id, client_id } = req.body;
        
                if (!freelancer_id && !client_id) {
                    return res.status(400).json({
                        success: false,
                        statusCode: 400,
                        message: "Please provide either freelancer_id or client_id"
                    });
                }
        
                const query = freelancer_id ? { freelancer_id }: { client_id };
        
                const contracts = await contractModel.find(query)
                    .populate('job_id')
                    .populate('client_id')
                    .populate('freelancer_id');
        
                if (contracts.length === 0) {
                    return res.status(404).json({
                        success: false,
                        statusCode: 404,
                        message: "No contracts found for the given user"
                    });
                }
        
                return res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: "Contracts retrieved successfully",
                    data: contracts
                });
        
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: "Internal Server Error"
                });
            }
        },
    
    module.exports = {
        freelancerProfile,updateFreelancerProfile,
        addProposal,
        myProposal,
        viewProposals,
        addContract,
        viewContractByUser,
      };