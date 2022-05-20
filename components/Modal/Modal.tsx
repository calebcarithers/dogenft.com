import * as RadixDialog from '@radix-ui/react-dialog';
import {css} from "../../helpers/css";
import React, {PropsWithChildren} from "react";
import {MdClose} from "react-icons/md";

interface DialogProps {
    isOpen?: boolean;
    title?: string;
    description?: string;
    onChange?: (value: boolean) => void;
}

const Modal: React.FC<PropsWithChildren<DialogProps>> = ({children, isOpen, title, description, onChange}) => {
    return <RadixDialog.Root open={isOpen} onOpenChange={(value) => onChange && onChange(value)}>
        <RadixDialog.Portal>
            <RadixDialog.Overlay className={css("fixed", "bg-black", "inset-0", "opacity-80", "z-50")}/>
            <RadixDialog.Content
                style={{transform: "translate(-50%, -50%)"}}
                className={css("bg-white", "rounded-sm", "top-1/2", "left-1/2", "fixed", "w-full", "md:mx-0", "md:w-9/12", "p-10", "text-black", "border-2", "border-solid", "border-black", "max-w-3xl", "z-50")}>

                {onChange && <RadixDialog.Close style={{right: "5px", top: "5px"}}
                                                className={css("absolute", "text-black", "hover:text-doge-orange")}>
                  <MdClose size={"25px"}/>
                </RadixDialog.Close>}
                <RadixDialog.Title className={css("text-black", "text-3xl", "font-bold", "text-center", "mb-12")}>
                    {title}
                </RadixDialog.Title>
                <RadixDialog.Description>{description}</RadixDialog.Description>
                {children}
            </RadixDialog.Content>
        </RadixDialog.Portal>
    </RadixDialog.Root>
}

export default Modal
