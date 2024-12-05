import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [unviewedJobs, setUnviewedJobs] = useState(0);

    useEffect(() => {
        const fetchJobsAndUserData = async () => {
            const accessToken = localStorage.getItem('access_token');
            const isApplicant = localStorage.getItem('is_applicant') === 'true';
            
            if (accessToken && isApplicant) {
                try {
                    const jobsResponse = await axios.get('http://localhost:8000/api/jobs', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    const userResponse = await axios.get('http://localhost:8000/accounts/api/applicant-details/', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    
                    const jobs = jobsResponse.data.jobs || [];
                    const userSkills = JSON.parse(userResponse.data.skills);

                    // Filter jobs based on user skills
                    const filteredJobs = jobs.filter(job =>
                        userSkills.some(skill => job.title.toLowerCase().includes(skill.toLowerCase()))
                    );
                    
                    const unviewedCount = filteredJobs.filter(job => !job.viewed).length;
                    setUnviewedJobs(unviewedCount);
                    localStorage.setItem('unviewed_jobs', unviewedCount);  // Persist the count
                } catch (error) {
                    console.error('Error fetching jobs and user data:', error);
                }
            }
        };

        fetchJobsAndUserData();
    }, []);

    return (
        <JobContext.Provider value={{ unviewedJobs, setUnviewedJobs }}>
            {children}
        </JobContext.Provider>
    );
};
