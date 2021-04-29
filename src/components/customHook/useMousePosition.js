import { useEffect, useState } from 'react';

const useMousePosition = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    document.addEventListener('mousemove', (event) => {
      setX(event.clientX);
      setY(event.clientY);
    })
    return () => {
      document.removeEventListener('mousemove')
    }
  }, [])

  return [x, y]
}

export default useMousePosition