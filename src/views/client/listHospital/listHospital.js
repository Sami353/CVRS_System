import React, { useState, useEffect } from 'react'
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
  CRow,
  CCol
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHospital } from '@coreui/icons'
import supabase from '../../../config/supabaseClient'

const ListHospitals = () => {
  const [hospitals, setHospitals] = useState([])

  // Fetch hospitals data from Supabase
  const fetchHospitals = async () => {
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching hospitals:', error)
    } else {
      setHospitals(data)
    }
  }

  // Handle delete operation
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('hospitals')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting hospital:', error)
    } else {
      // Remove the deleted hospital from state
      setHospitals(hospitals.filter(hospital => hospital.id !== id))
    }
  }

  useEffect(() => {
    fetchHospitals() // Fetch hospitals data when component mounts
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="shadow-lg">
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap bg-light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilHospital} size="xl" />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Hospital Name</CTableHeaderCell>
                  <CTableHeaderCell>Address</CTableHeaderCell>
                  <CTableHeaderCell>Contact No.</CTableHeaderCell>
                  <CTableHeaderCell>No. of Children Registered</CTableHeaderCell>
                  <CTableHeaderCell>Vaccines in Stock</CTableHeaderCell>
                  <CTableHeaderCell>Vaccination Status</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {hospitals.map((hospital, index) => (
                  <CTableRow key={hospital.id}>
                    <CTableDataCell className="text-center">
                      <CAvatar
                        size="md"
                        src={hospital.avatar || 'https://via.placeholder.com/150'}
                        status={hospital.vaccination_opt ? 'success' : 'danger'}
                      />
                    </CTableDataCell>
                      <CTableDataCell>{hospital.hospital_name}</CTableDataCell>
                      <CTableDataCell>{hospital.address}</CTableDataCell>
                      <CTableDataCell>{hospital.contact_no}</CTableDataCell>
                      <CTableDataCell>{hospital.children_registered}</CTableDataCell>
                      <CTableDataCell>{hospital.vaccines_in_stock}</CTableDataCell>
                      <CTableDataCell>{hospital.vaccination_opt ? 'Opted' : 'Not Opted'}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => alert(`View details for ${hospital.hospital_name}`)}
                      >
                        View
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(hospital.id)}
                      >
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ListHospitals
