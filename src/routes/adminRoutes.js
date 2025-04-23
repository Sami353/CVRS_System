import React from 'react'

const Dashboard = React.lazy(() => import('../views/admin/dashboard/Dashboard.js'))
const listHospital = React.lazy(() => import('../views/admin/listHospital/listHospital.js'))
const addHospital = React.lazy(() => import('../views/admin/addHospital/addHospital.js'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/admin/listHospital', name: 'List of Hospitals', element: listHospital},
  { path: '/admin/addHospital', name:'Add Hospital', element: addHospital},
]

export default routes
