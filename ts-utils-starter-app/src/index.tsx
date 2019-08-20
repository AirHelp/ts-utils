import { env, setupEnv } from '@airhelp/runtime-env'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { Home } from './components/home'
import { StateProvider } from './state'
import { User } from './types/user'

setupEnv()
  .then(() => axios.get<User>(`${env.API_GATEWAY_URL}/current_user`, { withCredentials: true }))
  .then(({ data: currentUser }) => {
    const app = (
      <StateProvider initialState={{ currentUser }}>
        <BrowserRouter>
          <Layout>
            <Route exact={true} path="/" component={Home} />
          </Layout>
        </BrowserRouter>
      </StateProvider>
    )

    ReactDOM.render(app, document.getElementById('app'))
  })
