import React, { useEffect, useState } from 'react'
import {
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
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import supabase from '../../../config/supabaseClient'

const ListVaccines = () => {
  const [vaccines, setVaccines] = useState([])
  const [hospitalId, setHospitalId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [editableStock, setEditableStock] = useState(null)

  const fetchHospitalId = async () => {
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

  const fetchVaccines = async (hospital_id) => {
    const { data, error } = await supabase
      .from('vaccine_detail')
      .select(`
        id,
        stock_quantity,
        vaccines (
          id,
          vaccine_code_name,
          vaccine_and_other_immunizing_agents
        )
      `)
      .eq('hospital_id', hospital_id)

    if (error) {
      console.error('Error fetching vaccines:', error)
    } else {
      setVaccines(data)
    }
  }

  const updateStockInDb = async (id, newStock) => {
    const { error } = await supabase
      .from('vaccine_detail')
      .update({ stock_quantity: newStock })
      .eq('id', id)

    if (error) {
      console.error('Error updating stock in DB:', error)
      alert('Failed to update stock. Please try again.')
    } else {
      alert('Stock updated successfully!')
    }
  }

  const handleStockChange = (id, event) => {
    const newStock = Math.max(0, event.target.value) // Ensure stock is not negative
    setVaccines((prev) => {
      const updatedVaccines = prev.map((v) =>
        v.id === id ? { ...v, stock_quantity: newStock } : v
      )
      return updatedVaccines
    })
    setEditableStock(id) // Mark the vaccine as being edited
  }

  const handleBlur = (id) => {
    const updatedVaccine = vaccines.find((v) => v.id === id)
    const newStock = updatedVaccine.stock_quantity
    updateStockInDb(id, newStock)
    setEditableStock(null) // Reset editable state
  }

  const handleKeyPress = (event, id) => {
    if (event.key === 'Enter') {
      const updatedVaccine = vaccines.find((v) => v.id === id)
      const newStock = updatedVaccine.stock_quantity
      updateStockInDb(id, newStock)
      setEditableStock(null) // Reset editable state
    }
  }

  useEffect(() => {
    fetchHospitalId()
  }, [])

  useEffect(() => {
    if (hospitalId) {
      fetchVaccines(hospitalId)
    }
  }, [hospitalId])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="shadow-sm p-3">
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="bg-light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>Vaccine Name</CTableHeaderCell>
                <CTableHeaderCell>Code Name</CTableHeaderCell>
                <CTableHeaderCell>Stock</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {vaccines.map((vaccine) => (
                <CTableRow key={vaccine.id}>
                  <CTableDataCell className="text-center">{vaccine.id}</CTableDataCell>
                  <CTableDataCell>
                    {vaccine.vaccines?.vaccine_and_other_immunizing_agents || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{vaccine.vaccines?.vaccine_code_name || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {editableStock === vaccine.id ? (
                      <CFormInput
                        type="number"
                        value={vaccine.stock_quantity}
                        onChange={(e) => handleStockChange(vaccine.id, e)}
                        onBlur={() => handleBlur(vaccine.id)}
                        onKeyPress={(e) => handleKeyPress(e, vaccine.id)}
                        min={0}
                      />
                    ) : (
                      <>
                        <span>{vaccine.stock_quantity}</span>
                        <CButton
                          size="sm"
                          onClick={() => setEditableStock(vaccine.id)}
                          className="ms-2"
                        >
                          Edit
                        </CButton>
                      </>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListVaccines
