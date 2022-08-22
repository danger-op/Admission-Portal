import React from 'react'
import { Card, CardBody } from 'reactstrap';

 const Header=()=> {
  return (
    <div>
        <Card className='my-1 bg-info'>
            <CardBody>
            <h1 className='text-center my-1'>Welcome to course's point</h1>
            </CardBody>
        </Card>
        
    </div>
  );
};
export default Header;