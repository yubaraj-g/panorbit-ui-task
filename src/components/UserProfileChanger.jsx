import { memo, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedUser, selectedUser } from '../redux/reducers/userData'  // Selected user is the logged in user, getSelecteduser is the action for changing the logged in user (selected user)
import { allUsers } from '../redux/reducers/allUsers'   // Extracting all users list from redux state
import { getChatUser } from '../redux/reducers/chatUser'    // data of the user selected for chatting, from redux state
import { getAllRemainingUsers } from '../services/remainingUsers'   // function of extracting all the remaining users except the logged in one

const UserProfileChanger = ({ showProfiles }) => {
    const dispatch = useDispatch()
    const selectedUserData = useSelector(selectedUser)  // Storing selected user data coming from redux
    const allUsersData = useSelector(allUsers)  // storing all users list coming from redux
    const { name, email, profilepicture } = selectedUserData    // Destructuring information from selected user object

    // getting all the remaining users
    const remainingUsers = useMemo(() => getAllRemainingUsers(allUsersData, selectedUserData), [selectedUserData])

    // Logout function resets the selected user and chat user, so the whole app is disappears leaving only the log in screen
    const logout = () => {
        dispatch(getSelectedUser(null))
        dispatch(getChatUser(null))
    }

    return (
        <>
            <div
                id="user_profile_changer"
                className='absolute top-16 right-0 w-[19rem] h-[26rem] bg-white z-40 rounded-3xl flex flex-col items-center justify-center overflow-hidden'
                onClick={showProfiles}
            >
                <img src={profilepicture} alt="user-profile-picture" className='rounded-full object-cover w-24 mb-3' />
                <h3 className='w-full text-center text-base font-medium text-gray-700 mb-1.5'>{name}</h3>
                <h4 className='w-full text-center text-[0.94rem] font-normal text-gray-400 mb-3'>{email}</h4>

                <div className='overflow-y-auto h-24 w-4/5' id='remaining_users'>
                    {
                        remainingUsers?.map((user, index) => (
                            <div
                                className='border-t-2 border-gray-200 flex justify-center cursor-pointer py-3 gap-3'
                                onClick={() => {
                                    dispatch(getSelectedUser(user))
                                    dispatch(getChatUser(null))
                                }}
                                key={'user_' + index}
                            >
                                <img src={user.profilepicture} alt={user.name} className='w-6 h-6 rounded-full' />
                                <h6 className='text-sm text-gray-600 font-medium'>{user.name}</h6>
                            </div>
                        ))
                    }
                </div>

                <div className='w-full h-fit flex justify-center mt-6'>
                    <button
                        className='bg-red-500 text-white px-4 py-2 rounded-full text-lg font-medium'
                        onClick={logout}
                    >Sign out
                    </button>
                </div>
            </div>
        </>
    )
}

export default memo(UserProfileChanger)