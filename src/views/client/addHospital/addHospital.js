import React, {useState} from 'react'

import {
    CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CRow, CCard, CCardHeader, CCardBody
} from '@coreui/react'

const ChildRegister = () => {

    // return (
    //     <>
    //         <CRow>
    //             <CCol xs>
    //                 <CCard className="mb-4 p-4">
    //                     <CCardHeader>Add Hospital</CCardHeader>
    //                     <CForm className="row g-3">
    //                         <CCol md={6}>
    //                             <CFormInput type="text" id="inputName" label="Hospital Name" />
    //                         </CCol>
    //                         <CCol md={6}>
    //                             <CFormInput type="text" id="inputName" label="Address" />
    //                         </CCol>
    //                         <CCol md={6}>
    //                             <CFormInput type="text" id="inputName" label="Parent Name" />
    //                         </CCol>
    //                         {/* <CCol md={6}>
    //                             <CFormInput type="password" id="inputPassword4" label="Password" />
    //                         </CCol> */}
    //                         <CCol xs={12}>
    //                             <CFormInput id="inputAddress" label="Address" placeholder="Kathmandu" />
    //                         </CCol>
    //                         <CCol xs={12}>
    //                             <CFormInput
    //                                 id="inputAddress2"
    //                                 label="Address 2"
    //                                 placeholder="Apartment, studio, or floor"
    //                             />
    //                         </CCol>
    //                         <CCol md={6}>
    //                             <CFormInput id="inputCity" label="City" />
    //                         </CCol>
    //                         <CCol md={4}>
    //                             <CFormSelect id="inputState" label="State">
    //                                 <option>Choose...</option>
    //                                 <option>Bagmati</option>
    //                             </CFormSelect>
    //                         </CCol>
    //                         <CCol md={2}>
    //                             <CFormInput id="inputZip" label="Zip" />
    //                         </CCol>
    //                         <CCol xs={12}>
    //                             <CFormCheck type="checkbox" id="gridCheck" label="Check me out" />
    //                         </CCol>
    //                         <CCol xs={12}>
    //                             <CButton color="primary" type="submit">
    //                                 Submit
    //                             </CButton>
    //                         </CCol>
    //                     </CForm>
    //                 </CCard>
    //             </CCol>
    //         </CRow>
    //     </>
    // )

    const [formData, setFormData] = useState({
        hospitalName: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        agree: false,
      })
    
      const handleChange = (e) => {
        const { id, value, type, checked } = e.target
        setFormData((prevData) => ({
          ...prevData,
          [id]: type === 'checkbox' ? checked : value,
        }))
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault()
    
        try {
          const response = await fetch('http://localhost:5000/api/hospitals', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
    
          const result = await response.json()
          if (response.ok) {
            alert('Hospital added successfully')
            // Optionally reset form:
            setFormData({
              hospitalName: '',
              address: '',
              address2: '',
              city: '',
              state: '',
              zip: '',
              agree: false,
            })
          } else {
            alert(`Error: ${result.message || 'Something went wrong'}`)
          }
        } catch (error) {
          console.error('Error submitting form:', error)
          alert('Network error or server not responding')
        }
      }
    
      return (
        <CRow>
          <CCol xs>
            <CCard className="mb-4 p-4">
              <CCardHeader>Add Hospital</CCardHeader>
              <CCardBody>
                <CForm className="row g-3" onSubmit={handleSubmit}>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="hospitalName"
                      label="Hospital Name"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      type="text"
                      id="address"
                      label="Address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                  <CCol xs={12}>
                    <CFormInput
                      id="address2"
                      label="Address 2"
                      placeholder="Apartment, studio, or floor"
                      value={formData.address2}
                      onChange={handleChange}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      id="city"
                      label="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormSelect id="state" label="State" value={formData.state} onChange={handleChange} required>
                      <option value="">Choose...</option>
                      <option value="Bagmati">Bagmati</option>
                      <option value="Gandaki">Gandaki</option>
                      <option value="Lumbini">Lumbini</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={2}>
                    <CFormInput
                      id="zip"
                      label="Zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                  <CCol xs={12}>
                    <CFormCheck
                      type="checkbox"
                      id="agree"
                      label="I agree to terms"
                      checked={formData.agree}
                      onChange={handleChange}
                    />
                  </CCol>
                  <CCol xs={12}>
                    <CButton color="primary" type="submit">
                      Submit
                    </CButton>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )
}

export default ChildRegister