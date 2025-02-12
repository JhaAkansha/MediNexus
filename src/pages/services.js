import React from 'react';
import './services.css';

const Services = () => {
    const services = [
        {
            title: "Appointment Booking",
            icon: "❤️",
            link: "/doctorProfile",
        },
        {
            title: "Check Calendar",
            icon: "🩺",
            link: "/calendar",
        },
        {
            title: "Medical History and Records",
            icon: "🧬",
            link: "/medicalRecords",
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
