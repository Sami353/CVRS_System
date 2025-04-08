import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilHospital ,cilChild } from '@coreui/icons';
import {
  cilDescription,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _admin_nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Add Hospital',
    to: '/addHospital',
    icon: <CIcon icon={cilChild} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'List of Hospitals',
    to: '/listHospital',
    icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
  },
]

export default _admin_nav
