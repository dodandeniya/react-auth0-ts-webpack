import React, { useState, useEffect } from "react";

function Courses(props: any) {
  const [courses, setCoourses] = useState([]);
  const [message, setMessage] = useState("");
  let baseURL = process.env.REACT_APP_API_URL + "/course";

  useEffect(() => {
    fetch(baseURL, {
      headers: { Authorization: `Bearer ${props.auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network Response is not ok");
      })
      .then((response) => setCoourses(response.courses))
      .catch((err) => setMessage(err.message));
  });

  return (
    <>
      <p>{message}</p>
      <ul>
        {courses.map((course) => {
          return <li key={course.id}>{course.title}</li>;
        })}
      </ul>
    </>
  );
}
export default Courses;
