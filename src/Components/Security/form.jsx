import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../General/Button component/Button'

export default function Form() {
  return (
    <form action="">
      <div className="mt-2 py-2 d-flex flex-column">
        <label htmlFor="current-password">Current password</label>

        <div className="">
          <input
            className="rounded-1 text-input"
            type="password"
            name="currentPassword"
          />
        </div>
      </div>

      <div className="mt-1 py-2 d-flex flex-column">
        <label htmlFor="new-password">New password</label>

        <div className="">
          <input
            className="rounded-1 text-input"
            type="password"
            name="newPassword"
          />
        </div>
      </div>

      <div className="mt-1 py-2 d-flex flex-column">
        <label htmlFor="confirm-new-password">Confirm password</label>

        <div className="">
          <input
            className="rounded-1 text-input"
            type="password"
            name="confirmPassword"
          />
        </div>
      </div>
      <Link to="/" className="mt-4">
        Forgot password?
      </Link>

      <div className="d-flex mt-5 justify-content-center align-items-center">
        <Button
          style={{ backgroundColor: "#ebebeb", color: "#ffffff" }}
        >
          Discard Changes
        </Button>

        <Button style={{ backgroundColor: "#2962f2", color: "#000" }}>
          Save Changes
        </Button>
      </div>
    </form>
  )
}
