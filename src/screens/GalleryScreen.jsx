import { memo } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import ComingSoonComponent from '../components/ComingSoonComponent'

const GalleryScreen = () => {
    return (
        <>
            <div className='flex-grow h-full flex flex-col justify-between'>
                <NavbarComponent title={"Gallery"} />
                <ComingSoonComponent />
            </div>
        </>
    )
}

export default memo(GalleryScreen)