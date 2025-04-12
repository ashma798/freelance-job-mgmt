const mongoose = require('mongoose');
const jobModel = require("../Models/jobModel");
const clientProfileModel = require("../Models/clientProfileModel");
const reviewModel = require("../Models/reviewModel");
const contractModel = require("../Models/contractModel");

    clientProfile =  async (req, res) => {
        try {
            const {user_id, company_name, website} = req.body;

            if (user_id ) {
               
                const newClientProfile = new clientProfileModel({
                    user_id,
                  company_name,
                  website
               });
               newClientProfile.save()
                    .then((response) => {
                        console.log("response: ", response);

                        return res.status(201).json({
                            success: true,
                            statusCode: 201,
                            message: "Client Profile added successfully",
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
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Internal Server Error"
            });
        }
    },
     updateClientProfile = async (req, res) => {
        try {
          const { clientId, updatedData } = req.body;
      
          const updatedProfile = await clientProfileModel.findByIdAndUpdate(
            clientId,
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
          console.error("Update error:", e);
          res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error"
          });
        }
      },
      addJob =  async (req, res) => {
        try {
            const {client_id,job_title,description,budget,skills_required,status} = req.body;

            if (client_id && job_title && budget && skills_required) {
               
                const newJob = new jobModel({
                    client_id,
                    job_title,
                    description,
                    budget,
                    skills_required,
                    status
               });
               newJob.save()
                    .then((response) => {
                        console.log("response: ", response);

                        return res.status(201).json({
                            success: true,
                            statusCode: 201,
                            message: "Jobs added successfully",
                        });
                    })
                    .catch((error) => {
                        console.log("error: ", error);

                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "adding new job failed"
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

      viewJob =  async (req, res) => {
          try {
              const allJobs = await jobModel.find();
      
              return res.status(200).json({
                  success: true,
                  statusCode: 200,
                  message: "Jobs retrieved successfully",
                  count: allJobs.length,
                  data: allJobs
              });
          } catch (err) {
              return res.status(500).json({
                  success: false,
                  statusCode: 500,
                  message: "Failed to fetch jobs"
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
    addReview =  async (req, res) => {
        try {
            const {job_id,reviewer_id,reviewee_id,start_date,end_date,rating,comment,status} = req.body;

            if (job_id && reviewer_id && reviewee_id && rating) {
               
                const newReview = new reviewModel({
                    job_id,
                    reviewer_id,
                    reviewee_id,
                    start_date,
                    end_date,
                    rating,
                    comment,
                    status
               });
               newReview.save()
                    .then((response) => {
                        console.log("response: ", response);

                        return res.status(201).json({
                            success: true,
                            statusCode: 201,
                            message: "Review  and Rating added successfully",
                        });
                    })
                    .catch((error) => {
                        console.log("error: ", error);

                            return res.status(200).json({
                                success: false,
                                statusCode: 400,
                                message: "adding new Rating  failed"
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
    }

      
    



    module.exports = {
        clientProfile,updateClientProfile,
        listJobs,
        deleteJob,
        updateJob,
        addContract,
        addReview
      };