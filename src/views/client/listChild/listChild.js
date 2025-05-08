import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CCard,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import supabase from '../../../config/supabaseClient'
import ChildDetailsModal from '../ChildDetailsModal/ChildDetailsModal'

const ListChildren = () => {
  const [children, setChildren] = useState([])
  const [hospitalId, setHospitalId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedChild, setSelectedChild] = useState(null)

  const fetchUserHospitalId = async () => {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('Error fetching user:', userError)
      return
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('hospital_id')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Error fetching hospital_id:', profileError)
    } else {
      setHospitalId(profile.hospital_id)
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
    const confirm = window.confirm('Are you sure you want to delete this child?')
    if (!confirm) return

    const { error } = await supabase.from('children').delete().eq('sn', sn)
    if (error) {
      console.error('Delete error:', error)
    } else {
      setChildren(children.filter((child) => child.sn !== sn))
      setModalOpen(false)
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
                      <CButton
                        size="sm"
                        color="danger"
                        onClick={() => handleDelete(child.sn)}
                      >
                        Delete
                      </CButton>
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

export default ListChildren
