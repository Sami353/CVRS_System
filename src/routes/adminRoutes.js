import React from 'react'

const Dashboard = React.lazy(() => import('../views/admin/dashboard/Dashboard'))
const listHospital = React.lazy(() => import('../views/admin/listHospital/listHospital'))
const addHospital = React.lazy(() =>('./views/admin/addHospital/addHospital'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/admin/listHospital', name: 'List of Hospitals', element: listHospital},
  { path: '/admin/addHospital', name:'Add Hospital', element: addHospital},
]

export default routes
