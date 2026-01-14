import { useEffect, useRef, useState } from 'react'

export function useScrollDirection(thresholdPx: number = 200) {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [passedThreshold, setPassedThreshold] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setDirection(y > lastScrollY.current ? 'down' : 'up')
      setPassedThreshold(y > thresholdPx)
      lastScrollY.current = y
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [thresholdPx])

  return { direction, passedThreshold }
}
