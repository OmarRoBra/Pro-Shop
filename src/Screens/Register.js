import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import{Form,Button, Col,Row} from 'react-bootstrap'
import {useDispatch,useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import {register} from '../actions/userActions'
import Forms from '../components/Items/Forms'
function Register({location,history}) {
   const [email,saveEmail]=useState();
   const[password,savePassword]=useState()
   const[name,saveName]=useState()

    const dispatch = useDispatch();
    const  userLogin=useSelector(state => state.user)
    const{loading,error,userInfo}=userLogin
    const redirect=location.search? location.search.split('=')[1]: '/'
    useEffect(()=>{
        if(userInfo)
        {
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    
   const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(register(name,email,password))
   }
    return (
       <Forms>
          <h1>Create  A New Account</h1> 
    {error && <Message variant='danger'>{error}</Message>}
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
             <Button type='submit' variant='primary'>
                 Sign In
             </Button>
          </Form>
          <Row className='py-3'>
              <Col>
              Did you have an account? <Link to={redirect ? `/signIn?redirect=${redirect}`:'/sigIn'}>Login</Link>
              </Col>

          </Row>
       </Forms>
    )
}

export default Register
