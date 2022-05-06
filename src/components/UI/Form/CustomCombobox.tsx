/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
import { Combobox } from '@headlessui/react'
import React, { ChangeEvent, useState } from 'react'
import { Controller } from 'react-hook-form'
import { empty } from 'utils/helpers'

interface Props {
  control: any
  name: string
  error: any
  options: any,
  placeholder?: string,
  required?: boolean,
  label: string,
  setValue: any,
  isIdValue?: boolean,
}
const inputClassName = 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'

const CustomCombobox = ({
  control, name, error, options, placeholder, required, label, setValue, isIdValue = false,
}: Props) => {
  const [filteredOptions, setFilteredOptions] = useState([])

  const [optionSelected, setOptionSelected] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>, onChange: any) => {
    const query = e.target?.value === ''
      ? options
      : options.filter((option: any) => option.name?.toLowerCase().includes(e.target?.value.toLowerCase()))
    setFilteredOptions(query ?? options)
    onChange(e)
  }

  const handleOnSelect = (item: any) => {
    setOptionSelected(item)
    if (isIdValue) return setValue(name, item?.id ?? '')
    setValue(name, item?.name ?? '')
  }

  return (
    <div className="relative">
      <label
        aria-required={required}
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur },
          }: any) => (
            <Combobox value={optionSelected} onChange={handleOnSelect}>
              <Combobox.Input
                onBlur={onBlur}
                placeholder={placeholder}
                onChange={(e) => handleChange(e, onChange)}
                displayValue={(option: any) => option?.name ?? ''}
                className={`${inputClassName} ${error ? 'border-red-500' : 'border-sgray-300'}`}
              />
              {
                !empty(filteredOptions)
                && (
                  <Combobox.Options as="span" className="absolute overflow-auto mt-4 flex flex-col space-y-2 text-lg border max-h-60 border-black rounded-md px-2 py-3 bg-white w-full top-10 inset-x-0">
                    {filteredOptions?.map((option: any) => (
                      <Combobox.Option as="option" className="block text-secondary-100" key={option.id} value={option}>
                        {option.name}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )
              }
            </Combobox>
          )}
        />
      </div>
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  )
}

export default CustomCombobox
