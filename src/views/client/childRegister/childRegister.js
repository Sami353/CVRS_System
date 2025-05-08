import React, { useState, useEffect } from 'react'
import {
  CButton, CCol, CForm, CFormInput, CRow, CCard, CCardHeader, CFormSelect
} from '@coreui/react'
import supabase from '../../../config/supabaseClient'
import { toast } from 'react-toastify'

const ChildRegister = () => {
  const [childName, setChildName] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [motherName, setMotherName] = useState('')
  const [guardianNo, setGuardianNo] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [address, setAddress] = useState('')
  const [allergies, setAllergies] = useState('')
  const [medicalConditions, setMedicalConditions] = useState('')
  const [hospitalId, setHospitalId] = useState('')

  useEffect(() => {
    const fetchUserHospitalId = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError || !userData?.user) {
        console.error('Error fetching user:', userError)
        toast.error('No user logged in or failed to fetch user.')
        return
      }

      const userId = userData.user.id
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

  const handleSubmit = async () => {
    if (!hospitalId) {
      toast.error('Hospital ID is missing. Cannot register child.')
      return
    }

    const { error } = await supabase.from('children').insert([
      {
        child_name: childName,
        father_name: fatherName,
        mother_name: motherName,
        guardian_no: guardianNo,
        date_of_birth: dateOfBirth,
        gender,
        blood_group: bloodGroup,
        address,
        allergies,
        medical_conditions: medicalConditions,
        hospital_id: hospitalId,
      },
    ])

    if (error) {
      console.error('Insert error:', error)
      toast.error('Error registering child: ' + error.message)
    } else {
      toast.success('Child registered successfully!')
      setChildName('')
      setFatherName('')
      setMotherName('')
      setGuardianNo('')
      setDateOfBirth('')
      setGender('')
      setBloodGroup('')
      setAddress('')
      setAllergies('')
      setMedicalConditions('')
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
                label="Father's Name"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Mother's Name"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
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
                type="date"
                label="Date of Birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
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
            <CCol md={6}>
              <CFormSelect
                label="Blood Group"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
              >
                <option value="">-- Select Blood Group --</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Medical Conditions"
                value={medicalConditions}
                onChange={(e) => setMedicalConditions(e.target.value)}
              />
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
