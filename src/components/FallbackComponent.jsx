import { memo } from 'react'

/** This component is loaded when we need to show a loading screen while the react component is being rendered through lazy loading */
const FallbackComponent = () => {
    return (
        <div className='flex-grow h-full flex justify-center items-center my-auto'>
            <h1 className='font-bold text-3xl'>Loading...</h1>
        </div>
    )
}

/** Component is memoized to stop re-rendering in every parent component render. */
export default memo(FallbackComponent)