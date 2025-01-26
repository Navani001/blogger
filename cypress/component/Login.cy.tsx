import { SignIn } from '@/lib/auth/signin-button'
import React from 'react'


describe('<SignIn />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SignIn />)
  })
})