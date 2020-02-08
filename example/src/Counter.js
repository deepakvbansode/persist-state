import React, { useEffect } from 'react'
import { usePersistState } from 'persist-state'
import { PERSIST_ACROSS_SESSION, PERSIST_ON_UNMOUNT } from './constants'

const Counter = ({ config }) => {
  const [count, setCount] = usePersistState(0, {
    key: 'count',
    persistOnUnmount: config === PERSIST_ON_UNMOUNT,
    persistAcrosSession: config === PERSIST_ACROSS_SESSION
  })
  const [isRunning, setIsRunning] = usePersistState(false, {
    key: 'countStatus',
    persistOnUnmount: config === PERSIST_ON_UNMOUNT,
    persistAcrosSession: config === PERSIST_ACROSS_SESSION
  })
  useEffect(() => {
    if (isRunning) {
      let timerId = setInterval(() => {
        setCount(prevState => prevState + 1)
      }, 1000)
      return () => clearInterval(timerId)
    }
  }, [isRunning])

  return (
    <div className='counter'>
      <span>Count: {count}</span>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'STOP' : 'START'}
      </button>
      <button onClick={() => setCount(0)}>Reset Counter</button>
    </div>
  )
}
export default Counter
