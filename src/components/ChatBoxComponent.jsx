import { useState } from 'react'
import { ArrowUpIcon, XMarkIcon, SendIcon } from '../resources/icons'
import { useDispatch } from 'react-redux'
import { getChatUser } from '../redux/reducers/chatUser'

const ChatBoxComponent = ({ user }) => {
    const dispatch = useDispatch()

    /** Below is a dummy array of chat history from two users to show in the chat box. */
    const conversation = [
        {
            message: "Lorem ipsum dolor sit amet, consectetur",
            by: "user",
            time: "9:16 PM"
        },
        {
            message: "Lorem ipsum dolor sit",
            by: "user",
            time: "9:16 PM"
        },
        {
            message: "Lorem ipsum dolor",
            by: "you",
            time: "9:18 PM"
        },
        {
            message: "Lorem ipsum",
            by: "you",
            time: "9:18 PM"
        },
        {
            message: "Lorem ipsum",
            by: "user",
            time: "9:20 PM"
        },
        {
            message: "Lorem ipsum",
            by: "user",
            time: "9:20 PM"
        },
        {
            message: "Lorem ipsum",
            by: "you",
            time: "9:21 PM"
        }
    ]

    /** This expanded state is to handle the expand collapse of the chatbox component */
    const [expanded, setExpanded] = useState(true)
    const expandChat = () => {
        /** Clicking this function will check if the chatbox is expanded of collapsec, if collapsed it will expand, if expanded it will collapse */
        expanded ? setExpanded(false) : setExpanded(true)
    }

    return (
        <>
            <div className='flex bg-indigo-500 items-center rounded-t-lg px-4 py-2
             cursor-pointer w-full justify-between' onClick={expandChat}>
                <div className='flex items-center'>
                    <img src={user.profilepicture} alt="profile-picture" className='rounded-full w-[25px] h-[25px]' />
                    <h6 className='text-white w-52 ml-2 text-sm'>{user.name}</h6>
                    <div id='arrow_icon' className={`flex items-center ${expanded ? 'rotate-180' : ''}`}>
                        <ArrowUpIcon color={"#fff"} />
                    </div>
                </div>
                {/* clicking on the x mark it should collapse the chat box. And it is achieved by nullifying the value in redux since the user data is coming to this component from redux state as a prop from Dashboard component, when redux is cleared Dashboard component gets a null value and it doesn't render this component anymore */}
                <div
                    className='ml-2'
                    onClick={() => {
                        dispatch(getChatUser(null))
                    }}
                >
                    <XMarkIcon color={"#fff"} />
                </div>
            </div>

            {
                expanded ?
                    <div className="w-full h-fit bg-white">
                        <div className='w-full h-fit px-1 bg-white border-x border-indigo-500'>
                            <div className='w-full h-60 bg-white z-40 overflow-y-auto px-3 py-2 flex flex-col gap-3' id='chat_users_list'>
                                {
                                    conversation.map((message, index) => {
                                        return (
                                            <div key={index} className='w-full flex flex-col'>
                                                <div className={`w-4/5 bg-gray-200/75 px-2 py-1 rounded text-xs ${message.by === "you" ? 'self-end' : 'self-start'}`} key={index}>
                                                    <span>{message.message}</span>
                                                </div>
                                                {
                                                    // if there's a difference between the time of each and every message, the time would be shown in the screen
                                                    message.time !== conversation[index + 1]?.time ?
                                                        <p className='w-full text-center text-xs text-gray-300 mt-2'>{message.time}</p> : null
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='flex w-full bg-white border border-gray-300 py-2' id='send_message'>
                            <input type="text" className='w-full border-none outline-none px-2' />
                            <button className='w-fit mr-2'>
                                <SendIcon color={"#00f"} />
                            </button>
                        </div>
                    </div> : null
            }
        </>
    )
}

export default ChatBoxComponent