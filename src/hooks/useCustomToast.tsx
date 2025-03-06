import {useEffect} from "react";
import {toast} from "react-toastify";

export const useCustomToast = (
    {
        data,
        dialogFn,
        successFn,
        errorFn
    }: {
        data: any,
        successFn?: () => void,
        errorFn?: () => void,
        dialogFn?: ((show: boolean)=> void) | undefined  } )  => {
    useEffect(() => {
        if(data?.status === "SUCCESS") {
            toast.success(data.message)
            if(successFn){
                successFn()
            }
            if(dialogFn){
                dialogFn(false)
            }
        } else if(data?.status === "FAILURE") {
            toast.error(data.message)

            if(errorFn){
                errorFn()
            }
        }
    }, [data?.status]);
}