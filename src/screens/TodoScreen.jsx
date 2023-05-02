import { memo } from 'react'
import NavbarComponent from '../components/NavbarComponent'
import ComingSoonComponent from '../components/ComingSoonComponent'

const TodoScreen = () => {
  return (
    <>
      <div className='flex-grow h-full flex flex-col justify-between'>
        <NavbarComponent title={"Todo"} />
        <ComingSoonComponent />
      </div>
    </>
  )
}

export default memo(TodoScreen)