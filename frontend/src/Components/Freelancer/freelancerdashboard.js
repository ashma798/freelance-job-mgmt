import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig/axiosConfig';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const Freelancerdashboard = () => {
  const [search, setSearch] = useState('');
  const [joblist, setJobList] = useState([]);
  const [clients, setClients] = useState([]);
  const [earningsData, setEarningsData] = useState([]);
  const [messages, setMessages] = useState([]); 
  const [newMessageCount, setNewMessageCount] = useState(0); 
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const loggeduser = JSON.parse(localStorage.getItem("@user"));
  const freelancerId = loggeduser._id;
  const FetchJobList = async () => {
    setIsLoading(true);
    try {
      const jobListResponse = await axiosInstance.get('/users/viewJob');
      setJobList(jobListResponse.data.data);
      localStorage.setItem('joblist', JSON.stringify(jobListResponse.data.data));
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
    finally {
      setIsLoading(false);
    }
  };

  const FetchClientList = async () => {
    try {
      const clientListResponse = await axiosInstance.get('/users/viewClients');
      setClients(clientListResponse.data.data);
      localStorage.setItem('clients', JSON.stringify(clientListResponse.data.data));
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };
  const FetchMessages = async () => {
    try {
      const messagesResponse = await axiosInstance.get('/users/getMessages'); 
      setMessages(messagesResponse.data.data);
      setNewMessageCount(messagesResponse.data.data.filter(message => !message.read).length);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };


  const handleMessageClick = (messageId) => {
    setMessages(messages.map(message =>
      message._id === messageId ? { ...message, read: true } : message
    ));
    setNewMessageCount(newMessageCount - 1); 
    navigate(`/messages/${messageId}`);
  };

  useEffect(() => {
    FetchJobList();
    FetchClientList();
    FetchMessages();

    setEarningsData([
      { month: 'January', earnings: 1500 },
      { month: 'February', earnings: 2200 },
      { month: 'March', earnings: 2800 },
      { month: 'April', earnings: 3000 },
      { month: 'May', earnings: 3200 }
    ]);
  }, []);

  const filteredJobs = joblist.filter((job) =>
    job.job_title.toLowerCase().includes(search.toLowerCase()) ||
    job.skills_required.some(skill =>
      skill.toLowerCase().includes(search.toLowerCase())
    )
  );
  
  const handleBidClick = (jobId, freelancerId, clientId) => {
    navigate(`/Freelancer/Bid?jobId=${jobId}&freelancerId=${freelancerId}&clientId=${clientId}`);
  };
  
  const handleViewClientProfile = (clientId) => {
   
    navigate(`/Client/clientProfile?clientId=${clientId}`);
  };

  const  handleStatusClick = async (jobId) => {
   try {
    await axiosInstance.post(`/users/markAsCompleted/${jobId}`);
      setJobs(prevJobs =>
        prevJobs.map(job =>
          job._id === jobId ? { ...job, status: "completed" } : job
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  return (
    <div className="container mt-5" style={{ maxWidth: "1200px", backgroundColor: "#f9f9f9" }}>
      <div className="row">
        {/* Left Column: Projects and Earnings */}
        <div className="col-md-8">
          <h2 className="font-weight-bold text-primary">Freelancer Dashboard</h2>
          <p className="text-muted">Find and apply for exciting projects.</p>
          <div className="relative">
            <button className="text-lg text-gray-700">
              <i className="bi bi-bell"></i>
            </button>
            {newMessageCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {newMessageCount}
              </span>
            )}
          </div>
          <div className="mt-4">
            {messages.length > 0 && (
              <div>
                <h5 className="text-lg font-semibold text-gray-800">New Messages</h5>
                <ul className="list-none p-0">
                  {messages.filter(message => !message.read).map((message, index) => (
                    <li key={index} className="bg-white p-3 rounded-lg shadow-md mb-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleMessageClick(message._id)}>
                      <p className="font-medium text-gray-800">{message.senderName}</p>
                      <p className="text-sm text-gray-500">{message.message.slice(0, 50)}...</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Project Counts */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title">Completed Projects</h5>
                  <p className="card-text">{joblist.filter(job => job.status === 'completed').length}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card text-white bg-info mb-3">
                <div className="card-body">
                  <h5 className="card-title">Posted Proposals</h5>
                  <p className="card-text">{joblist.filter(job => job.proposalSubmitted).length}</p>
                </div>
              </div>
            </div>
          </div>

        

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search projects by skill or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Job Listings */}
          <h4 className="mb-3 text-muted">Available Projects</h4>
          {filteredJobs.length === 0 ? (
            <div className="col-12 text-center">
              <p>No projects match your search.</p>
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <div className="card mb-4 shadow-lg rounded-4" key={index}>
                <div className="card-body">
                  <h5 className="card-title text-dark">{job.job_title}</h5>
                  <p className="card-text text-muted">{job.description}</p>

                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {job.skills_required.map((skill, idx) => (
                      <span key={idx} className="badge badge-pill" style={{
                        backgroundColor: "#6c757d",
                        color: "#fff",
                        fontSize: "0.875rem"
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-success fs-5">₹{parseFloat(job.budget?.$numberDecimal).toFixed(2)}</span>
                    <button
  className="btn btn-outline-primary btn-sm"
  onClick={() => handleStatusClick(job._id)}
  disabled={job.status === "completed"}
  style={{ borderRadius: "20px" }}
>
  {job.status === "completed" ? "Completed" : "Pending"}
</button>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={()=>handleBidClick(job._id,freelancerId,job.client_id)}
                      style={{ borderRadius: "20px" }}
                    >
                      Free to Bid
                    </button>
                   
                  </div>
                </div>

                {/* Client Rating and Reviews */}
                <div className="card-footer text-muted">
                  <div className="d-flex gap-2">
                    {[...Array(5)].map((_, idx) => (
                      <i
                        key={idx}
                        className={`bi bi-star-fill ${job.client_rating > idx ? 'text-warning' : 'text-muted'}`}
                        style={{ fontSize: "1.2rem" }}
                      ></i>
                    ))}
                  </div>
                  <p className="mt-2">Client Review: {job.client_review || "No reviews yet."}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Clients */}
       <div className="col-md-4">
          <h4 className="mb-3 text-muted">Clients</h4>
          <div>
            {clients.length === 0 ? (
              <div className="col-12 text-center">
                <p>No clients available.</p>
              </div>
            ) : (
              clients.map((client, index) => (
                <div className="card mb-4 shadow-lg rounded-4" key={index}>
                  <div className="card-body">
                    <h5 className="card-title text-dark">{client.name}</h5>
                    <p className="card-text text-muted">{client.company}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2">
                        {[...Array(5)].map((_, idx) => (
                          <i
                            key={idx}
                            className={`bi bi-star-fill ${client.rating > idx ? 'text-warning' : 'text-muted'}`}
                            style={{ fontSize: "1.2rem" }}
                          ></i>
                        ))}
                      </div>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        style={{ borderRadius: "20px" }}
                        onClick={() => handleViewClientProfile(client._id)}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Freelancerdashboard;
