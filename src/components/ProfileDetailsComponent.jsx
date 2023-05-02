import { useSelector } from 'react-redux'
import { selectedUser } from '../redux/reducers/userData'

const ProfileDetailsComponent = () => {
    const selectedUserData = useSelector(selectedUser)  /** Getting the selected user data coming from redux */
    const { name, address, company, email, phone, username, website, profilepicture } = selectedUserData // Destructuring from selected user object
    

    return (
        <>
            <div className='w-full h-[84%] flex mt-10 relative'>
                <div className='w-[37%] border-r-2 border-gray-200 flex flex-col' id="left_section">
                    <div className='w-full h-1/3'>
                        <img src={profilepicture} alt="" className='h-[90%] mx-auto rounded-full' />
                    </div>
                    <div className='w-full flex flex-col items-center'>
                        <h3 className='font-bold text-gray-600 text-xl mb-3'>{name}</h3>
                        <div className='w-full flex flex-col text-lg font-semibold mb-3 items-center'>
                            <div className='flex w-full flex-col gap-2'>
                                <div className='flex w-full'>
                                    <h5 className='w-2/5 text-end font-medium text-gray-400'>Username &nbsp;:</h5>
                                    <h5 className='w-3/5 ml-3 text-gray-600'>{username}</h5>
                                </div>
                                <div className='flex w-full'>
                                    <h5 className='w-2/5 text-end font-medium text-gray-400'>e-mail &nbsp;:</h5>
                                    <h5 className='w-3/5 ml-3 text-gray-600 overflow-hidden'>{email}</h5>
                                </div>
                                <div className='flex w-full'>
                                    <h5 className='w-2/5 text-end font-medium text-gray-400'>Phone &nbsp;:</h5>
                                    <h5 className='w-3/5 ml-3 text-gray-600'>{phone.split("-").join("").split("").splice(0, 10).join("")}</h5>
                                </div>
                                <div className='flex w-full'>
                                    <h5 className='w-2/5 text-end font-medium text-gray-400'>Website &nbsp;:</h5>
                                    <h5 className='w-3/5 ml-3 text-gray-600'>{website}</h5>
                                </div>
                            </div>
                            <div className='h-[2px] w-[70%] bg-gray-200 mt-3'></div>
                        </div>
                        <div className='w-full text-gray-400 text-lg font-semibold flex flex-col items-center'>
                            <h3 className='font-semibold mb-3'>Company</h3>
                            <div className='flex w-full flex-col gap-3'>
                                <div className='flex w-full'>
                                    <h5 className='w-2/5 text-end font-medium text-gray-400'>Name &nbsp;:</h5>
                                    <h5 className='w-3/5 ml-3 text-gray-600'>{company?.name}</h5>
                                </div>
                                <div className='flex w-full'>
                                    <h5 className='w-2/5 text-end font-medium text-gray-400'>catchphrase &nbsp;:</h5>
                                    <h5 className='w-3/5 ml-3 text-gray-600'>{company?.catchPhrase}</h5>
                                </div>
                                <div className='flex w-full'>
                                    <h5 className='w-2/5 text-end font-medium text-gray-400'>bs &nbsp;:</h5>
                                    <h5 className='w-3/5 ml-3 text-gray-600'>{company?.bs}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-3/5 pl-14 flex flex-col items-end flex-grow' id="right_section">
                    <h3 className='font-medium text-[1.15rem] text-gray-400 mb-3 w-full'>Address :</h3>

                    <div className='flex flex-col w-[96%] text-gray-400 text-[1.15rem] ml-6 gap-2 mb-3'>
                        <div className='flex w-full'>
                            <h5 className='font-medium w-[20%] flex justify-end'>Street &nbsp;:</h5>
                            <h5 className='text-gray-600 font-semibold ml-3 w-[79%]'>{address?.street}</h5>
                        </div>
                        <div className='flex w-full'>
                            <h5 className='font-medium w-[20%] flex justify-end'>Suite &nbsp;:</h5>
                            <h5 className='text-gray-600 font-semibold ml-3 w-[79%]'>{address?.suite}</h5>
                        </div>
                        <div className='flex w-full'>
                            <h5 className='font-medium w-[20%] flex justify-end'>City &nbsp;:</h5>
                            <h5 className='text-gray-600 font-semibold ml-3 w-[79%]'>{address?.city}</h5>
                        </div>
                        <div className='flex w-full'>
                            <h5 className='font-medium w-[20%] flex justify-end'>Zipcode &nbsp;:</h5>
                            <h5 className='text-gray-600 font-semibold ml-3 w-[79%]'>{address?.zipcode}</h5>
                        </div>
                    </div>

                    <div className='w-[91%] h-[55%] rounded-[2rem] mt-4' id="map">
                        {/* This is a static google map embedded since there's no instruction on adding a dynamic map using coordinates.
                        For dynamic locations based on coordinates google map API will be needed. */}
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.861999099681!2d77.61705867922133!3d12.91658988360021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1524c219eb07%3A0x261e097df5843ac8!2sSilk%20Board%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1682882436852!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, borderRadius: "2rem" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className='w-full flex justify-end gap-3 mt-3'>
                        <div className='flex items-center'>
                            <h6 className='text-xs font-semibold text-gray-400'>Lat:&nbsp;</h6>
                            <h5 className='text-sm font-bold text-gray-600/90'>{address?.geo?.lat}</h5>
                        </div>
                        <div className='flex items-center'>
                            <h6 className='text-xs font-semibold text-gray-400'>Long:&nbsp;</h6>
                            <h5 className='text-sm font-bold text-gray-600/90'>{address?.geo?.lng}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileDetailsComponent