/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label: string,
  error?: any,
  register?: any,
  required?: boolean,
  containerClassName?: string,
  placeholder?: string,
  isReadOnly?: boolean,
}

const inputClassName = 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'

const CustomInput = ({
  label,
  name,
  error,
  register,
  required,
  placeholder,
  isReadOnly = false,
  ...rest
}: Props) => (
  <div>
    <label
      aria-required={required}
      htmlFor={name}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <div className="mt-1">
      <input
        placeholder={placeholder}
        name={name}
        className={`${inputClassName} ${error ? 'border-red-500' : 'border-sgray-300'}`}
        {...(register && register(name, { required }))}
        {...rest}
        readOnly={isReadOnly}
      />
    </div>
    {error && <span className="text-red-500 text-xs">{error.message}</span>}
  </div>
)

export default CustomInput
