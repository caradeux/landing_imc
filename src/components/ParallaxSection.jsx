import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  style = {}
}) => {
  const { scrollYProgress } = useScroll()
  
  // Efectos de parallax basados en la dirección
  const yTransform = useTransform(scrollYProgress, [0, 1], 
    direction === 'up' ? [0, -100 * speed] : 
    direction === 'down' ? [0, 100 * speed] : [0, 0]
  )
  
  const xTransform = useTransform(scrollYProgress, [0, 1], 
    direction === 'left' ? [0, -100 * speed] : 
    direction === 'right' ? [0, 100 * speed] : [0, 0]
  )
  
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scaleTransform = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 1.1])

  return (
    <motion.div
      className={className}
      style={{
        ...style,
        y: yTransform,
        x: xTransform,
        opacity: opacityTransform,
        scale: scaleTransform,
        willChange: 'transform'
      }}
    >
      {children}
    </motion.div>
  )
}

export default ParallaxSection
