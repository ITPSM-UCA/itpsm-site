/* eslint-disable react/jsx-props-no-spreading */
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string,
  error?: any,
  register?: any
}

const CustomCheckbox = ({
  name, label, error, register, ...rest
}: Props) => (
  <div>
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          name={name}
          type="checkbox"
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-200 rounded-full"
          {...(register && register(name))}
          {...rest}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="comments" className="font-medium text-gray-700">
          {label}
        </label>
      </div>
    </div>
    {error && <span className="text-red-500 text-xs">{error.message}</span>}
  </div>
)

export default CustomCheckbox
