import React, { useState, useEffect } from 'react'
import {
  CButton, CCol, CForm, CFormInput, CRow, CCard, CCardHeader, CFormSelect
} from '@coreui/react'
import supabase from '../../../config/supabaseClient'
import { toast } from 'react-toastify'

const ChildRegister = () => {
  const [childName, setChildName] = useState('')
  const [guardianName, setGuardianName] = useState('')
  const [guardianNo, setGuardianNo] = useState('')
  const [childAge, setChildAge] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')
  const [hospitalId, setHospitalId] = useState('')

  // Fetch user's hospital ID from their profile
  useEffect(() => {
    const fetchUserHospitalId = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData?.user) {
        console.error('Error fetching user:', userError)
        toast.error('No user logged in or failed to fetch user.')
        return
      }

      const userId = userData.user.id
      console.log('User ID:', userId)

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('hospital_id')
        .eq('id', userId)
        .single()

      if (profileError || !profile) {
        console.error('Error fetching profile:', profileError)
        toast.error('User profile not found or missing hospital ID.')
        return
      }

      setHospitalId(profile.hospital_id)
    }

    fetchUserHospitalId()
  }, [])

  // Form submission
  const handleSubmit = async () => {
    if (!hospitalId) {
      toast.error('Hospital ID is missing. Cannot register child.')
      return
    }

    const { error } = await supabase.from('children').insert([
      {
        child_name: childName,
        guardian_name: guardianName,
        guardian_no: guardianNo,
        child_age: Number(childAge),
        birth_date: birthDate,
        gender,
        hospital_id: hospitalId,
      },
    ])

    if (error) {
      console.error('Insert error:', error)
      toast.error('Error registering child: ' + error.message)
    } else {
      toast.success('Child registered successfully!')
      // Reset fields
      setChildName('')
      setGuardianName('')
      setGuardianNo('')
      setChildAge('')
      setBirthDate('')
      setGender('')
    }
  }

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4 p-4">
          <CCardHeader>Child Registration</CCardHeader>
          <CForm
            className="row g-3"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Child Name"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Guardian Name"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Guardian Contact No"
                value={guardianNo}
                onChange={(e) => setGuardianNo(e.target.value)}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                label="Child Age"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="date"
                label="Birth Date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </CFormSelect>
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
