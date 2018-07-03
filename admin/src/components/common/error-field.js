import React from 'react'

const ErrorField = ({
  label,
  type,
  input,
  meta: { error, touched, warning }
}) => {
  const errorText = touched &&
    error && <div style={{ color: 'red' }}>{error}</div>
  const warningText = touched &&
    warning && <div style={{ color: 'orange' }}>{warning}</div>
  return (
    <div>
      {label}: <input {...input} type={type} />
      {errorText}
      {warningText}
    </div>
  )
}

export default ErrorField
