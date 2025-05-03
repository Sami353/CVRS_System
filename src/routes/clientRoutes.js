import React from 'react'

const Dashboard = React.lazy(() => import('../views/client/dashboard/Dashboard.js'))
const childRegister = React.lazy(() => import('../views/client/childRegister/childRegister.js'))
const addVaccine = React.lazy(()=> import('../views/client/addVaccine/addVaccine.js'))
const listVaccine = React.lazy(()=> import('../views/client/listVaccine/listVaccine.js'))
const listChild = React.lazy(() => import('../views/client/listChild/listChild.js'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/registerChild', name: '', element: childRegister },
  { path: '/addVaccine', name:'',element:addVaccine},
  { path: '/listVaccine', name:'', element:listVaccine},
  { path: '/listChild', name:'', element: listChild}
]

export default routes
