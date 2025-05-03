import React, { useEffect, useState } from 'react'
import {
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

const ListVaccines = () => {
  const [vaccines, setVaccines] = useState([])

  const fetchVaccines = async () => {
    const { data, error } = await supabase
      .from('vaccines')
      .select('*')
      .order('sn', { ascending: true })

    if (error) {
      console.error('Error fetching vaccines:', error)
    } else {
      setVaccines(data)
    }
  }

  const handleDelete = async (sn) => {
    const { error } = await supabase
      .from('vaccines_details')
      .delete()
      .eq('sn', sn)

    if (error) {
      console.error('Delete error:', error)
    } else {
      setVaccines(vaccines.filter(v => v.sn !== sn))
    }
  }

  useEffect(() => {
    fetchVaccines()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="shadow-sm p-3">
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="bg-light">
              <CTableRow>
                <CTableHeaderCell className="text-center"><CIcon icon={cilPeople} /></CTableHeaderCell>
                <CTableHeaderCell>Vaccine / Immunizing Agent</CTableHeaderCell>
                <CTableHeaderCell>Code Name</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {vaccines.map((vaccine) => (
                <CTableRow key={vaccine.sn}>
                  <CTableDataCell className="text-center">
                    {vaccine.sn}
                  </CTableDataCell>
                  <CTableDataCell>{vaccine.vaccine_and_other_immunizing_agents}</CTableDataCell>
                  <CTableDataCell>{vaccine.vaccine_code_name}</CTableDataCell>
                  <CTableDataCell>
                    <CButton size="sm" color="primary" className="me-2">View</CButton>
                    <CButton size="sm" color="danger" onClick={() => handleDelete(vaccine.sn)}>Delete</CButton>
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

export default ListVaccines
