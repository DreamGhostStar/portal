import React from 'react';
import 'app/styles/comon/driver.scss'
import classnames from 'classnames'

interface BaseDriverProps {
}

type NativeDriverProps = BaseDriverProps & React.HTMLAttributes<HTMLDivElement>
type AnchorDriverProps = BaseDriverProps & React.AnchorHTMLAttributes<HTMLDivElement>
export type DriverProps = Partial<NativeDriverProps & AnchorDriverProps>

const Driver: React.FC<DriverProps> = (props) => {
    const { className, style, ...restProps } = props
    const classes = classnames('driver', {
        [`${className}`]: className
    })
    return (
        <div {...restProps} className={classes} style={style} ></div>
    )
}

export default Driver