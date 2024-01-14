import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Course() {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5100/user/course").then((res) => {
            console.log("respoinse is " , res);
            setCourses(res.course)
        }).catch((error) => {
            console.log("Error  " , error);
        })
    }, [])

    function onBuyNow(id )
    {   
        // console.log(id);
        axios.post(`http://localhost:5100/user/purchaseCourse/${id}` , {}).then((res) => {
            console.log("res is : " , res);
        }).catch((err) => {console.log("error is : " , err.response);})
    }

    return (
        <div >
                {courses.map( (course) => {
                       return(
                        <div key={course._id}>
                            <h3> {course.name} </h3>
                            <p> {course.description} </p>
                            <button onClick={() => onBuyNow(course._id)}>  Buy Now</button>
                        </div>
                       )
                })}
        </div>
    )
}

export default Course