import React from 'react'

const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-dark"
      style={{ flexDirection: 'column' }}
    >
      <div>
        <div className="spinner-border text-primary m-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-border text-secondary m-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-border text-success m-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-border text-danger m-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-border text-warning m-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-border text-info m-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-border text-light m-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-border text-dark m-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>

      <h5 className="text-light mt-4">Loading...</h5>
    </div>
  )
}

export default Spinner
