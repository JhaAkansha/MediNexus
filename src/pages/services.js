// src/pages/services.js

import React from 'react';
import './services.css'; // Ensure you have this CSS file

const Services = () => {
    const services = [
        {
            title: "Appointment Booking",
            icon: "❤️", // Use appropriate icon
            link: "/doctorProfile", // Define your route
        },
        {
            title: "Check Calendar",
            icon: "🩺", // Use appropriate icon
            link: "/calendar", // Define your route
        },
        {
            title: "Medical History and Records",
            icon: "🧬", // Use appropriate icon
            link: "/medicalRecords", // Define your route
        },
    ];

    return (
        <div className="services-container">
            <h2 className='services-heading'>Our Services</h2>
            <p className='services-title'>Tailored services to optimize your healthcare experience</p>
            <div className="services-grid">
                {services.map((service, index) => (
                    <a key={index} href={service.link} className="service-card">
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.title}</h3>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Services;
