import {useState, useEffect} from 'react'
import axios from 'axios'


const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        let isMounted = true
        const source = axios.CancelToken.source()

        const FetchData = async (url) =>{
            try{
                setIsLoading(true)
                const response = await axios.get(url, {
                    cancelToken:source.token
                })
                if(isMounted){
                    setData(response.data)
                    setFetchError(null)
    
                }
            }catch(err){
                if(isMounted){
                    setFetchError(err.message)
                    setData([])
                }
            }
            finally{
                isMounted && setIsLoading(false)
            }
        }
        FetchData(dataUrl)

        return () => {
            isMounted = false; // Set the flag to false when the component unmounts
            source.cancel('Component unmounted, cancelling request'); // Cancel the request
        };
    }, [dataUrl])



  return {data, fetchError, isLoading};
}

export default useAxiosFetch