import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

const Income = () => {
    const [incomes, setIncomes] = useState([])
    const URL = "http://localhost:3000";

    const getIncomes = () => {
        axios({
            method: "GET",
            url: `${URL}/incomes/`
        })

        .then(incomes => {
            setIncomes(incomes.data)
        })

        .catch(err => {
            console.log(err)
        })
    }

    const deleteHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: "DELETE",
                    url: `${URL}/incomes/${id}`
                })
                .then(result => {
                    console.log(`Delete Berhasil ${result}` )
                    getIncomes()
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                })
                .catch(err => {
                    console.log(err);
                })
            }
          })   
    }
    
    useEffect(() => {
        getIncomes();
    }, [])

    // console.log(incomes)

    return (
        <div className='income-list'>
            <div className='income-heading'>
                <h3>Income List</h3>
            </div>
            <div className='income-items'>
            {
                incomes.length !== 0 ?
                incomes.map(income => {
                    return (
                        <div className='card-item'>
                            <div className='item-left'>
                                <h3>{income.name}</h3>
                                <p>Rp. {income.total}</p>
                            </div>
                            <div className='item-right'>
                                <button onClick={(() => deleteHandler(+income.id))}>Delete</button>
                            </div>
                        </div>
                    )
                }) :
                <p>There is no incomes</p>
            }
            </div>
        </div>
    )
}

export default Income;