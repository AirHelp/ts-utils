import { setupEnv } from '@airhelp/runtime-env'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'

setupEnv().then(() => {
  ReactDOM.render(<App />, document.getElementById('app'))
})
