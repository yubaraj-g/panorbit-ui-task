import NavbarComponent from '../components/NavbarComponent'
import ProfileDetailsComponent from '../components/ProfileDetailsComponent'

const ProfileScreen = () => {
    
    return (
        <>
            <div className='flex-grow h-full flex flex-col justify-between'>
                <NavbarComponent title={"Profile"} />
                <ProfileDetailsComponent />
            </div>
        </>
    )
}

export default ProfileScreen