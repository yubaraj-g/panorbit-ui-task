import { memo, Suspense, lazy } from 'react'
import { NavLink } from 'react-router-dom'
const FallbackComponent = lazy(() => import("../components/FallbackComponent"))

const MainSection = ({ children }) => {
    /** The prop children will have all the React Elements that comes from Dashboard page, and shown according to the below sidebarLinks array data */
    /** Below is the array of links to be shown in the sidebar */
    const sidebarLinks = [
        {
            linkName: "Profile",
            url: "/profile"
        },
        {
            linkName: "Posts",
            url: "/posts"
        },
        {
            linkName: "Gallery",
            url: "/gallery"
        },
        {
            linkName: "ToDo",
            url: "/todo"
        },
    ]

    return (
        <>
            {/* Sidebar starts */}
            <div className='w-[270px] h-full bg-indigo-600 rounded-[1.75rem] flex items-center'>
                <ul className='flex flex-col text-lg font-medium h-fit w-full' id="navigation">
                    {
                        sidebarLinks.map((link, index) => {
                            return <li key={index} className={`px-10 w-full text-gray-300/75 hover:text-white`}>
                                {/* Below logic is to show border bottom except the last link in the sidebar, when the last link is rendered border bottom will not be added */}
                                <div className={`py-4 w-full ${(index !== (sidebarLinks.length - 1)) ? 'border-b border-gray-300/75' : ''}`}>
                                    <NavLink to={link.url}>
                                        <div></div>     {/** these are used to show the small notch type structure in the sidebar UI */}
                                        <div></div>     {/** these are used to show the small notch type structure in the sidebar UI */}
                                        <div></div>     {/** these are used to show the small notch type structure in the sidebar UI */}
                                        <h3>{link.linkName}</h3>
                                    </NavLink>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            {/* Sidebar ends */}

            {/* In the below div all the components are being rendered when clicked a link in the sidebar */}
            <Suspense fallback={<FallbackComponent />}>
                <div className='flex-grow h-full flex flex-col justify-between'>
                    {children}
                </div>
            </Suspense>
        </>
    )
}

export default memo(MainSection)