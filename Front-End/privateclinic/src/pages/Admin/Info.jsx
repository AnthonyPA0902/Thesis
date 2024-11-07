import React, { useState, useEffect } from 'react';
import '../../admin_assets/css/info.css';
import decodeToken from '../../components/DecodeToken';


const Info = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        age: '',
        address: '',
        phone: '',
        email: '',
        username: '',
        password: ''
    });
    const [id, setId] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // To toggle between edit and cancel/save
    const [isSaved, setIsSaved] = useState(false); // To track if the data is saved

    // Get the token and decode it (for example, using JWT)
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            // Assuming token contains user_id (decoded from the JWT)
            const decodedToken = decodeToken(token)// Decode JWT token
            const userId = decodedToken.user_id;
            setId(userId);
            console.log(userId);
            // Fetch user info based on the userId
            fetchUserInfo(userId);
        }
    }, []);

    // Function to fetch user data from the API
    const fetchUserInfo = (userId) => {
        fetch(`https://localhost:7157/api/admin/info/${userId}`)
            .then(response => response.json())
            .then(data => {
                // Ensure all values are defined
                setUserInfo({
                    name: data.user.name || '',
                    age: data.user.age || '',
                    address: data.user.address || '',
                    phone: data.user.phone || '',
                    email: data.user.email || '',
                    username: data.user.username || '',
                    password: data.user.password || ''
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    // Function to handle Save action
    const handleSave = () => {
        // Call the API to save the updated user data
        fetch(`https://localhost:7157/api/admin/info/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(response => response.json())
            .then(() => {
                setIsEditing(false);  // Enabled editing after save
            })
            .catch(error => console.error('Error saving user data:', error));
    };

    // Function to handle Cancel action
    const handleCancel = () => {
        fetchUserInfo(id); // Fetch the original data again
        setIsEditing(false);
        setIsSaved(false); // Reset saved state
    };

    // Function to handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    return (
        <div className='info-page'>
            <h1>User Information</h1>
            <div className="info-container">
                <form className='info-form'>
                    <div className="info-form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={userInfo.name}
                            disabled={!isEditing}
                            className='info-input'
                            onChange={handleInputChange}
                        />
                        <label>Age</label>
                        <input
                            type="text"
                            name="age"
                            value={userInfo.age}
                            disabled={!isEditing}
                            className='info-input'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="info-form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={userInfo.address}
                            disabled={!isEditing}
                            className='info-input'
                            onChange={handleInputChange}
                        />
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={userInfo.phone}
                            disabled={!isEditing}
                            className='info-input'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="info-form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            value={userInfo.email}
                            disabled={!isEditing}
                            className='info-input'
                            onChange={handleInputChange}
                        />
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={userInfo.username}
                            disabled={!isEditing}
                            className='info-input'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="info-form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={userInfo.password}
                            disabled={!isEditing}
                            className='info-input'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="info-form-buttons">
                        {isEditing || isSaved ? (
                            <button
                                type="button"
                                className='info-button'
                                onClick={handleCancel}  // Handle cancel action
                            >
                                Cancel
                            </button>
                        ) : (
                            <button
                                type="button"
                                className='info-button'
                                onClick={() => setIsEditing(true)}  // Enable editing
                            >
                                Edit
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleSave}
                            className='info-button'
                            disabled={!isEditing || isSaved}  // Disable save if not editing or already saved
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Info;
