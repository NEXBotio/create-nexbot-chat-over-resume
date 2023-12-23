
'use client'
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
interface AnimationProps {
children: ReactNode;
direction?: "left" | "right"|"up"|"down";
duration?: number;
}
const AnimationWrapper: React.FC<AnimationProps> = ({children, direction='up',duration=0.2}) =>  {
    let dir:{x:number,y:number}={x:0,y:0}
    switch (direction) {
        case "left":
            dir={x:20,y:0}
            break;
        case "right":
            dir={x:-20,y:0}
            break;
        case "up":
            dir={x:0,y:20}
            break;
        case "down":
            dir={x:0,y:-20}
            break;
        default:
            break;
    }
    return (<motion.div
        initial={{ opacity: 0, ...dir }}
        animate={{ opacity: 1, y: 0,x:0 }}
        exit={{ opacity: 0,...dir }}
        transition={{ duration: duration}}
    >
        {children}
    </motion.div>)
}
export default AnimationWrapper;