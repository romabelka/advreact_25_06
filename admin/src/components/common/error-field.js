import React from 'react'

const ErrorField = ({ label, type, input, meta: { error, touched } }) => {
  const errorText = touched &&
    error && <div style={{ color: 'red' }}>{error}</div>
  return (
    <div>
      {label}: <input {...input} type={type} />
      {errorText}
    </div>
  )
}

export default ErrorField
