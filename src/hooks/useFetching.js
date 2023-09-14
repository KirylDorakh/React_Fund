import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading,  setIslLoading] = useState(false);
    const [err, setErr] = useState('')

    // const fetching = async () => {
    const fetching = async (...args) => {
         try {
             setIslLoading(true)
             await callback(...args)
         } catch (e){
            setErr(e.message);
         } finally {
            setIslLoading(false)
         }
    }

    return [fetching, isLoading, err]

}