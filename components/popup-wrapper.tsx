'use client'

import { ReactNode, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

const backgroundVariants = {
  hidden: { 
    opacity: 0,
    pointerEvents: "none"
  },
  visible: { 
    opacity: 1,
    pointerEvents: "auto",
    transition: {
      duration: 0.3,
      staggerChildren: 0.08,
      ease: [0.4, 0, 0.2, 1],
      when: "beforeChildren",
    }
  },
  exit: {
    opacity: 0,
    pointerEvents: "none",
    transition: {
      duration: 0.3,
      staggerChildren: 0.08 ,
      staggerDirection: -1 ,
      ease: [0.4, 0, 0.2, 1],
      when: "afterChildren"
    }
  }
} as any 


export default function PopupWrapper({
  children,
  isOpen,
  onClose
}: {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          key="popup-bg"
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 pointer-events-auto "
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

