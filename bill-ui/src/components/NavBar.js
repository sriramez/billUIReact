import React from "react";
import { Navbar,Nav,Container} from "react-bootstrap"
import { useNavigate} from "react-router-dom"

let navigate;

export default function NavBar()
{    

    navigate = useNavigate();

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand >Bill Application</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=>{navigate("/customer")}}  >Customer Page</Nav.Link>
                        <Nav.Link onClick={()=>{navigate("/product")}} >Product Page</Nav.Link>
                        <Nav.Link onClick={()=>{navigate("/bill")}} >Billing Page</Nav.Link>
                    </Nav>
                </Container>
            </Navbar> 
        </div>
    );
}




