import React from 'react';
import{NavDropdown,Navbar,Nav,Container} from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import {useDispatch,useSelector } from 'react-redux'
import {logOut} from  '../../actions/userActions'

const Header = () => {
  const dispatch = useDispatch();
    const  userLogin=useSelector(state => state.user)
    const{userInfo}=userLogin
    const LogOut=(e)=>{
      e.preventDefault();
      dispatch(logOut())
    }
    return ( 
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                  <LinkContainer to="/">
                    <Navbar.Brand>Practice Shop</Navbar.Brand>
                  </LinkContainer>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
      <LinkContainer to="/cart">
      <Nav.Link > <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
      </LinkContainer>
      {userInfo
       ?  <NavDropdown title={userInfo.name} id='username'>
          <LinkContainer to='/profile'>
            <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={LogOut}>LogOut</NavDropdown.Item>
         
       </NavDropdown>
      : <LinkContainer to="/signIn">
      <Nav.Link href="#pricing"><i className="fas fa-user"></i> Sign in</Nav.Link>
      </LinkContainer>}
     
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
        </header>
     );
}
 
export default Header;