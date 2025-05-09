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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHospital } from '@coreui/icons'
import supabase from '../../../config/supabaseClient'
import HospitalDetailsModal from '../HospitalDetailsModal/HospitalDetailsModal'

const ListHospitals = () => {
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState(null)
  const [children, setChildren] = useState([])

  const fetchHospitals = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('hospital_summary') // fetch from view
      .select('*')
      .order('hospital_name', { ascending: true })

    if (error) {
      console.error('Error fetching hospital summary:', error)
    } else {
      setHospitals(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this hospital?')
    if (!confirm) return

    const { error } = await supabase.from('hospitals').delete().eq('id', id)
    if (error) {
      console.error('Error deleting hospital:', error)
    } else {
      setHospitals(hospitals.filter((h) => h.id !== id))
    }
  }

  const fetchChildren = async (hospitalId) => {
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('hospital_id', hospitalId)
      .order('sn', { ascending: true })

    if (error) {
      console.error('Error fetching children:', error)
    } else {
      setChildren(data)
    }
  }

  const handleDeleteChild = async (childId) => {
    const confirm = window.confirm('Are you sure you want to delete this child?')
    if (!confirm) return

    const { error } = await supabase.from('children').delete().eq('sn', childId)

    if (error) {
      console.error('Error deleting child:', error)
    } else {
      setChildren(children.filter((child) => child.sn !== childId))
    }
  }

  useEffect(() => {
    fetchHospitals()
  }, [])

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
                  {hospitals.map((hospital) => (
                    <CTableRow key={hospital.id}>
                      <CTableDataCell className="text-center">
                        <CAvatar
                          size="md"
                          src="https://via.placeholder.com/150"
                          status={hospital.vaccination_facility ? 'success' : 'danger'}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{hospital.hospital_name}</CTableDataCell>
                      <CTableDataCell>{hospital.address}</CTableDataCell>
                      <CTableDataCell>{hospital.contact_no}</CTableDataCell>
                      <CTableDataCell>{hospital.children_registered}</CTableDataCell>
                      <CTableDataCell>{hospital.vaccines_in_stock}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge color={hospital.vaccination_facility ? 'success' : 'danger'}>
                          {hospital.vaccination_facility ? 'Opted' : 'Not Opted'}
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

      {/* Reusable Modal */}
      <HospitalDetailsModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        hospital={selectedHospital}
        childrenList={children}
        onDeleteChild={handleDeleteChild}
      />
    </>
  )
}

export default ListHospitals
