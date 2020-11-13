import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import{Form,Button, Col,Row} from 'react-bootstrap'
import {useDispatch,useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import {detailedProdcut,updateProduct} from '../actions/productActions'
import Forms from '../components/Items/Forms'
import {PRODUCTS_UPDATE_RESET} from '../consts/productConsts'
import clienteAxios from '../config/axios'
function ProductEdit({match,history}) {
    const productId= match.params.id

    const [name,setName]=useState('')
    const[price,setPrice]=useState(0)
    const[image,setImage]=useState('')
    const[brand,setBrand]=useState('')
    const[category,setCategory]=useState('')
    const[stock,setStock]=useState(0)
    const[description,setDescription]=useState('')
    const[uploading,setUploading]=useState(false)
 
     const dispatch = useDispatch();

     const  productDetail =useSelector(state => state. productDetails)
     const{loading,error,product}=productDetail

     const  update =useSelector(state => state.productUpdated)
     const{loading:loadingUpdated,error:errorUpdated,product:productUpdated,success}=update

     useEffect(()=>{
         if(success){
             dispatch({type:PRODUCTS_UPDATE_RESET})
             history.push('/admin/products')
         }else{
            if(!product|| product._id!==productId){
                dispatch(detailedProdcut(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setBrand(product.brand)
                setCategory(product.category)
                setStock(product.stock)
                setDescription(product.description)
                setImage(product.image)
            }
         }
        
     },[dispatch,history,productId,product,success])
     //Upload a File
    const uploadHandler=async(e)=>{
      const file= e.target.files[0]
      const formData= new FormData()
      formData.append('image',file)
      setUploading(true);
      try {
          const config={
              headers:{
                  'Content-type':'multipart/form-data'
              }
          }
        const {data}= await clienteAxios.post('/api/v1/upload',formData,config)
        setImage(data)
        setUploading(false)
      } catch (error) {
          console.log(error)
          setUploading(true)
      }
    }
     
    const submitHandler=(e)=>{
         e.preventDefault();
         dispatch(updateProduct({
             _id:productId,
             name,
             price,
             image,
             category,
             description,
             stock,
             brand  
             }))
        
    }
     return (
         <>
         <Link to='/admin/products' className='btn btn-light my-3'>
             Go Back
         </Link>
        <Forms>
           <h1>Edit Product</h1> 
     {error && <Message variant='danger'>{error}</Message>}
     {loading && <Loader/>}
           <Form onSubmit={submitHandler}>
           <Form.Group controlId='name'>
                   <Form.Label>Name</Form.Label>
                 <Form.Control
                 type='text'
                 placeholder='Your Name here'
                 value={name}
                 name='name'
                 onChange={(e)=>setName(e.target.value)}
                 >
                 </Form.Control>
               </Form.Group>
               <Form.Group controlId='price'>
                   <Form.Label>Price</Form.Label>
                 <Form.Control
                 type='number'
                 placeholder='Price'
                 value={price}
                 name='price'
                 onChange={(e)=>setPrice(e.target.value)}
                 >
                 </Form.Control>
               </Form.Group>    
 
               <Form.Group controlId='category'>
                   <Form.Label>category</Form.Label>
                 <Form.Control
                 type='text'
                 placeholder='category'
                 value={category}
                 name='category'
                 onChange={(e)=>setCategory(e.target.value)}
                 >
 
                 </Form.Control>
               </Form.Group>
               <Form.Group controlId='bran'>
                   <Form.Label>Brand</Form.Label>
                 <Form.Control
                 type='text'
                 placeholder='Brand'
                 value={brand}
                 name='brand'
                 onChange={(e)=>setBrand(e.target.value)}
                 >
                 </Form.Control>
               </Form.Group>
               <Form.Group controlId='image'>
                   <Form.Label>Name</Form.Label>
                 <Form.Control
                 type='text'
                 placeholder='URL Image'
                 value={image}
                 name='image'
                 onChange={(e)=>setImage(e.target.value)}
                 >
                 </Form.Control>
                 <Form.File 
                 id='image-file'
                 label='Choose File'
                 custom
                 onChange={uploadHandler}
                 ></Form.File>
                 {uploading && <Loader/>}
               </Form.Group>
               <Form.Group controlId='stock'>
                   <Form.Label>Stock</Form.Label>
                 <Form.Control
                 type='number'
                 placeholder='Stock'
                 value={stock}
                 name='stock'
                 onChange={(e)=>setStock(e.target.value)}
                 >
                 </Form.Control>
               </Form.Group>    

               <Form.Group controlId='description'>
                   <Form.Label>Description</Form.Label>
                 <Form.Control
                 type='text'
                 placeholder='URL Image'
                 value={description}
                 name='description'
                 onChange={(e)=>setDescription(e.target.value)}
                 >
                 </Form.Control>
               </Form.Group>
              <Button type='submit' variant='primary'>
                  Update
              </Button>
           </Form>
           
        </Forms>
        </>
     )
 }
export default ProductEdit
