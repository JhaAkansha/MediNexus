import './doctorRegistration.css';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function DoctorRegistration () {
    const [speciality, setSpeciality] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('Please log in first.');
            return;
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        console.log(userId);
    
        // Validate form inputs
        if (!speciality || !description) {
          alert('Please fill in all fields.');
          return;
        }

    
        const formData = {
            speciality: speciality,
            description: description,
            userId: userId
        };
    
        try {
          //Making POST request to the backend
          const response = await fetch ('http://localhost:3000/doc/post',{
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            alert('Registration successful!');
            navigate('/doctor-dashboard');
          }
          else {
            alert(data.message || 'Registration failed');
          }
        }
        catch (error) {
          console.error('Error:', error);
          alert('Something went wrong, please try again');
        }
      };

    return (
        <form id="doctorForm" onSubmit={handleSubmit}>
            <div className='doctor-info'>Enter your information</div>
            <div className='descriptive-text'>
                "Please provide your specialty and a brief description about yourself. This information will be displayed on your profile to help patients understand your expertise and choose the doctor that best suits their needs.
            </div>
            <input
                placeholder='Speciality'
                type='text'
                className='speaciality'
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                required />
            <textarea
            type = "text"
            name = 'experience'
            className='Description'
            id = 'description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoCapitalize = "sentences"
            placeholder='Description'>
            </textarea>
            <button className="submit" type="submit">Submit</button>
          </form>
    );
}

export default DoctorRegistration;