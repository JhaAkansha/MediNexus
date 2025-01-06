import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './patientHistory.css';

function PatientHistory() {
  const { id } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchPatientRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/records/get/${id}`);
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching patient records:', error);
      }
    };

    fetchPatientRecords();
  }, [id]);

  return (
    <div className='patient-history'>
      <h2 className='patient-history-title'>Patient History</h2>
      <div>
        {records.length > 0 ? (
          records.map((record) => (
            <div key={record._id} className="record-item">
              <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
                {record.file.split('/').pop()}
              </a>
            </div>
          ))
        ) : (
          <p className='alt-text'>No medical records found for this patient.</p>
        )}
      </div>
    </div>
  );
}

export default PatientHistory;
