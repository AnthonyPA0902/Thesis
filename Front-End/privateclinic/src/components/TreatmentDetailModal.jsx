import React, { useState, useEffect } from 'react';
import '../admin_assets/css/modal.css';

const TreatmentDetailModal = ({ isOpen, onClose, treatmentId }) => {
    const [treatmentDetails, setTreatmentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newDetail, setNewDetail] = useState('');

    useEffect(() => {
        if (treatmentId) {
            fetchTreatmentDetails(treatmentId);
        }
    }, [treatmentId]);

    const fetchTreatmentDetails = (id) => {
        setLoading(true);
        fetch(`https://localhost:7157/api/detail/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setTreatmentDetails(data.treatment);
                } else {
                    console.error("Treatment details not found");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching treatment details:", error);
                setLoading(false);
            });
    };

    const handleAddDetail = () => {
        console.log(newDetail);
        // Send the new detail to the backend via API
        fetch(`https://localhost:7157/api/detail/${treatmentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                details: newDetail,  // Correct the key to match the API model
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setTreatmentDetails((prevState) => ({
                        ...prevState,
                        details: [...prevState.details, { details: newDetail }],
                    }));
                    setNewDetail(''); // Clear input after successful submission
                } else {
                    console.error('Failed to add new detail');
                }
            })
            .catch((error) => {
                console.error('Error adding new treatment detail:', error);
            });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    treatmentDetails && (
                        <div>
                            <h4>Chi Tiết Liệu Trình:</h4>
                            {treatmentDetails.details && treatmentDetails.details.length > 0 ? (
                                treatmentDetails.details.map((detail, index) => (
                                    <div key={index}>
                                        <p style={{ color: 'black', fontWeight: '500', textIndent: '40px' }}>
                                            {detail.details} {/* Adjusted to match the API response */}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: 'red', fontWeight: 'bold'}}>Hiện chưa có chi tiết</p> 
                            )}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Thêm Chi Tiết Liệu Trình"
                                    value={newDetail}
                                    onChange={(e) => setNewDetail(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginBottom: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                        fontSize: '16px',
                                    }}
                                />
                                <button
                                    onClick={handleAddDetail}
                                    style={{
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        padding: '10px 20px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        transition: 'background-color 0.3s',
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                                >
                                    Thêm
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default TreatmentDetailModal;
