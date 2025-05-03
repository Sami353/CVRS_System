import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'
import supabase from '../../../config/supabaseClient'

const AddVaccine = () => {
  const [hospitalId, setHospitalId] = useState(null)
  const [vaccineId, setVaccineId] = useState('')
  const [stockQuantity, setStockQuantity] = useState('')
  const [vaccines, setVaccines] = useState([])

  // Get hospital_id from logged in user's profile
  const fetchUserHospitalId = async () => {
    const { data: userResponse, error: userError } = await supabase.auth.getUser()
    if (userError) {
      console.error('User fetch error:', userError)
      return
    }

    const user = userResponse?.user
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('hospital_id')
        .eq('id', user.id)
        .single()
      if (error) {
        console.error('Error fetching hospital_id:', error)
      } else {
        setHospitalId(data.hospital_id)
      }
    }
  }

  // Fetch vaccine options
  const fetchVaccines = async () => {
    const { data, error } = await supabase.from('vaccines').select('id, vaccine_code_name')
    if (error) {
      console.error('Error fetching vaccines:', error)
    } else {
      setVaccines(data)
    }
  }

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!vaccineId || !stockQuantity || !hospitalId) {
      alert('Please fill in all fields.')
      return
    }

    const { error } = await supabase.from('vaccine_detail').insert([
      {
        hospital_id: hospitalId,
        vaccine_id: parseInt(vaccineId),
        stock_quantity: parseInt(stockQuantity),
      },
    ])

    if (error) {
      console.error('Insert error:', error)
      alert('Failed to add vaccine')
    } else {
      alert('Vaccine added successfully!')
      setVaccineId('')
      setStockQuantity('')
    }
  }

  useEffect(() => {
    fetchUserHospitalId()
    fetchVaccines()
  }, [])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4 p-4">
          <CCardHeader>Add Vaccine Stock</CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit} className="row g-3">
              <CCol md={6}>
                <CFormSelect
                  id="vaccineSelect"
                  label="Select Vaccine"
                  value={vaccineId}
                  onChange={(e) => setVaccineId(e.target.value)}
                >
                  <option value="">-- Select Vaccine --</option>
                  {vaccines.map((vaccine) => (
                    <option key={vaccine.id} value={vaccine.id}>
                      {vaccine.vaccine_code_name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="number"
                  id="stockQuantity"
                  label="Stock Quantity"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  min={0}
                />
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Add Vaccine
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddVaccine
