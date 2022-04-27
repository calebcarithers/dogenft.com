import {useEffect, useState} from "react";

export default function useOnScreen(ref: React.RefObject<any>) {
  const [isIntersecting, setIntersecting] = useState(false)
  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    {
      root: document.querySelector("#root"),
      threshold: 0.5
    }
  )

  useEffect(() => {
    observer.observe(ref.current)
    return () => { observer.disconnect() }
  }, [ref.current])

  return isIntersecting
}