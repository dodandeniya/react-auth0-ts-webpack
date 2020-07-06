import React, { useEffect } from "react";

export default function Callback(props: any) {
  useEffect(() => {
    if (/access_token|id_token|error/.test(props.location.hash)) {
      props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL.");
    }
  });

  return <h1>Loading...</h1>;
}
