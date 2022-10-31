import Button from "../Button/Button"
import Demo from "../Demo"
import { successToast } from "./Toast"

const ToastDemo = () => {
    return <Demo title={"Toast"}>
        <Button onClick={() => successToast("Success")}>Success toast</Button>
        <Button>Warning toast</Button>
        <Button>Error toast</Button>
    </Demo>
}

export default ToastDemo