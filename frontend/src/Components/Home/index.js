import React from 'react';

const Home = () => {
  const freelancers = [
    {
      id: 1,
      name: 'John Doe',
      profession: 'Web Developer',
      rating: 4.8,
      reviews: 120,
      profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      profession: 'Graphic Designer',
      rating: 4.9,
      reviews: 150,
      profilePic: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 3,
      name: 'Sara Lee',
      profession: 'SEO Specialist',
      rating: 4.7,
      reviews: 95,
      profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

  const clients = [
    {
      id: 1,
      name: 'Tech Solutions Inc.',
      description: 'A software development company offering tech solutions to businesses.',
      profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: 2,
      name: 'Creative Studios',
      description: 'A creative agency specializing in marketing and brand design.',
      profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-20">
        <h1 className="text-4xl font-bold">Find Top Freelancers & Build Amazing Projects</h1>
        <p className="mt-4 text-xl">Connect with professionals for your next project</p>
        <button className="mt-8 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition duration-300">
          Get Started
        </button>
      </section>

      {/* Freelancer Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">Top Freelancers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 px-5">
          {freelancers.map((freelancer) => (
            <div key={freelancer.id} className="bg-white shadow-lg rounded-xl p-6 text-center">
              <img
                src={freelancer.profilePic}
                alt={freelancer.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{freelancer.name}</h3>
              <p className="text-gray-500">{freelancer.profession}</p>
              <div className="mt-4 flex justify-center items-center space-x-2">
                <span className="text-yellow-500">{'★'.repeat(Math.round(freelancer.rating))}</span>
                <span className="text-gray-500">({freelancer.reviews} reviews)</span>
              </div>
              <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Client Section */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">Our Trusted Clients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 px-5">
          {clients.map((client) => (
            <div key={client.id} className="bg-white shadow-lg rounded-xl p-6 text-center">
              <img
                src={client.profilePic}
                alt={client.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{client.name}</h3>
              <p className="text-gray-500">{client.description}</p>
              <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300">
                View Jobs
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-20 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Next Project?</h2>
        <p className="text-xl mb-6">Find skilled freelancers or post your job today!</p>
        <div className="flex justify-center space-x-6">
          <button className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition duration-300">
            Find a Freelancer
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition duration-300">
            Post a Job
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
