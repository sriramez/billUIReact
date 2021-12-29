import React from 'react';
import { Alert } from 'react-bootstrap';
import CreateCustomer from './CreateCustomer';
import ViewCustomer from './ViewCustomers';

function Customer()
{
    return(
        <div>
            <Alert>Click here to create a new Customer.</Alert>
            <CreateCustomer />
            <br />                    
            <br />
            <Alert>Click here to view all Customers.</Alert>
            <ViewCustomer />
            
            
            
        </div>
    )
}

export default Customer;