import React, { PropsWithChildren } from "react"
import { toast, ToastOptions } from "react-toastify"


// @next -- implement custom toast to style rather than overriding css classes
const BaseToast: React.FC<PropsWithChildren> = ({ children }) => {
    return <div>
        {children}
    </div>
}

export const successToast = (message: string, options?: ToastOptions) => {
    return toast(<BaseToast>{message}</BaseToast>, options)
}