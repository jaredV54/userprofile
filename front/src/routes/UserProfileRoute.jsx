import React from 'react'
import { logoutApi } from '../api/handleLogin'
import { useNavigate } from 'react-router-dom';

const UserProfileRoute = () => {
    const navigate = useNavigate();
    const logoutUser = () => {
        logoutApi(navigate)
    }

    return (
      <>
      <div>UserProfileRoute</div>
      <button onClick={logoutUser}>Log Out</button>
      </>
    )
}

export default UserProfileRoute