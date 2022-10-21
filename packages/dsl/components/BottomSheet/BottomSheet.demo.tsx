import { useState } from "react"
import Button from "../Button/Button"
import Demo from "../Demo"
import BottomSheet from "./BottomSheet"

const BottomSheetDemo = () => {
    const [open, setOpen] = useState(false)
    return <Demo title={"Bottom Sheet"}>
        <div>
            <Button onClick={() => setOpen(!open)}>Open</Button>
            <BottomSheet open={open}>
                <div>test this thing out!</div>
            </BottomSheet>
        </div>
    </Demo>
}
