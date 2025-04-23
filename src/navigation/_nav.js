import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilHospital ,cilChild, cilChildFriendly } from '@coreui/icons';
import {
  cilDescription,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Child Register',
    to: '/registerChild',
    icon: <CIcon icon={cilChild} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'List of Childs',
    to: '/listChild',
    icon: <CIcon icon={cilChildFriendly} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'List of Hospitals',
    to: '/listHospital',
    icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
  },
]

export default _nav
