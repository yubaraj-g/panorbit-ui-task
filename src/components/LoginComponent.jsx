import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { getSelectedUser } from '../redux/reducers/userData'

const LoginComponent = ({ data, loading, error }) => {
    const dispatch = useDispatch() /** useDispatch is stored as dispatch, and it's necessary for calling any action or function from Redux */
    const users = data.users /** This state is taking the users list through props from App component which calls the custom apicall hook and gives us the data */

    /** Below function selects a user and sends it's data(object) to redux's current user state. */
    const selectUser = (userObject) => {
        dispatch(getSelectedUser(userObject))
    }


    return (
        <>
            <div className='w-[600px] h-[550px] bg-white rounded-[2rem] shadow-2xl relative overflow-hidden my-auto'>
                <div className='bg-gray-100 rounded-t-[2rem] h-[20%] flex'>
                    <h2 className='font-semibold text-2xl text-gray-600 my-auto mx-auto'>Select an account</h2>
                </div>

                <div className='w-full px-12 mb-12 mt-3 flex flex-col text-gray-600 overflow-y-scroll h-[72%]' id="users_list">
                    {
                        /** this checks if users data is absent and not error but only loading, then show loading state */
                        (users === undefined && error === null && loading === true) ? <>
                            <div className='animate-pulse flex gap-4 border-b-2 border-gray-200 py-3'>
                                <div className='border bg-slate-200 border-gray-200 w-[35px] h-[35px] rounded-full' />
                                <h3 className='bg-slate-200 h-8 flex flex-grow rounded'></h3>
                            </div>
                            <div className='animate-pulse flex gap-4 border-b-2 border-gray-200 py-3'>
                                <div className='border bg-slate-200 border-gray-200 w-[35px] h-[35px] rounded-full' />
                                <h3 className='bg-slate-200 h-8 flex flex-grow rounded'></h3>
                            </div>
                            <div className='animate-pulse flex gap-4 border-b-2 border-gray-200 py-3'>
                                <div className='border bg-slate-200 border-gray-200 w-[35px] h-[35px] rounded-full' />
                                <h3 className='bg-slate-200 h-8 flex flex-grow rounded'></h3>
                            </div>
                            <div className='animate-pulse flex gap-4 border-b-2 border-gray-200 py-3'>
                                <div className='border bg-slate-200 border-gray-200 w-[35px] h-[35px] rounded-full' />
                                <h3 className='bg-slate-200 h-8 flex flex-grow rounded'></h3>
                            </div>
                        </> :
                        /** If error is not empty and users data is absent and loading state is false, it will show error state */ 
                        (users === undefined && error !== null && loading === false) ? <>
                            <div className='text-[1.25rem] gap-4 border-b-2 border-gray-200 py-3 cursor-default w-full'>
                                <h3 className='bg-red-50 text-orange-500 font-semibold py-1 flex rounded w-full justify-center items-center'>Error: {error}</h3>
                            </div>
                        </> :
                        /** If users data is not absent it should have some data in an array format, then it will show all the users as a list */ 
                            users !== undefined ?
                                users.map((user, index) => {
                                    return <button
                                        className='text-lg flex gap-4 border-b-2 border-gray-200 py-[0.535rem] hover:bg-gray-50 items-center'
                                        key={`user_${index}`}
                                        onClick={() => {
                                            selectUser(user)
                                        }}>
                                        <img src={user.profilepicture} alt={user.name} className='border border-gray-200 w-[35px] h-[35px] rounded-full' />
                                        <h3>{user.name}</h3>
                                    </button>
                                }) : null
                    }
                </div>

                {/* Below it's a blank div for the white part in the lower section of the user selection (login) component */}
                <div className='h-[8%] bg-white rounded-b-[2rem] absolute bottom-0 left-0'></div>
            </div>
        </>
    )
}

export default memo(LoginComponent)