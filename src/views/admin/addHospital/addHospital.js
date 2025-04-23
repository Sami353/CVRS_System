import React, { useState } from 'react';
import {
    CButton, CCol, CForm, CFormCheck, CFormInput, CRow, CCard, CCardHeader
} from '@coreui/react';
import supabase from '../../../config/supabaseClient';
import { toast } from 'react-toastify';

const AddHospital = () => {
    const [hospitalName, setHospitalName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [vaccinationOpt, setVaccinationOpt] = useState(false);

    const handleSubmit = async (e) => {
        // ✅ Logging before submit
        console.log('Submitting hospital:', {
            hospital_name: hospitalName,
            contact_no: contactNo,
            address,
            vaccination_opt: vaccinationOpt,
        })

        const { error, data } = await supabase.from('hospitals').insert([
            {
                hospital_name: hospitalName,
                contact_no: contactNo,
                address: address,
                vaccination_opt: vaccinationOpt,
            },
        ])

        // ✅ Handle result
        if (error) {
            console.error('Supabase insert error:', error)
            toast.error('Failed to add hospital: ' + error.message)
        } else {
            console.log('Insert successful:', data)
            toast.success('Hospital added successfully!')
            // Reset form
            setHospitalName('')
            setContactNo('')
            setAddress('')
            setVaccinationOpt(false)
        }
    }


    return (
        <CRow>
            <CCol xs>
                <CCard className="mb-4 p-4">
                    <CCardHeader>Add Hospital</CCardHeader>
                    <CForm className="row g-3" onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                label="Hospital Name"
                                value={hospitalName}
                                onChange={(e) => setHospitalName(e.target.value)}
                                required
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                label="Contact Number"
                                value={contactNo}
                                onChange={(e) => setContactNo(e.target.value)}
                                required
                            />
                        </CCol>
                        <CCol xs={12}>
                            <CFormInput
                                label="Address"
                                placeholder="City, Street, etc."
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </CCol>
                        <CCol xs={12}>
                            <CFormCheck
                                type="checkbox"
                                label="Has vaccination facilities?"
                                checked={vaccinationOpt}
                                onChange={(e) => setVaccinationOpt(e.target.checked)}
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
};

export default AddHospital;