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
    pointerEvents: "auto"
  }
}
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="popup-bg"
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50 pointer-events-auto "
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <div
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

