import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CRow } from '@coreui/react'
import { toast } from 'react-toastify'
import supabase  from '../../config/supabaseClient' // Ensure this is correct

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email')
      return
    }

    try {
      // Use the correct Supabase method for resetting the password
      const { error } = await supabase.auth.resetPasswordForEmail(email)

      if (error) {
        toast.error('Error: ' + error.message)
      } else {
        toast.success('Password reset email sent. Please check your inbox.')
      }
    } catch (error) {
      toast.error('Error: ' + error.message)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Forgot Password</h1>
                  <p className="text-body-secondary">Enter your email to reset your password</p>

                  <CFormInput
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="d-grid mt-4">
                    <CButton color="primary" type="submit">
                      Send Reset Email
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPassword
