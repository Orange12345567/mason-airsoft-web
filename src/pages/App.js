import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import Shop from '../components/Shop';
import AdminPanel from '../components/AdminPanel';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      {isAdmin ? (
        <AdminPanel onLogout={() => setIsAdmin(false)} />
      ) : (
        <>
          <button onClick={() => {
            const pass = prompt("Enter admin password:");
            if (pass === "Charcoal11!") setIsAdmin(true);
          }}>Admin Login</button>
          <p onClick={() => setIsAdmin(false)}>Not an admin? Click here!</p>
          <Calendar />
          <Shop />
        </>
      )}
    </div>
  );
}
