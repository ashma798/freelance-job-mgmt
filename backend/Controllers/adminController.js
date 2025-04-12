const userModel = require('../Models/userModel');
const jobModel = require('../Models/jobModel');
const reviewModel = require('../Models/reviewModel');

users =  async (req, res) => {
    try {
        const allUsers = await userModel.find({ role: { $in: ['Freelancer', 'Client'] } });
        console.log("usr:",allUsers);

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Users retrieved successfully",
            count: allUsers.length,
            data: allUsers
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Failed to fetch users"
        })
    }
},
 deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("api call: ", userId);

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
},


listJobs =  async (req, res) => {
    try {
        const allJobs = await jobModel.find({ isDeleted: false });

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
            console.error("Error while deleting job:", e);
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: `Internal Server Error: ${e.message}`
            });
        }
    },
   

    viewReview = async (req, res) => {
  try {
    const allReviews = await reviewModel.find();

    return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Reviews retrieved successfully",
        count: allReviews.length,
        data: allReviews
    });
} catch (err) {
    return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Failed to fetch review"
    })
}
}


module.exports = {
  users,
  deleteUser,
  listJobs,
  deleteJob,
  viewReview
};
