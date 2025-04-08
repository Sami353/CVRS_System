import React from 'react'

import {
    CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CRow, CCard, CCardHeader
} from '@coreui/react'

const childRegister = () => {

    return (
        <>
            <CRow>
                <CCol xs>
                    <CCard className="mb-4 p-4">
                        <CCardHeader>Add Vaccine</CCardHeader>
                        <CForm className="row g-3">
                            <CCol md={6}>
                                <CFormInput type="text" id="inputName" label="First Name" />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput type="text" id="inputName" label="Last Name" />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput type="text" id="inputName" label="Parent Name" />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput type="password" id="inputPassword4" label="Password" />
                            </CCol>
                            <CCol xs={12}>
                                <CFormInput id="inputAddress" label="Address" placeholder="Kathmandu" />
                            </CCol>
                            <CCol xs={12}>
                                <CFormInput
                                    id="inputAddress2"
                                    label="Address 2"
                                    placeholder="Apartment, studio, or floor"
                                />
                            </CCol>
                            <CCol md={6}>
                                <CFormInput id="inputCity" label="City" />
                            </CCol>
                            <CCol md={4}>
                                <CFormSelect id="inputState" label="State">
                                    <option>Choose...</option>
                                    <option>Bagmati</option>
                                </CFormSelect>
                            </CCol>
                            <CCol md={2}>
                                <CFormInput id="inputZip" label="Zip" />
                            </CCol>
                            <CCol xs={12}>
                                <CFormCheck type="checkbox" id="gridCheck" label="Check me out" />
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
        </>
    )
}

export default childRegister