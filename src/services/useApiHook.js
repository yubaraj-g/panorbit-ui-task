import { useState, useEffect } from 'react'

/** Custom hook to make api call */
const useApiHook = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const callApi = async (api) => {
        setLoading(true)
        try {
            const response = await fetch(api)
            const dataJson = await response.json()
            setData(dataJson)
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        callApi(url)
    }, [url])

    return { data, loading, error }
}

export default useApiHook