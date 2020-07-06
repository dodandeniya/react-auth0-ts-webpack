import React, { useState, useEffect } from "react";

function Private(props: any) {
  const [message, setMessage] = useState("");
  let baseURL = process.env.REACT_APP_API_URL + "/private";

  useEffect(() => {
    fetch(baseURL, {
      headers: { Authorization: `Bearer ${props.auth.getAccessToken()}` },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network Response is not ok");
      })
      .then((response) => setMessage(response.message))
      .catch((err) => setMessage(err.message));
  });

  return <p>{message}</p>;
}
export default Private;
