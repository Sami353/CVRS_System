import React, { useState, useEffect } from 'react'
import {
  CAvatar,
  CCard,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CRow,
  CCol,
  CSpinner,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHospital } from '@coreui/icons'
import supabase from '../../../config/supabaseClient'

const ListHospitals = () => {
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch hospitals from Supabase
  const fetchHospitals = async () => {
    setLoading(true);  // Show loading spinner
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .order('created_at', { ascending: false });
  
    if (error) {
      console.error('Error fetching hospitals:', error);  // Check for any errors
    } else {
      console.log('Fetched data:', data);  // Log fetched data
      setHospitals(data);
    }
    setLoading(false);  // Hide loading spinner
  }
 

  // Handle hospital delete
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this hospital?')
    if (!confirm) return

    const { error } = await supabase
      .from('hospitals')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting hospital:', error)
    } else {
      setHospitals(hospitals.filter(h => h.id !== id))
    }
  }

  useEffect(() => {
    fetchHospitals()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="shadow">
          <CCardHeader className="fw-bold fs-5">List of Hospitals</CCardHeader>
          {loading ? (
            <div className="text-center p-4">
              <CSpinner color="primary" />
            </div>
          ) : (
            <CTable align="middle" hover responsive className="mb-0">
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilHospital} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Hospital Name</CTableHeaderCell>
                  <CTableHeaderCell>Address</CTableHeaderCell>
                  <CTableHeaderCell>Contact No.</CTableHeaderCell>
                  <CTableHeaderCell>Children Registered</CTableHeaderCell>
                  <CTableHeaderCell>Vaccines in Stock</CTableHeaderCell>
                  <CTableHeaderCell>Vaccination Facility</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {hospitals.map(hospital => (
                  <CTableRow key={hospital.id}>
                    <CTableDataCell className="text-center">
                      <CAvatar
                        size="md"
                        src="https://via.placeholder.com/150"
                        status={hospital.vaccination_opt ? 'success' : 'danger'}
                      />
                    </CTableDataCell>
                    <CTableDataCell>{hospital.hospital_name}</CTableDataCell>
                    <CTableDataCell>{hospital.address}</CTableDataCell>
                    <CTableDataCell>{hospital.contact_no}</CTableDataCell>
                    <CTableDataCell>{hospital.children_registered}</CTableDataCell>
                    <CTableDataCell>{hospital.vaccines_in_stock}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={hospital.vaccination_opt ? 'success' : 'danger'}>
                        {hospital.vaccination_opt ? 'Opted' : 'Not Opted'}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        size="sm"
                        className="me-2"
                        onClick={() => alert(`Viewing ${hospital.hospital_name}`)}
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
          )}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListHospitals
