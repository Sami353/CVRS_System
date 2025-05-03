import React from 'react'
import {
    CAvatar,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CRow,
    CCol,
    CButton,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CCard
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

const HospitalDetailsModal = ({ visible, onClose, hospital, childrenList = [], onDeleteChild }) => {

    // Handle delete
    const handleDelete = (childId) => {
        if (window.confirm('Are you sure you want to delete this child?')) {
            onDeleteChild(childId); // Call parent function to delete the child
        }
    }

    return (
        <CModal visible={visible} onClose={onClose} size="xl" backdrop="static" alignment="center" scrollable>
            <CModalHeader>
                <strong>{hospital?.hospital_name || 'Hospital Info'}</strong>
            </CModalHeader>
            <CModalBody>
            <CRow className="text-white">
              <CCol md={6} className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Hospital Name</label>
                <input type="text" className="form-control" value={hospital?.hospital_name || ''} readOnly />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Address</label>
                <input type="text" className="form-control" value={hospital?.address || ''} readOnly />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Contact No.</label>
                <input type="text" className="form-control" value={hospital?.contact_no || ''} readOnly />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Children Registered</label>
                <input type="number" className="form-control" value={hospital?.children_registered || ''} readOnly />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Vaccines in Stock</label>
                <input type="number" className="form-control" value={hospital?.vaccines_in_stock || ''} readOnly />
              </CCol>
              <CCol md={6} className="mb-3">
                <label className="form-label" style={{ color: 'black' }}>Vaccination Facility</label>
                <input
                  type="text"
                  className="form-control"
                  value={hospital?.vaccination_opt ? 'Opted' : 'Not Opted'}
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
                      {childrenList.length > 0 ? (
                        childrenList.map((child) => (
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
        </CModal>
    )
}

export default HospitalDetailsModal
