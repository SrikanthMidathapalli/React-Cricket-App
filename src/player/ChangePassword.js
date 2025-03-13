import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const UseNavigate=useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/Player?email=${user.email}`);
      const players = response.data;

      if (players.length === 0) {
        setMessage('User not found.');
        return;
      }

      const existingPlayer = players[0];

      if (existingPlayer.password !== oldPassword) {
        setMessage('Old password is incorrect.');
        return;
      }

      await axios.patch(`http://localhost:3000/Player/${existingPlayer.id}`, {
        password: newPassword,
      });

      setMessage('✅ Password changed successfully!');
      UseNavigate('/player');
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('❌ Failed to change password.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="mb-3">
            <label className="form-label">Old Password:</label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password:</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Change Password
          </button>
        </form>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;
