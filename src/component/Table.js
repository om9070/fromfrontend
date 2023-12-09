import React, { useState, useEffect } from 'react';
import { api } from './Api';

const Table=()=>{
    const [data,setdata]=useState([])
    console.log(data,"lll")
    useEffect(()=>{
        const fetchData = async () => {
          try {
            const response = await fetch(`${api}user/getFormData`); // Replace with your API endpoint
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result)
            setdata([...result.data])
           
          } catch (error) {
            console.log(error)
          } 
        };
    
        fetchData();
},[])

    return(
        <>
            <table>
            <thead>
            <tr>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
            <th>dateOfBirth</th>
            <th>city</th>
            <th>age</th>
            <th>country</th>
            <th>state</th>
            <th>gender</th>

            </tr>
            </thead>
            <tbody>
                {
                    data.map((e)=>{
                        return(
                            <tr>
                            <td>{e.firstName}</td>
                            <td>{e.lastName}</td>
                            <td>{e.email}</td>
                            <td>{e.dateOfBirth}</td>

                            <td>{e.city}</td>
                            <td>{e.age}</td>
                            <td>{e.country}</td>
                            <td>{e.state}</td>
                            <td>{e.gender}</td>

                            </tr>
                        )
                    })
                }
            
            
            </tbody>
            </table>

        </>
    )
}
export default Table;