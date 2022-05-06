/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
import { Listbox } from '@headlessui/react'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

interface Props {
  control: any
  name: string
  error: any
  options: any,
  required?: boolean,
  label: string,
  setValue: any,
  isIdValue?: boolean,
}
const inputClassName = 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'

const CustomListBox = ({
  control, name, error, options, required, label, setValue, isIdValue = false,
}: Props) => {
  const [optionSelected, setOptionSelected] = useState(options[0])

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
          render={() => (
            <Listbox value={optionSelected} onChange={handleOnSelect}>
              <Listbox.Button className={`${inputClassName} ${error ? 'border-red-500' : 'border-sgray-300'}`}>
                <span>{optionSelected?.name}</span>
              </Listbox.Button>
              <Listbox.Options as="span" className="absolute overflow-auto mt-4 flex flex-col space-y-2 text-lg border max-h-60 border-black rounded-md px-2 py-3 bg-white w-full top-10 inset-x-0">
                {options?.map((option: any) => (
                  <Listbox.Option as="option" className="block text-secondary-100" key={option.id} value={option}>
                    {option.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          )}
        />
      </div>
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  )
}

export default CustomListBox
