import React from 'react'

const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'))
const childRegister = React.lazy(() => import('./components/childRegister/childRegister'))
const listHospital = React.lazy(() => import('./components/listHospital/listHospital'))
const addHospital = React.lazy(() =>('./components/addHospital/addHospital'))
const addVaccine = React.lazy(()=>('./components/addVaccine/addVaccine'))
const listVaccine = React.lazy(()=>('./components/listVaccine'))
const listChild = React.lazy(() =>('./components/listChild'))

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
