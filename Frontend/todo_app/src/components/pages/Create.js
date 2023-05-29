import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
  
function Create() {

    const [name, setname] = useState('');
    // Using useNavigation for redirecting to pages
    let history = useNavigate();
    // Function for creating a post/entry
    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/ticket-create/', { "name": name });
            setname('');
            // Redirecting to home page after creation done
            history('/')
        } catch (error) {
            console.log(error);
        }
    }
  
    return (
        <div className='container py-2'>
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h5>Create New Todo</h5>
                    <Link to='/'>
                        <Button className='btn btn-primary btn-sm'>Todo List</Button>
                    </Link>
                </div>
                <div className="card-body">
                    <Form className="gap-2">
                        <Form.Group className="mb-3" 
                            controlId="formBasicName">
                            <Form.Control onChange=
                                {e => setname(e.target.value)}
                                type="text"
                                placeholder="Enter Todo Name" required />
                        </Form.Group>
                        <Button className='btn btn-primary btn-sm d-flex justify-start' onClick={e => handelSubmit(e)} type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
  
export default Create