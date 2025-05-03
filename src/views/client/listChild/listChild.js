import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CCard,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CCol,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import supabase from '../../../config/supabaseClient'

const ListChildren = () => {
  const [children, setChildren] = useState([])

  const fetchChildren = async () => {
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .order('sn', { ascending: true })

    if (error) {
      console.error('Error fetching children:', error)
    } else {
      setChildren(data)
    }
  }

  const handleDelete = async (sn) => {
    const { error } = await supabase
      .from('children')
      .delete()
      .eq('sn', sn)

    if (error) {
      console.error('Delete error:', error)
    } else {
      setChildren(children.filter(child => child.sn !== sn))
    }
  }

  useEffect(() => {
    fetchChildren()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="shadow-sm p-3">
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="bg-light">
              <CTableRow>
                <CTableHeaderCell className="text-center"><CIcon icon={cilPeople} /></CTableHeaderCell>
                <CTableHeaderCell>Child Name</CTableHeaderCell>
                <CTableHeaderCell>Guardian Name</CTableHeaderCell>
                <CTableHeaderCell>Guardian No.</CTableHeaderCell>
                <CTableHeaderCell>Age</CTableHeaderCell>
                <CTableHeaderCell>Vaccinated</CTableHeaderCell>
                <CTableHeaderCell>Hospital</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {children.map((child) => (
                <CTableRow key={child.sn}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src="https://via.placeholder.com/150" />
                  </CTableDataCell>
                  <CTableDataCell>{child.child_name}</CTableDataCell>
                  <CTableDataCell>{child.guardian_name}</CTableDataCell>
                  <CTableDataCell>{child.guardian_number}</CTableDataCell>
                  <CTableDataCell>{child.child_age}</CTableDataCell>
                  <CTableDataCell>
                    {Array.isArray(child.vaccinated) ? child.vaccinated.join(', ') : (child.vaccinated || 'No')}
                  </CTableDataCell>
                  <CTableDataCell>{child.hospital_name}</CTableDataCell>
                  <CTableDataCell>
                    <CButton size="sm" color="primary" className="me-2">View</CButton>
                    <CButton size="sm" color="danger" onClick={() => handleDelete(child.sn)}>Delete</CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListChildren
