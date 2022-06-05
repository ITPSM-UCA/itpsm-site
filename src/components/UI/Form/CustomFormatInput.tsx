/* eslint-disable react/jsx-props-no-spreading */
import NumberFormat from 'react-number-format'
import { Controller } from 'react-hook-form'

const CustomFormatInput = ({
  label,
  name,
  error,
  control,
  required,
  rest,
  placeholder,
  format,
}:any) => (
  <div>
    <label
      aria-required={required}
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
      }:any) => (
        <NumberFormat
          name={name}
          format={format}
          mask="_"
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
          className={`${inputClassName} ${error ? 'border-red-500' : 'border-sgray-300'}`}
          {...rest}
        />
      )}
    />
    {error && <span className="text-red-500 text-xs">{error.message}</span>}
  </div>
)

const inputClassName = 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'

export default CustomFormatInput
