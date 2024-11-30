import React from 'react'
import Home from '../components/UserProfile/Home';
import { HomeProvider } from '../context/HomeContext';

const HomeRoute = ({ user }) => {
    return (
      <HomeProvider id={user.id}>
        <Home user={user} />
      </HomeProvider>
    )
}

export default HomeRoute;