import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';  
  
function Edit() {
    const [name, setName] = useState('');
    const [id, setId] = useState(useParams().id);
 
    let history = useNavigate()

    const handelSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await axios.put(`http://127.0.0.1:8000/api/ticket-update/${id}/`, { "name": name });
            // Redirecting to home page after creation done
            history('/')
        } catch (error) {
            console.log(error);
        }
        history('/')
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const USER_API = `http://127.0.0.1:8000/api/ticket-detail/${id}/`;
                const response = await axios.get(USER_API);
                setName(response.data.name);
                setId(response.data.id);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id] );
  
    return (
        <div className='container py-2'>
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h5>Edit Todo</h5>
                    <Link to='/'>
                        <Button className='btn btn-primary btn-sm'>Todo List</Button>
                    </Link>
                </div>
                <div className="card-body">
                    <Form className="gap-2">
                        <Form.Group className="mb-3" 
                            controlId="formBasicEmail">
                            <Form.Control value={name}
                                onChange={e => setName(e.target.value)}
                                type="text" placeholder="Enter Todo Name" />
                        </Form.Group>

                        <Button className='btn btn-primary btn-sm d-flex justify-start' onClick={e => handelSubmit(e)} type="submit">
                            Update
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
  
export default Edit