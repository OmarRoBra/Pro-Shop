import React,{useState,useEffect} from 'react'
import{LinkContainer} from 'react-router-bootstrap'
import{Table,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import {deleteById} from '../actions/productActions'
import {listProducts,createProduct} from '../actions/productActions'
import {PRODUCTS_CREATE_RESET} from '../consts/productConsts'

function ProductAdmin({history}) {
    const dispatch = useDispatch()
    const producstLists=useSelector(state=>state.productsList)
    const{loading,error,products}= producstLists

    const userLogin=useSelector(state => state.user)
    const{userInfo}=userLogin

    const created=useSelector(state => state.productCraeted)
    const{success:productSucess,product:cProduct}=created

    const deleteinfo=useSelector(state => state.productDelete)
    const{loading:loadingError, success:sucessDelete}=deleteinfo

   
    useEffect(()=>{
        dispatch({type:PRODUCTS_CREATE_RESET})

        if(!userInfo.isAdmin){
            history.push('/signIn')
        }
        if(productSucess){
            history.push(`/admin/products/${cProduct.data._id}/edit`)
           
        }else{
            dispatch(listProducts())
        }
        
        
    },[dispatch,history,sucessDelete,productSucess,cProduct])

    const deleteHandler=(id)=>{
        dispatch(deleteById(id))

    }
    const createNewProduct=()=>{
       dispatch(createProduct())
    }
    return (
        <>
        <Row className='align-items-center'>
            <Col>
            <h1>Products</h1>
            </Col>
            <Button className='my-3' onClick={createNewProduct} >
                <i className='fas fa-plus'></i>create Product
            </Button>
           
        </Row>
        {sucessDelete && <Message variant='success'>Elemento eliminado</Message>}
    {loading? <Loader/> : error?<Message variant='danger'>{error}</Message> :(
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>

            </thead>
            <tbody>
                {products.map(product=>(
                    <tr key={product._id} >
                        <td>{product._id}</td>
                        <td> {product.name}</td>
                        <td> {product.price} </td>
                         <td>{product.brand}</td>
                        <td>
                            <LinkContainer to ={`/admin/products/${product._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                </Button>
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                              <i className='fas fa-trash' ></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )}
            
        </>
    )
}

export default ProductAdmin
