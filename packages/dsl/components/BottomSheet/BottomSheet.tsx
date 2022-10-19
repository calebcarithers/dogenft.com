import React, { PropsWithChildren } from "react"
import {BottomSheet as SpringBottomSheet} from "react-spring-bottom-sheet"
import 'react-spring-bottom-sheet/dist/style.css'
import { Props as SpringBottomSheetProps } from "react-spring-bottom-sheet/dist/types"

interface BottomSheetProps extends SpringBottomSheetProps {

}

const BottomSheet: React.FC<PropsWithChildren<BottomSheetProps>> = React.forwardRef(({children, ...rest}, ref) => {
    return <SpringBottomSheet {...rest}>
        {children}
    </SpringBottomSheet>
})

export default BottomSheet
