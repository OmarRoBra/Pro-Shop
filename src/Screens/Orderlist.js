import React,{useEffect} from 'react'
import{LinkContainer} from 'react-router-bootstrap'
import{Table,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/loader'
import {adminOrders} from '../actions/orderActions'
import {ORDERS_ADMIN_RESET} from '../consts/orderConts'

function Orderlist(history) {
    const dispatch = useDispatch()
    const orderLists=useSelector(state=>state.adminOrders)
    const{loading,orders}= orderLists

    const userLogin=useSelector(state => state.user)
    const{userInfo}=userLogin


   
    useEffect(()=>{
        dispatch({type:ORDERS_ADMIN_RESET})

        if(!userInfo.isAdmin){
            history.push('/signIn')
        }else{
            dispatch(adminOrders())
        }
        
        // eslint-disable-next-line
    },[dispatch,history])
    return (
        <>
        <Row className='align-items-center'>
            <Col>
            <h1>Orders</h1>
            </Col>
           
        </Row>
        {loading ? <Loader/> : (<Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>

            </thead>
            <tbody>
                {orders.map(order=>(
                    <tr key={order._id} >
                        <td>{order._id}</td>
                        <td>{order.user}</td>
                        <td> {order.createdAt}</td>
                        <td> {order.totalPrice} </td>
                         <td>{order.paidAt}</td>
                         <td>{order.isDelivereded ? <i class="far fa-axe-battle"></i> :<i class="fas fa-times"></i>}</td>
                        <td>
                            <LinkContainer to ={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>)}
    )
            
        </>
    )

}

export default Orderlist
