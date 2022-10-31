import React, { PropsWithChildren } from "react"
import { toast } from "react-toastify"

const BaseToast: React.FC<PropsWithChildren> = ({ children }) => {
    return <div>
        {children}
    </div>
}

export const successToast = (message: string) => {
    return toast(<BaseToast>{message}</BaseToast>)
}