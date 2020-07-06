import React, { useState, useEffect } from "react";

function Profile(props: any) {
  const [profile, setProfile]: any = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  });

  function loadProfile() {
    props.auth.getProfile((profile: any, error: any) => {
      setProfile(profile);
      setError(error);
    });
  }

  return (
    <>
      <h1>Profile</h1>
      <p>{profile.nickname}</p>
      <img
        style={{ maxWidth: 50, maxHeight: 50 }}
        src={profile.picture}
        alt="profile pic"
      />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  );
}

export default Profile;
