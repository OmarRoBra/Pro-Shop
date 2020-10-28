
import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import{Form,Button, Col,Row} from 'react-bootstrap'
import {useDispatch,useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import Forms from '../components/Items/Forms'
import {update,userDetails} from '../actions/userActions'
function ProfileScreen({location,history}) {
   
 
     const dispatch = useDispatch();
     const userData=useSelector(state => state.userDetail)
     const{loading,error,userdata}=userData

     const userUpdate=useSelector(state => state.userUpdated)
     const{sucess}=userUpdate

     const userLogin=useSelector(state => state.user)
     const{userInfo}=userLogin

     const [email,saveEmail]=useState()
     const[password,savePassword]=useState()
     const[name,saveName]=useState()
     const[password2,savePassword2]=useState()
     const [message,saveMessage]=useState()

     useEffect(()=>{
        if(!userInfo)
        {
            history.push('/signin')
        }else{
            if(!userdata.name){
                dispatch(userDetails('user'))
            }else{
                saveEmail(userdata.email)
                saveName(userdata.name)
            }     
        }

    },[history,userInfo,userdata,dispatch])
   
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==password2){
         saveMessage('passwords do not macth')
        }else{
            dispatch(update({id:userInfo._id,name,email,password}))

        }
        
    }
    return (
        <Row>
            <Col md={3}>
            <h1>User Info</h1> 
    {error && <Message variant='danger'>{message}</Message>}
    {sucess && <Message variant='success'>'Usuario Actualizado</Message>}
    {loading && <Loader/>}
          <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
                  <Form.Label>Name</Form.Label>
                <Form.Control
                type='text'
                placeholder='Your Name here'
                value={name}
                name='name'
                onChange={(e)=>saveName(e.target.value)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='email'>
                  <Form.Label>Email Adress</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                name='email'
                onChange={(e)=>saveEmail(e.target.value)}
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='password'
                value={password}
                name='password'
                onChange={(e)=>savePassword(e.target.value)}
                >

                </Form.Control>
              </Form.Group>

              <Form.Group controlId='password2'>
                  <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='password'
                value={password2}
                name='password'
                onChange={(e)=>savePassword2(e.target.value)}
                >
                     </Form.Control>
              </Form.Group>
             <Button type='submit' variant='primary'>
                Update User
             </Button>
          </Form>
          <Row className='py-3'>
          </Row>
            </Col>
            <Col md={9}>
            <h1>Orders</h1>
            </Col>
        </Row>
    )
}

export default ProfileScreen
