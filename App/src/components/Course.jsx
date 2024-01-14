import React, { useEffect, useState } from 'react'
import 'axios'
import axios from 'axios'
import CourseCard from './CourseCard'
function Course() {

  const [courses ,  setCourses] = useState([])
  useEffect(()=> {
      axios.get("http://localhost:5100/user/course").then((res) => {
        console.log(res.data);
        setCourses(res.data.course)
      }).then((error) => {
        console.log(error);
      })
  } , [])
  return (
    <div className=' grid justify-center grid-cols-3 m-3 p-3 '>
        {courses.map((course , index) => {
              return <CourseCard key={course._id} course={course}/>
        })}
    </div>
  )
}

export default Course