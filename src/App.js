import { useEffect, Suspense, lazy } from 'react'
import useApiHook from './services/useApiHook';
import LoginComponent from './components/LoginComponent';
import { useDispatch, useSelector } from 'react-redux';
import { selectedUser } from './redux/reducers/userData'
import { getAllUsers } from './redux/reducers/allUsers';
import { FallbackComponent } from './components';

const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  /** After selecting the user the data flows to redux and that selected user will be stored in the variable below */
  const selectedUserData = useSelector(selectedUser)
  const dispatch = useDispatch()

  /** Encapsulation helps to prevent information leaks or to keep data from being available globally */
  const apiEncapsulation = {
    api: "https://panorbit.in/api/users.json"
  }

  /** Calling the custom hook to fetch api data */
  const apiResponseData = useApiHook(apiEncapsulation.api)
  const { data, loading, error } = apiResponseData

  /** Below, it's assigning the data from the custom hook as soon as the component is mounted */
  useEffect(() => {
    dispatch(getAllUsers(data.users))
  }, [data])


  return (
    <>
      {/* This section is a auto generated wave being used as a background and I was expecting to get a similar looking image as a background but since I didn't get I used this instead. */}
      <section className='w-full absolute top-0 left-0 h-full'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#4f46e5" fill-opacity="1" d="M0,192L34.3,208C68.6,224,137,256,206,234.7C274.3,213,343,139,411,122.7C480,107,549,149,617,149.3C685.7,149,754,107,823,122.7C891.4,139,960,213,1029,250.7C1097.1,288,1166,288,1234,277.3C1302.9,267,1371,245,1406,234.7L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>
      </section>
      {/* background section ends and conditional rendering starts below */}

      {
        /** If some user if selected and redux is not empty only then show the dashboard page, otherwise show the login page (user selection page) */
        selectedUserData === null ?
          <LoginComponent data={data} loading={loading} error={error} /> :
          <Suspense fallback={<FallbackComponent />}>
            <Dashboard />
          </Suspense>
      }
    </>
  );
}

export default App;
