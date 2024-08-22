import {FC,ReactElement} from 'react'
import {motion} from 'framer-motion';
import {IFloatingShape} from '../interface/Components.IFloatingShape';
const FloatingShape:FC<IFloatingShape> = (props):ReactElement => {
  const {color,size,top,left,delay} = props;
  return (
    <motion.div
      className={`absolute ${color} ${size} rounded-full opacity-20 blur-xl ${top} ${left}`}
      style={{top,left}}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360]
      }}
      transition={{
        duration:20,
        ease:"linear",
        repeat:Infinity,
        delay:delay
      }}
      aria-hidden="true"
    >FloatingShape</motion.div>
  )
}

export default FloatingShape