import React from 'react'
import Profile from '../components/UserProfile/Profile'
import { ProfileProvider } from '../context/ProfileContext'
const ProfileRoute = ({ user }) => {
  return (
    <ProfileProvider userId={user.userId}>
      <Profile user={user} />
    </ProfileProvider>
  )
}

export default ProfileRoute