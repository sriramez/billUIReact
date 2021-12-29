import { Alert } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap"; 
import { Collapse,Spinner } from "react-bootstrap";

export default function CreateCustomer()
{

    const [open, setOpen] = useState(false);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [alertVar,setAlertVar] = useState("");
    const [validationStatus,setValidation] = useState(false);

    let handleChange = function()
    {
        validateInput(name);

        createCustomerInDB();
    };

    let createCustomerInDB = function()
    {
        
            fetch("http://localhost:8080/customers?customerName="+name+"&email="+email,{
                method: 'POST',
                mode: 'cors'
            })
            
            .then(Response => {
                console.log(Response.ok)
                if(Response.ok)
                {
                    return Response.json();
                }else{
                 throw new Error();   
                }
            })            
            .then(data=>{console.log(data);setValidation(false);setAlertVar("Customer "+name+" created successfully")})
            .catch(()=>{
                setAlertVar("failed to create customer");
                setValidation(false);
            })  
            

         
    }

    let validateInput = function()
    {        
        if(name==="")
            setAlertVar("Customer name is Empty");
        else if(email==="")
            setAlertVar("Customer Email is Empty");
        else
            setValidation(true);
        
    };

  return (
    <div>
    <br />
    <Container>
        <>
        <Button
        onClick={() => setOpen(!open)}
        aria-controls="create-customer"
        aria-expanded={open}
      >
        Create Customer
      </Button>
      <Collapse in={open}>
        <div id="create-customer">
            <Container>
                <br/>
                <br/>
            <form>
                <Row>
                    <Col><label>Customer Name:</label></Col>
                    <Col><input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/></Col>
                </Row>
                <Row>
                    <br />
                </Row>
                 <Row>
                     <Col><label> Email:</label></Col>
                     <Col><input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/></Col>
                 </Row>
                 <Row>
                     <Col>
                     <Button variant="dark" onClick={handleChange}>Create</Button>
                     </Col>
                 </Row>
                 
            </form>
            <br />
            <br />
            {validationStatus?(<Spinner animation="border" variant="primary" />):(alertVar==="" ? <Alert variant="primary">Enter the details</Alert>:<Alert variant="primary">{alertVar}</Alert>)}

            </Container>
            
        </div>
      </Collapse>
    </>
    </Container>
    </div>
  );
    
}
