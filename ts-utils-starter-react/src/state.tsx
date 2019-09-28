import React, { createContext, Dispatch, useContext, useReducer } from 'react'
import { User } from './types/user'

export const enum ActionType {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  SET_TOKEN = 'SET_TOKEN',
  SIGN_OUT = 'SIGN_OUT'
}

type Action =
  | {
      type: ActionType.SET_CURRENT_USER
      currentUser: User
    }
  | {
      type: ActionType.SET_TOKEN
      accessToken: string
    }
  | {
      type: ActionType.SIGN_OUT
    }

interface State {
  currentUser: User
  token?: string
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_CURRENT_USER:
      console.log('set user: ', action)

      return {
        ...state,
        currentUser: action.currentUser
      }
    case ActionType.SET_TOKEN:
      return {
        ...state,
        token: action.accessToken
      }
    default:
      return state
  }
}

type ContextProps = [State, Dispatch<Action>]

// We want to initialise context with an empty object, and from this moment
// have it typed as ContextProps. Otherwise, we'd need to replace {} with an object
// which matches the State interface, so e.g. include currentUser.
// eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
const StateContext = createContext({} as ContextProps)

export const StateProvider = ({
  children,
  initialState
}: {
  children: JSX.Element
  initialState: State
}) => {
  const state = useReducer(reducer, initialState)

  return <StateContext.Provider value={state}>{children}</StateContext.Provider>
}

export const useAppState = () => useContext(StateContext)
