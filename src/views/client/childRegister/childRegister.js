import React, { useState } from 'react'
import {
  CButton, CCol, CForm, CFormInput, CRow, CCard, CCardHeader
} from '@coreui/react'
import supabase from '../../../config/supabaseClient'
import { toast } from 'react-toastify'

const ChildRegister = () => {
  const [childName, setChildName] = useState('')
  const [guardianName, setGuardianName] = useState('')
  const [guardianNo, setGuardianNo] = useState('')
  const [childAge, setChildAge] = useState('')
  const [vaccinated, setVaccinated] = useState('')
  const [hospitalName, setHospitalName] = useState('')

  const handleSubmit = async () => {
    const { data, error } = await supabase.from('children').insert([
      {
        child_name: childName,
        guardian_name: guardianName,
        guardian_no: guardianNo,
        child_age: childAge,
        vaccinated,
        hospital_name: hospitalName,
      },
    ])

    if (error) {
      console.error('Insert error:', error)
      toast.error('Error registering child: ' + error.message)
    } else {
      toast.success('Child registered successfully!')
      setChildName('')
      setGuardianName('')
      setGuardianNo('')
      setChildAge('')
      setVaccinated('')
      setHospitalName('')
    }
  }

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4 p-4">
          <CCardHeader>Child Registration</CCardHeader>
          <CForm className="row g-3" onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}>
            <CCol md={6}>
              <CFormInput type="text" label="Child Name" value={childName} onChange={(e) => setChildName(e.target.value)} required />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" label="Guardian Name" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} required />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" label="Guardian Contact No" value={guardianNo} onChange={(e) => setGuardianNo(e.target.value)} required />
            </CCol>
            <CCol md={6}>
              <CFormInput type="number" label="Child Age" value={childAge} onChange={(e) => setChildAge(e.target.value)} required />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" label="Vaccinated (Vaccine Names)" value={vaccinated} onChange={(e) => setVaccinated(e.target.value)} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" label="Hospital Name" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} required />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">
                Submit
              </CButton>
            </CCol>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ChildRegister
