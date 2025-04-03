import React, { useState } from 'react'
import AdminLogin from './AdminLogin';

const AdminLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState('true');
  return (
    isLoggedIn ? <AdminLayout/> : <AdminLogin/>
  )
}

export default AdminLayout
