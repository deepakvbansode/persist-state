import React, { useState } from 'react'
import Counter from './Counter'
import { usePersistState } from 'persist-state'
import {
  DEFAULT,
  PERSIST_ACROSS_SESSION,
  PERSIST_ON_UNMOUNT
} from './constants'

const App = () => {
  const [showCounter, setShowcounter] = usePersistState(true, {
    key: 'counter-status',
    persistAcrosSession: true
  })
  const [config, setConfig] = usePersistState(DEFAULT, {
    key: 'config',
    persistAcrosSession: true
  })

  const onConfigChange = event => {
    setConfig(event.target.value)
  }
  return (
    <div className='app'>
      <header>
        <h1>Persist State Demo</h1>
      </header>
      <div className='app__config'>
        <div className="app__instruction">Play around the counter component</div>
        <div>Configuration:</div>
        <label className='app__checkbox'>
          <input
            type='radio'
            value={DEFAULT}
            checked={config === DEFAULT}
            onChange={onConfigChange}
          />
          <span className='check' />
          Default
        </label>
        <label className='app__checkbox'>
          <input
            type='radio'
            value={PERSIST_ACROSS_SESSION}
            checked={config === PERSIST_ACROSS_SESSION}
            onChange={onConfigChange}
          />
          <span className='check' />
          Persist Across Session
        </label>
        <label className='app__checkbox'>
          <input
            type='radio'
            value={PERSIST_ON_UNMOUNT}
            checked={config === PERSIST_ON_UNMOUNT}
            onChange={onConfigChange}
          />
          <span className='check' />
          Persist on componet unmount
        </label>
      </div>
      <div className='app__description'>
        {config === DEFAULT && (
          <div>
            When default option is selected:
            <ol>
              <li className='app--green'>
                State will persist when browser is refreshed.
              </li>
              <li className='app--red'>
                State won't persist when component is umounted and remounted.
                Try this on clicking Hide/show counter button
              </li>
              <li className='app--red'>
                State won't persist if browser is closed and revisited the site
              </li>
            </ol>
            <figure>
              <figcaption>Code:</figcaption>
              <pre>
                <code>
                  const [count, setCount] = usePersistState(0,'count')
                </code>
              </pre>
            </figure>
          </div>
        )}
        {config === PERSIST_ACROSS_SESSION && (
          <div>
            When persist across session option is selected:
            <ol>
              <li className='app--green'>
                State will persist when browser is refreshed.
              </li>
              <li className='app--green'>
                State will persist if browser is closed and revisited the site
              </li>
              <li className='app--red'>
                State won't persist when component is umounted and remounted.
                Try this on clicking Hide/show counter button
              </li>
            </ol>
            <figure>
              <figcaption>Code:</figcaption>
              <pre>
                <code>
                  {` const [count, setCount] = usePersistState(0, { key: 'count', persistAcrosSession: true })`}
                </code>
              </pre>
            </figure>
          </div>
        )}
        {config === PERSIST_ON_UNMOUNT && (
          <div>
            When persist across session option is selected:
            <ol>
              <li className='app--green'>
                State will persist when browser is refreshed.
              </li>
              <li className='app--green'>
                State will persist when component is umounted and remounted. Try
                this on clicking Hide/show counter button
              </li>
              <li className='app--red'>
                State won't persist if browser is closed and revisited the site
              </li>
            </ol>
            <figure>
              <figcaption>Code:</figcaption>
              <pre>
                <code>
                  {`const [count, setCount] = usePersistState(0, { key: 'count', persistOnUnmount: true })`}
                </code>
              </pre>
            </figure>
          </div>
        )}
        <button onClick={() => setShowcounter(!showCounter)}>
          {showCounter ? 'Hide Counter' : 'Show Counter'}
        </button>
      </div>
      {showCounter && <Counter config={config} key={config} />}
    </div>
  )
}
export default App
