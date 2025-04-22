
// import React, { useState } from 'react'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser } from '@coreui/icons'
// import { registerUser } from '../../auth/register'

// const Register = () => {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   })

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleRegister = async (e) => {
//     e.preventDefault()

//     if (form.password !== form.confirmPassword) {
//       alert('Passwords do not match!')
//       return
//     }

//     const { data, error } = await registerUser(
//       form.email,
//       form.password,
//       form.username
//     );
    
//     if (error) {
//       alert('Error: ' + error.message)
//     } else {
//       alert('Registration successful! Please check your email to confirm.')
//       console.log(data)
//     }
//   }

//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={9} lg={7} xl={6}>
//             <CCard className="mx-4">
//               <CCardBody className="p-4">
//                 <CForm onSubmit={handleRegister}>
//                   <h1>Register</h1>
//                   <p className="text-body-secondary">Create your account</p>

//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilUser} />
//                     </CInputGroupText>
//                     <CFormInput
//                       placeholder="Username"
//                       autoComplete="username"
//                       name="username"
//                       value={form.username}
//                       onChange={handleChange}
//                     />
//                   </CInputGroup>

//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>@</CInputGroupText>
//                     <CFormInput
//                       placeholder="Email"
//                       autoComplete="email"
//                       name="email"
//                       value={form.email}
//                       onChange={handleChange}
//                     />
//                   </CInputGroup>

//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Password"
//                       autoComplete="new-password"
//                       name="password"
//                       value={form.password}
//                       onChange={handleChange}
//                     />
//                   </CInputGroup>

//                   <CInputGroup className="mb-4">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Repeat password"
//                       autoComplete="new-password"
//                       name="confirmPassword"
//                       value={form.confirmPassword}
//                       onChange={handleChange}
//                     />
//                   </CInputGroup>

//                   <div className="d-grid">
//                     <CButton color="success" type="submit">
//                       Create Account
//                     </CButton>
//                   </div>
//                 </CForm>
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }

// export default Register
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { registerUser } from '../../auth/register'
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      toast.error('All fields are required!'); 
      return false;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match!'); 
      return false;
    }
    return true;
  }

  // const handleRegister = async (e) => {
  //   e.preventDefault()

  //   // Run validation
  //   if (!validateForm()) {
  //     return;  
  //   }

  //   const { data, error } = await registerUser(
  //     form.email,
  //     form.password,
  //     form.username
  //   );
    
  //   if (error) {
  //     toast.error('Error: ' + error.message) 
  //   } else {
  //     toast.success('Registration successful! Please check your email to confirm.')  // 👈 Success toast
  //     console.log(data)
  //   }
  // }

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const { data, error } = await registerUser(
      form.email,
      form.password,
      form.username,
      'user'
    );
  
    if (error) {
      toast.error('Error: ' + error.message);
    } else {
      toast.success('Registration successful! Please check your email to confirm.');
      console.log(data);
    }
  };
  

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegister}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

export default Register
