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
    name: 'Admin Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Add Hospital',
    to: '/admin/addHospital',
    icon: <CIcon icon={cilChild} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'List of Hospitals',
    to: '/admin/listHospital',
    icon: <CIcon icon={cilHospital} customClassName="nav-icon" />,
  },
]

export default _admin_nav
