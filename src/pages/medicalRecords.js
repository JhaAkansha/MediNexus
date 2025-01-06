import './medicalRecord.css';
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function MedicalRecords() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [records, setRecords] = useState([]); 

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file ? file : null);
    };

    useEffect(() => {
        // Fetch the list of uploaded documents from the server
        const fetchRecords = async () => {
            try {
                const response = await axios.get('http://localhost:3000/records/getAll');
                setRecords(response.data); // Set the fetched records in the state
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        };

        fetchRecords();
    }, []);

     const handleClick = async (event) => {
            event.preventDefault();
    
            const token = localStorage.getItem('authToken');
            if (!token) {
                alert('Please log in first.');
                return;
            }
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            console.log(userId);

            const formData = new FormData();
            formData.append('file', selectedFile); 
            formData.append("userId", userId);
        
            console.log("data sent: ",formData);

            try {
                //Making POST request to the backend
                const response = await fetch ('http://localhost:3000/records/post',{
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${token}`
                  },
                  body: formData,
                });
          
                const data = await response.json();
          
                if (response.ok) {
                    alert('Document uploaded successfully!');
                }
                else {
                  alert(data.message || 'Upload failed');
                }
              }
              catch (error) {
                console.error('Error:', error);
                alert('Something went wrong, please try again');
              }
            };

    return (
        <div className='medical-records'>
            <input 
                type="file" 
                className='record-upload' 
                name="file" 
                accept="application/pdf" 
                onChange={handleFileChange} 
            />
            <button className="upload" onClick={handleClick}>Upload</button>
            <div className="medical-records">
            <h2>Uploaded Documents</h2>
            <div className="file-list">
                {records.length > 0 ? (
                    records.map((record) => (
                        <div key={record._id} className="file-square">
                            {record.fileUrl ? (
                                <a
                                    href={record.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="file-link"
                                >
                                    {record.file.split('/').pop()}
                                </a>
                            ) : (
                                <p>No file available</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No documents uploaded yet.</p>
                )}
            </div>
        </div>
        </div>
    );
}

export default MedicalRecords;
