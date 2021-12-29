import React, { useEffect } from "react";
import { Container,Collapse,Button, Table, Row, Col } from "react-bootstrap";
import { useState } from "react";

export default function ViewCustomer()
{
    const [open, setOpen] = useState(false);
    const [customers,setCustomers] = useState([]);
    const [page,setPage] = useState(0);

    useEffect(()=>{
        fetchCustomers();
    },[page])

    let fetchCustomers = ()=>{
        fetch("http://localhost:8080/customers?page="+page).then(Response=>{
            if(Response.ok)
            {                
                return Response.json()
            }else{
                throw new Error();
            }
        }).catch((Error)=>{
          console.log(Error);
        }).then(Data=>{
            console.log(Data)        
            setCustomers(Data);
            console.log(customers);
        })
        

    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <Button
                    onClick={() => {setOpen(!open);fetchCustomers()}}
                    aria-controls="view-customers"
                    aria-expanded={open}
                >
                View Customers
                </Button>    
                    </Col>
                   
                </Row>
                
                
                <Container>                   
                    <Row>
                        <Col>
                        <Collapse in={open}>                            
                    <div id="view-customers">
                    <br />
                    <br />
                    <Row>
                    <Col>
                    <Button onClick={()=>fetchCustomers()}>Refresh</Button>
                    </Col>
                    <Col>
                    <Button onClick={()=> setPage(page+1)}>Next</Button>    
                    </Col>
                    <Col>
                    <Button onClick={()=> {if(page<0) {setPage(0)} else setPage(page-1)}}>Previous</Button>    
                    </Col>
                    </Row>
                    <br />                    
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>CustomerName</th>
                            <th>Email ID</th>                            
                        </tr>
                    </thead>                    
                    <tbody>                      
                    {customers.map(function(customer,i)
                    {
                        return(
                    <tr key={i}>
                        <td>{customer.id}</td>
                        <td>{customer.customerName}</td>
                        <td>{customer.email}</td>
                    </tr>
                        )
                        
                    }
                    )}
                                       
                    </tbody>
                    </Table>

                    </div>
                    
                </Collapse>
                        </Col>
                    </Row>
                </Container>
                
            </Container>
        </div>
    );
}