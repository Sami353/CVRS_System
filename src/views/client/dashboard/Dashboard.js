import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import supabase from '../../../config/supabaseClient'
import WidgetsDropdown from '../../../components/widgets/WidgetsDropdown'

const Dashboard = () => {
  const [children, setChildren] = useState([])
  const [hospitalId, setHospitalId] = useState(null)

  const fetchUserHospitalId = async () => {
    const { data: userResponse, error: userError } = await supabase.auth.getUser()

    if (userError) {
      console.error('Error fetching user:', userError)
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

  const fetchChildren = async () => {
    if (!hospitalId) return

    const { data, error } = await supabase
      .from('children')
      .select(`
        sn,
        child_name,
        guardian_name,
        guardian_no,
        child_age,
        birth_date,
        gender,
        hospital_id,
        hospitals(hospital_name)
      `)
      .eq('hospital_id', hospitalId)
      .order('sn', { ascending: true })

    if (error) {
      console.error('Error fetching children:', error)
    } else {
      setChildren(data)
    }
  }

  const handleDelete = async (sn) => {
    const { error } = await supabase.from('children').delete().eq('sn', sn)

    if (error) {
      console.error('Delete error:', error)
    } else {
      setChildren(children.filter((child) => child.sn !== sn))
    }
  }

  useEffect(() => {
    fetchUserHospitalId()
  }, [])

  useEffect(() => {
    if (hospitalId) {
      fetchChildren()
    }
  }, [hospitalId])

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CRow>
        <CCol xs={12}>
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
                  <CTableHeaderCell>Birth Date</CTableHeaderCell>
                  <CTableHeaderCell>Gender</CTableHeaderCell>
                  <CTableHeaderCell>Hospital</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {children.map((child) => (
                  <CTableRow key={child.sn}>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src="https://via.placeholder.com/150" />
                    </CTableDataCell>
                    <CTableDataCell>{child.child_name}</CTableDataCell>
                    <CTableDataCell>{child.guardian_name}</CTableDataCell>
                    <CTableDataCell>{child.guardian_no}</CTableDataCell>
                    <CTableDataCell>{child.child_age}</CTableDataCell>
                    <CTableDataCell>{child.birth_date}</CTableDataCell>
                    <CTableDataCell>{child.gender}</CTableDataCell>
                    <CTableDataCell>{child.hospitals?.hospital_name || 'N/A'}</CTableDataCell>
                    <CTableDataCell>
                      <CButton size="sm" color="primary" className="me-2">View</CButton>
                      <CButton size="sm" color="danger" onClick={() => handleDelete(child.sn)}>Delete</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
