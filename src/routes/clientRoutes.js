import React from 'react'

const Dashboard = React.lazy(() => import('../views/client/dashboard/Dashboard'))
const childRegister = React.lazy(() => import('../views/client/childRegister/childRegister'))
const listHospital = React.lazy(() => import('../views/client/listHospital/listHospital'))
const addHospital = React.lazy(() =>('../views/client/addHospital/addHospital'))
const addVaccine = React.lazy(()=>('../views/client/addVaccine/addVaccine'))
const listVaccine = React.lazy(()=>('../views/client/listVaccine/listVaccine'))
const listChild = React.lazy(() =>('../views/client/listChild/listChild'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/registerChild', name: '', element: childRegister },
  { path: '/listHospital', name: '', element: listHospital},
  { path: '/addHospital', name:'', element: addHospital},
  { path: '/addVaccine', name:'',element:addVaccine},
  { path: '/listVaccine', name:'', element:listVaccine},
  { path: '/listChild', name:'', element: listChild}
]

export default routes
