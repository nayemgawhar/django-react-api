import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
  
function Home() {
    const [data, setData] = useState([]);

    let history = useNavigate();
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const USER_API = 'http://127.0.0.1:8000/api/ticket-list/';
                const response = await axios.get(USER_API);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    // complete todo
    const confirmDeleteHandler = async (id) => {
        //e.preventDefault(); 
        try {
            MySwal.fire({
                title: <p>Todo Deleted</p>,
                didOpen: async () => {
                    //MySwal.showLoading()
                    await axios.delete(`http://127.0.0.1:8000/api/ticket-delete/${id}/`, { "is_active": 1 });
                    const fetchData = async () => {
                        try {
                            const USER_API = 'http://127.0.0.1:8000/api/ticket-list/';
                            const response = await axios.get(USER_API);
                            setData(response.data);
                        } catch (error) {
                            console.error('Error fetching data:', error);
                        }
                    };
                    fetchData();
                },
            });
            
        } catch (error) {
            console.log(error);
        }
        history('/')
    }
  
    return (
        <div className='container py-2'>
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h5>Todo List</h5>
                    <Link to='/create'>
                        <Button className='btn btn-primary btn-sm'>Add New</Button>
                    </Link>
                </div>
                <div className="card-body">
                    <Table className="table table-bordered border-dark">
                        <thead className='table-dark text-white'>
                            <tr>
                                <th>Sl#</th>
                                <th className='col-11'>Todo List</th>
                                <th className='col-1'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-start'>
                            {data?.map((item,index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <Link to={`/edit/${item.id}`}>
                                                <button type="button" className="btn btn-success btn-sm">edit</button>
                                            </Link>
                                            <button type="button" onClick={() =>{ confirmDeleteHandler(item.id)}} className="btn btn-danger btn-sm">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            
            </div>
        </div>
    )
}
  
export default Home