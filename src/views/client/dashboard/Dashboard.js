import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CButton,
  CCard,
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
import ChildDetailsModal from '../ChildDetailsModal/ChildDetailsModal'

const Dashboard = () => {
  const [children, setChildren] = useState([])
  const [hospitalId, setHospitalId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedChild, setSelectedChild] = useState(null)

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
      .select('*')
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
                  <CTableHeaderCell>Guardian No.</CTableHeaderCell>
                  <CTableHeaderCell>Date of Birth</CTableHeaderCell>
                  <CTableHeaderCell>Gender</CTableHeaderCell>
                  <CTableHeaderCell>Blood Group</CTableHeaderCell>
                  <CTableHeaderCell>Address</CTableHeaderCell>
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
                    <CTableDataCell>{child.guardian_no}</CTableDataCell>
                    <CTableDataCell>{child.date_of_birth}</CTableDataCell>
                    <CTableDataCell>{child.gender}</CTableDataCell>
                    <CTableDataCell>{child.blood_group}</CTableDataCell>
                    <CTableDataCell>{child.address}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        size="sm"
                        color="info"
                        className="me-2"
                        onClick={() => {
                          setSelectedChild(child)
                          setModalOpen(true)
                        }}
                      >
                        View
                      </CButton>
                      <CButton size="sm" color="danger" onClick={() => handleDelete(child.sn)}>Delete</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCard>
        </CCol>
      </CRow>

      <ChildDetailsModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        child={selectedChild}
        onDelete={handleDelete}
      />
    </>
  )
}

export default Dashboard
