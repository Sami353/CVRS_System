import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CRow,
  CCol,
  CWidgetStatsA,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownItem,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'
import { getStyle } from '@coreui/utils'
import supabase from '../../config/supabaseClient'

const WidgetsDropdown = (props) => {
  const [stats, setStats] = useState({
    children: 0,
    hospitals: 0,
    vaccines: 0,
  })

  const fetchCounts = async () => {
    const childCount = await supabase.from('children').select('sn', { count: 'exact', head: true })
    const hospitalCount = await supabase.from('hospitals').select('id', { count: 'exact', head: true })
    const vaccineCount = await supabase.from('vaccines_details').select('sn', { count: 'exact', head: true })

    setStats({
      children: childCount.count || 0,
      hospitals: hospitalCount.count || 0,
      vaccines: vaccineCount.count || 0,
    })
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  const baseChartOptions = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      line: { borderWidth: 2, tension: 0.4 },
      point: { radius: 0 },
    },
  }

  const chartData = [40, 60, 80, 100, 120, 140, 160] // Dummy growth chart

  return (
    <CRow className={props.className}>
      <CCol sm={6} xl={4}>
        <CWidgetStatsA
          color="primary"
          value={`${stats.children}`}
          title="Total Registered Children"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>View All</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: chartData.map((_, i) => `Month ${i + 1}`),
                datasets: [
                  {
                    label: 'Children Growth',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: chartData,
                  },
                ],
              }}
              options={baseChartOptions}
            />
          }
        />
      </CCol>

      <CCol sm={6} xl={4}>
        <CWidgetStatsA
          color="info"
          value={`${stats.hospitals}`}
          title="Total Registered Hospitals"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>View All</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: chartData.map((_, i) => `Month ${i + 1}`),
                datasets: [
                  {
                    label: 'Hospital Growth',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: chartData,
                  },
                ],
              }}
              options={baseChartOptions}
            />
          }
        />
      </CCol>

      <CCol sm={6} xl={4}>
        <CWidgetStatsA
          color="success"
          value={`${stats.vaccines}`}
          title="Total Vaccines Available"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                <CIcon icon={cilOptions} />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>View All</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: chartData.map((_, i) => `Month ${i + 1}`),
                datasets: [
                  {
                    label: 'Vaccine Growth',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-success'),
                    data: chartData,
                  },
                ],
              }}
              options={baseChartOptions}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
}

export default WidgetsDropdown
