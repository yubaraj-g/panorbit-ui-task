import { memo } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import ComingSoonComponent from '../components/ComingSoonComponent'

const PostsScreen = () => {
    return (
        <>
            <div className='flex-grow h-full flex flex-col justify-between'>
                <NavbarComponent title={"Posts"} />
                <ComingSoonComponent />
            </div>
        </>
    )
}

export default memo(PostsScreen)