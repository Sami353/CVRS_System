import React from 'react'
import {
  CAvatar,
  CModal,
  CModalHeader,
  CModalBody,
  CRow,
  CCol,
  CButton,
  CCard
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

const ChildDetailsModal = ({ visible, onClose, child, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this child?')) {
      onDelete(child.sn)
    }
  }

  return (
    <CModal visible={visible} onClose={onClose} size="xl" backdrop="static" alignment="center" scrollable>
      <CModalHeader>
        <strong>{child?.child_name || 'Child Info'}</strong>
      </CModalHeader>
      <CModalBody>
        <CRow className="text-white">
          <CCol md={6} className="mb-3">
            <label className="form-label text-dark">Child Name</label>
            <input type="text" className="form-control" value={child?.child_name || ''} readOnly />
          </CCol>
          <CCol md={6} className="mb-3">
            <label className="form-label text-dark">Father's Name</label>
            <input type="text" className="form-control" value={child?.father_name || ''} readOnly />
          </CCol>
          <CCol md={6} className="mb-3">
            <label className="form-label text-dark">Mother's Name</label>
            <input type="text" className="form-control" value={child?.mother_name || ''} readOnly />
          </CCol>
          <CCol md={6} className="mb-3">
            <label className="form-label text-dark">Guardian No.</label>
            <input type="text" className="form-control" value={child?.guardian_no || ''} readOnly />
          </CCol>
          <CCol md={6} className="mb-3">
            <label className="form-label text-dark">Date of Birth</label>
            <input type="date" className="form-control" value={child?.date_of_birth || ''} readOnly />
          </CCol>
          <CCol md={6} className="mb-3">
            <label className="form-label text-dark">Gender</label>
            <input type="text" className="form-control" value={child?.gender || ''} readOnly />
          </CCol>
          <CCol md={6} className="mb-3">
            <label className="form-label text-dark">Blood Group</label>
            <input type="text" className="form-control" value={child?.blood_group || ''} readOnly />
          </CCol>
          <CCol md={6} className="mb-3">
            <label className="form-label text-dark">Address</label>
            <input type="text" className="form-control" value={child?.address || ''} readOnly />
          </CCol>
        </CRow>
        <CRow className="mt-4">
          <CCol xs={12}>
            <h5 className="mb-3 text-dark">Additional Details</h5>
            <CCol md={12} className="mb-3">
              <label className="form-label text-dark">Allergies</label>
              <input type="text" className="form-control" value={child?.allergies || ''} readOnly />
            </CCol>
            <CCol md={12} className="mb-3">
              <label className="form-label text-dark">Medical Conditions</label>
              <input type="text" className="form-control" value={child?.medical_conditions || ''} readOnly />
            </CCol>
          </CCol>
        </CRow>
      </CModalBody>
    </CModal>
  )
}

export default ChildDetailsModal
