import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ActionType, useAppState } from '../state'

export const Layout = ({ children }: { children: ReactNode }) => {
  const [{ currentUser }, dispatch] = useAppState()

  return (
    <>
      <nav className="navbar navbar-light bg-light mb-3">
        <div className="container">
          <Link to="/" className="navbar-brand">
            AirHelp
          </Link>

          <span className="navbar-text d-flex align-items-center">
            🦁 {currentUser && currentUser.email}
            <button
              className="btn btn-outline-secondary ml-2"
              onClick={() => dispatch({ type: ActionType.SIGN_OUT })}
            >
              Sign out
            </button>
          </span>
        </div>
      </nav>

      <div className="container">{children}</div>

      <div className="container mt-5">
        <nav className="navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button className="btn btn-light">EN / EUR</button>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Air Passenger Rights
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Help
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Terms and Conditions
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Privacy Policy
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact Us
              </a>
            </li>
          </ul>
          <span className="navbar-text">© 2019 AirHelp</span>
        </nav>
      </div>
    </>
  )
}
