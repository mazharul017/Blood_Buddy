import { useState, useEffect } from 'react'

function Preloader() {
  const [opacity, setOpacity] = useState(1)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const fadeInterval = setInterval(() => {
        setOpacity((prev) => {
          if (prev <= 0) {
            clearInterval(fadeInterval)
            setIsVisible(false)
            return 0
          }
          return prev - 0.1
        })
      }, 100)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center z-[9999] pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <img src="/pre-loader.svg" alt="Loading..." />
    </div>
  )
}

export default Preloader

