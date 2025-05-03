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
  CBadge,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHospital, cilPeople } from '@coreui/icons'
import supabase from '../../../config/supabaseClient'

const ListHospitals = () => {
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState(null)

  // Fetch hospitals from Supabase
  const fetchHospitals = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching hospitals:', error)
    } else {
      setHospitals(data)
    }
    setLoading(false)
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

  const [children, setChildren] = useState([])

  const fetchChildren = async (hospitalId) => {
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('hospital_id', hospitalId) // filter by selected hospital
      .order('sn', { ascending: true })

    if (error) {
      console.error('Error fetching children:', error)
    } else {
      setChildren(data)
    }
  }

  return (
    <>
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
                          onClick={() => {
                            setSelectedHospital(hospital)
                            fetchChildren(hospital.id)
                            setModalOpen(true)
                          }}
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

      {/* Popup Modal */}
      <CModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        size="xl"
        backdrop="static"
        alignment="center"
        scrollable
      >
        <div style={{
          minHeight: '80vh',
          padding: '20px',
          borderRadius: '10px',
          color: 'black',
        }}>
          <CModalHeader>
            <strong>{selectedHospital?.hospital_name || 'Hospital Info'}</strong>
          </CModalHeader>
          <CModalBody>
            <CRow className="text-white">
              <CCol md={6} className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Hospital Name</label>
                <input type="text" className="form-control" value={selectedHospital?.hospital_name || ''} readOnly />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Address</label>
                <input type="text" className="form-control" value={selectedHospital?.address || ''} readOnly />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Contact No.</label>
                <input type="text" className="form-control" value={selectedHospital?.contact_no || ''} readOnly />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Children Registered</label>
                <input type="number" className="form-control" value={selectedHospital?.children_registered || ''} readOnly />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Vaccines in Stock</label>
                <input type="number" className="form-control" value={selectedHospital?.vaccines_in_stock || ''} readOnly />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Vaccination Facility</label>
                <input
                  type="text"
                  className="form-control"
                  value={selectedHospital?.vaccination_opt ? 'Opted' : 'Not Opted'}
                  readOnly
                />
              </CCol>
            </CRow>
            <CRow className="mt-4">
              <CCol xs={12}>
                <h5 className="mb-3" style={{ color: 'black' }}>Children Registered</h5>
                <CCard className="shadow-sm p-3">
                  <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead className="bg-light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">
                          <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell>Child Name</CTableHeaderCell>
                        <CTableHeaderCell>Guardian Name</CTableHeaderCell>
                        <CTableHeaderCell>Guardian No.</CTableHeaderCell>
                        <CTableHeaderCell>Age</CTableHeaderCell>
                        <CTableHeaderCell>Vaccinated</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {children.length > 0 ? (
                        children.map((child) => (
                          <CTableRow key={child.sn}>
                            <CTableDataCell className="text-center">
                              <CAvatar size="md" src="https://via.placeholder.com/150" />
                            </CTableDataCell>
                            <CTableDataCell>{child.child_name}</CTableDataCell>
                            <CTableDataCell>{child.guardian_name}</CTableDataCell>
                            <CTableDataCell>{child.guardian_number}</CTableDataCell>
                            <CTableDataCell>{child.child_age}</CTableDataCell>
                            <CTableDataCell>
                              {Array.isArray(child.vaccinated)
                                ? child.vaccinated.join(', ')
                                : child.vaccinated || 'No'}
                            </CTableDataCell>
                            <CTableDataCell>
                              <CButton size="sm" color="primary" className="me-2">View</CButton>
                              <CButton size="sm" color="danger" onClick={() => handleDelete(child.sn)}>Delete</CButton>
                            </CTableDataCell>
                          </CTableRow>
                        ))
                      ) : (
                        <CTableRow>
                          <CTableDataCell colSpan={7} className="text-center">
                            No children registered.
                          </CTableDataCell>
                        </CTableRow>
                      )}
                    </CTableBody>
                  </CTable>
                </CCard>
              </CCol>
            </CRow>
          </CModalBody>

        </div>
      </CModal>
    </>
  )
}

export default ListHospitals
