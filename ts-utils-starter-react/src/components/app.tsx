import React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter, Route } from 'react-router-dom'
import { StateProvider } from '../state'
import { Home } from './home'
import { Layout } from './layout'

const currentUser = {
  email: 'test@test',
  name: 'Name',
  user_id: '123456'
}

const App = () => (
  <StateProvider initialState={{ currentUser }}>
    <BrowserRouter>
      <Layout>
        <Route exact={true} path="/" component={Home} />
      </Layout>
    </BrowserRouter>
  </StateProvider>
)

export default hot(App)
