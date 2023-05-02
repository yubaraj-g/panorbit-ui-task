import { memo, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { chatUser } from '../redux/reducers/chatUser'
import { Route, Routes } from 'react-router-dom'
import FallbackComponent from '../components/FallbackComponent'

/** lazy loaded components to stop unwanted downloading of javascript files */
const MainSection = lazy(() => import("./MainSection"))
const ProfileScreen = lazy(() => import("../screens/ProfileScreen"))
const PostsScreen = lazy(() => import("../screens/PostsScreen"))
const GalleryScreen = lazy(() => import("../screens/GalleryScreen"))
const TodoScreen = lazy(() => import("../screens/TodoScreen"))
const AllChatsUsersComponent = lazy(() => import("../components/index").then(module => {
    return { default: module.AllChatsUsersComponent }
}))
const ChatBoxComponent = lazy(() => import("../components/index").then(module => {
    return { default: module.ChatBoxComponent }
}))



const Dashboard = () => {
    /** Below is the global state coming from redux when one user is selected to chat with through the AllChatsUsers component */
    const currentChatUser = useSelector(chatUser)

    return (
        <>
            <section className='bg-white px-16 py-12 w-full h-full flex gap-12 relative'>
                {/* Below main section is loaded which includes sidebar and the other screens */}
                <Suspense fallback={<FallbackComponent />}>
                    <MainSection>
                        <Routes>
                            <Route path="/profile" element={<ProfileScreen />}></Route>
                            <Route path="/posts" element={<PostsScreen />}></Route>
                            <Route path="/gallery" element={<GalleryScreen />}></Route>
                            <Route path="/todo" element={<TodoScreen />}></Route>
                        </Routes>
                    </MainSection>
                </Suspense>

                {
                    /** When a user is selected to chat with the ChatBox loads and provides us facility to chat */
                    currentChatUser !== null ?
                        <div className='fixed bottom-0 right-96 rounded-t-lg h-fit w-[300px] bg-indigo-500 overflow-hidden'>
                            <Suspense fallback={<h1 className='flex bg-indigo-500 justify-center rounded-t-lg px-5 py-2 cursor-pointer w-full text-white'>Loading...</h1>}>
                                {/* When a user is selected to chat with from the allChatsUsers component, ChatBox component will take it and provide the chat box. */}
                                <ChatBoxComponent user={currentChatUser} />
                            </Suspense>
                        </div> : null
                }

                {/* Below allChats component is ready for whenever chatting is needed. */}
                <div className='fixed bottom-0 right-16 rounded-t-lg h-fit w-[280px] border border-indigo-500 bg-indigo-500 overflow-hidden'>
                    <AllChatsUsersComponent />
                </div>
            </section>
        </>
    )
}

export default memo(Dashboard)