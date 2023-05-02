import { memo } from 'react'

const ComingSoonComponent = () => {
    return (
        <>
            <div className='w-full h-[84%] flex -mt-10 relative justify-center items-center'>
                <h1 className='font-[900] text-gray-200/75 text-[5.5rem] -mt-10'>Coming Soon</h1>
            </div>
        </>
    )
}

/** Component is memoized to stop re-rendering in every parent component render. */
export default memo(ComingSoonComponent)