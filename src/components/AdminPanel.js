import React from 'react';

export default function AdminPanel({ onLogout }) {
  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Admins can accept/deny dates and manage shop items.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
