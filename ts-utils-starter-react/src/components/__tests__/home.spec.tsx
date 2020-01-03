import React from 'react'
import { render, wait } from '@testing-library/react'
import { Home } from '../home'

describe('Home', () => {
  test('renders title', async () => {
    const { queryByText } = render(<Home />)

    await wait(() => {
      expect(queryByText('Title')).not.toBeNull()
    })
  })
})
