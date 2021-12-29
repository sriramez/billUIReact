import React from "react";
import CreateBill from "./CreateBill";
import { Alert} from 'react-bootstrap'

function BillingPage()
{

    return (
        <div>
          <Alert>Click here to create a new Bill.</Alert>
            <CreateBill />
            <br />                    
            <br />
        </div>
    )
}

export default BillingPage;