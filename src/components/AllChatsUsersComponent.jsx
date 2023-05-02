import { useState, useEffect, memo, useMemo } from "react"
import { ArrowUpIcon, ChatIcon } from '../resources/icons'
import { allUsers } from "../redux/reducers/allUsers"
import { useDispatch, useSelector } from "react-redux"
import { selectedUser } from "../redux/reducers/userData"
import { getChatUser } from "../redux/reducers/chatUser"
import { getAllRemainingUsers } from "../services/remainingUsers"

const AllChatsUsersComponent = () => {
    const dispatch = useDispatch()
    const allUsersData = useSelector(allUsers)  // allUsers is the list of all the users stored in redux after API call
    const [expandedChat, setExpandedChat] = useState(false) // State to follow up on the chat users list is opened on not

    const expandChat = () => {
        /** if chat is expanded then clicking here will collapse it, otherwise expand it. */
        if (expandedChat === true) {
            setExpandedChat(false)
        } else {
            setExpandedChat(true)
        }
    }
    /** SelectedUser is the state of who is the current user of the application, the one who is logged in.  */
    const selectedUserData = useSelector(selectedUser)
    /** Remaining users list is the list of all the other users except the one who is logged in */
    const [remainingUsers, setRemainingUsers] = useState([])

    /** Below is the logic to extract out all the other users except the one who is logged in. And it's wrapped in useMemo hook to prevent re running the function unnecessarily on every component render. This useMemo depends on the logged user data, if the logged in user data is changed, e.g someone else logs in it will run again to extract out the remaining users list again. */
    const remainingUsersList = useMemo(() => getAllRemainingUsers(allUsersData, selectedUserData), [selectedUserData])
    /** Every time Remaining users list is changed below useEffect will re-attach/update the data to the list */
    useEffect(() => {
        setRemainingUsers(remainingUsersList)
    }, [remainingUsersList])


    return (
        <>
            <div
                className='flex bg-indigo-500 items-center rounded-t-lg px-5 py-2.5 cursor-pointer w-full'
                onClick={expandChat}
            >
                <div id='chat_icon' className='w-fit'>
                    <ChatIcon color={"#fff"} />
                </div>
                <h6 className='text-white w-56 ml-2 text-lg'>Chats</h6>
                <div id='arrow_icon' className={`flex items-center ${expandedChat ? 'rotate-180' : ''}`}>
                    <ArrowUpIcon color={"#fff"} />
                </div>
            </div>
            {
                /** if the state of expanded chat is true, it means it indicates us to expand the chat, therefore below JSX will be loaded. */
                expandedChat === true ?
                    <div className="w-full h-fit px-1 bg-white">
                        <div className='w-full h-80 bg-white z-40 overflow-y-auto px-3 py-2 flex flex-col gap-3' id='chat_users_list'>
                            {
                                remainingUsers.map((user, index) => (
                                    <div key={index} className="flex gap-2 items-center justify-between cursor-pointer" onClick={() => {
                                        dispatch(getChatUser(user))
                                        // setExpandedChat(false)
                                    }}>
                                        <div className="flex gap-2 items-center">
                                            <img src={user.profilepicture} alt="profile-picture-mini" className="w-[35px] h-[35px] rounded-full" />
                                            <h6 className="text-sm hover:text-[0.885rem] hover:text-indigo-700">{user.name.split("").splice(0, 20).join("")}</h6>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        {/* To show who's online and who is not, a different array of objects with names and online status is needed, which would be more accurate and realistic. But here the logic is to show all the other users except the user itself, showing all the others as online. Some other way which would actually give us the data who is online or not in real time should be implemented to show it appropriately. Now it seems to be a lot of unnecessary work for me to show that dynamically. I can create an array and do it but as I said, it should not be that important right now. */}
                                    </div>
                                ))
                            }
                        </div>
                    </div> :
                    null
            }
        </>
    )
}

/** Component is memoized to stop re-rendering in every parent component render. */
export default memo(AllChatsUsersComponent)