import React, { useState, memo, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { selectedUser } from '../redux/reducers/userData'   // This is selected user data from redux
/** user profile changer is lazy loaded so that component is downloaded only when it's needed */
const UserProfileChanger = lazy(() => import("./UserProfileChanger"))

const NavbarComponent = ({ title }) => {
  const selectedUserData = useSelector(selectedUser)    /** This state stores the redux state of current selected user as logged in user */
  const { name, profilepicture } = selectedUserData     /** Destructuring the data from the selected user */

  const [showProfilesComponent, setShowProfilesComponent] = useState(false) /** This state is being used to monitor if the user profile component is expanded or collapsed. */
  const showProfiles = () => {
    /** If the show profiles is true, make it false, else make it true */
    showProfilesComponent ? setShowProfilesComponent(false) : setShowProfilesComponent(true)
  }

  return (
    <div className='h-[10%] w-full font-semibold text-gray-500 flex justify-between border-b-2 border-gray-200 relative'>
      <h2 className='pt-3 text-[1.4rem] text-gray-600'>{title || "Profile"}</h2>
      <button className='pt-3 w-fit flex gap-4' onClick={showProfiles}>
        <img src={profilepicture} alt="" className='w-[38px] h-[38px] rounded-full' />
        <h3 className='text-[17px] mt-1.5'>{name}</h3>
      </button>

      {
        /** If the show profles is true it will expand the user profile changer component which is basically the user profile component */
        showProfilesComponent === true ?
          <Suspense fallback={<div className='absolute top-16 right-0 w-[19rem] h-[26rem] bg-white z-40 rounded-3xl flex flex-col items-center justify-center overflow-hidden shadow-2xl'>Loading...</div>}>
            <UserProfileChanger showProfiles={showProfiles} />
          </Suspense>
          : null
      }
    </div>
  )
}

export default memo(NavbarComponent)