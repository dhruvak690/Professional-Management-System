import React,{useEffect, useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';


const EmployeeComponent = () => {

  const [firstname,setFirstName] = useState('');
  const [lastname,setLastName] = useState('');
  const [email,setemail] = useState('');

  const navigator = useNavigate();

  const {id} = useParams();

  const [errors,setErrors] = useState({
    firstname:'',
    lastname:'',
    email:''
  })

  useEffect(()=>{
    if (id) {
      getEmployee(id).then((response) =>{
        setFirstName(response.data.firstname);
        setLastName(response.data.lastname);
        setemail(response.data.email);
      }).catch((error)=>{
        console.error(error);
      })
    }
  },[id]);

  
  const saveorUpdateEmployee = (e) =>
  {
    e.preventDefault();
    
    if(validateForm())
    {
      const employee = {firstname,lastname,email}
      console.log(employee)

      if (id) {
        updateEmployee(id,employee).then((response)=>{
          console.log(response.data);
          navigator('/employees')
        }).catch((error)=>{
          console.error(error);
        })
      }else{
        createEmployee(employee).then((response)=>{
          console.log(response.data);
          navigator('/employees')
          
         }).catch((error)=>{
          console.error(error);
         })
      }
      

     

    }

  }

    const backToHome = () =>{
      navigator('/employees')
    }

    const validateForm = () =>{
    let valid = true
    const errorsCopy = {... errors}

    if(firstname.trim()) {
        errorsCopy.firstname = '';
    }else{
      errorsCopy.firstname = 'first name is required';
      valid = false
    }

    if(lastname.trim()) {
      errorsCopy.lastname = '';
     }else{
      errorsCopy.lastname = 'last name is required';
      valid = false
    }

    if (email.trim()) {
      errorsCopy.email = '';
    }else{
       errorsCopy.email = 'email is required';
       valid = false
    }

      setErrors(errorsCopy);

      return valid;

    }

    const pageTitle = () =>{
      if(id){
        return <h3 className='text-center'>Update Employee</h3>
      }else{
        return <h3 className='text-center'>Add Employee</h3>
      }
    }
  

  return (
    <div>
      <br/><br/>
      <div className='row'>
        
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          {
            pageTitle()
          }
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'>First Name</label>
                <input
                 value={firstname}
                  type='text' 
                  className={`form-control ${errors.firstname ? 'is-invalid':''}`}
                  name='firstname'
                  placeholder='Enter First name'
                  onChange={(e)=>setFirstName(e.target.value)}
                    >

                 </input>
                 {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Last Name</label>
                <input
                 value={lastname}
                  type='text' 
                  className={`form-control ${errors.lastname ? 'is-invalid':''}`}
                  name='firstname'
                  placeholder='Enter First name'
                  onChange={(e)=>setLastName(e.target.value)}
                    >

                 </input>
                 {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
              </div>

              
              <div className='form-group mb-2'>
                <label className='form-label'>Email</label>
                <input
                 value={email}
                  type='password' 
                  className={`form-control ${errors.email ? 'is-invalid':''}`}
                  name='email'
                  placeholder='Enter email'
                  onChange={(e)=>setemail(e.target.value)}
                    >

                 </input>
                 {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>
              <button className='btn btn-success mx-2' type='submit' onClick={saveorUpdateEmployee}>Submit</button>
              <button className='btn btn-warning mx-2'onClick={backToHome} >Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent
