/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
import { ChangeEvent, useState, useEffect } from 'react'
import { empty } from 'utils/helpers'
import { HiSelector } from 'react-icons/hi'
import { Controller } from 'react-hook-form'
import { Combobox } from '@headlessui/react'
import { AiOutlineCheck } from 'react-icons/ai'

interface Option {
  value: number,
  label: string,
}

interface Props {
  control: any
  name: string
  initialValue: any,
  setValue: any
  options: any,
  label: string,
  required?: boolean,
  error: any,
  placeholder?: string,
  clearErrors: any,
}

const CustomCombobox = ({
  name,
  error,
  label,
  control,
  options,
  setValue,
  required,
  clearErrors,
  placeholder,
  initialValue,
}: Props) => {
  const [query, setQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(initialValue)
  const [filteredData, setFilteredData] = useState(options)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setQuery(value)

    if (empty(value)) return

    const filtered = options.filter((item: Option) => item.label.toLowerCase().includes(value.toLowerCase()))
    setFilteredData(filtered)
  }

  const onSelectOption = (item: Option, onBlur: any) => {
    setSelectedItem(item)

    setValue(name, item?.value)

    clearErrors(name)

    onBlur()
  }

  const inputClassName = 'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'

  return (
    <div className="items-center">
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
            field: { onBlur },
          }) => (
            <div className="items-center">
              <Combobox value={selectedItem} onChange={(item: Option) => onSelectOption(item, onBlur)}>
                <div className="relative mt-1">
                  <div className="relative w-full cursor-default overflow-hidden rounded-md bg-secondary text-secondary-100 focus:outline-none">
                    <Combobox.Input
                      onBlur={onBlur}
                      placeholder={placeholder}
                      displayValue={(option: Option) => option?.label ?? ''}
                      onChange={handleChange}
                      className={`${inputClassName} ${error ? 'border-red-500' : 'border-sgray-300'}`}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <HiSelector className="h-5 w-5 text-secondary-100" aria-hidden="true" />
                    </Combobox.Button>
                  </div>
                  <Combobox.Options
                    className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-secondary py-1 text-base shadow-lg focus:outline-none"
                  >
                    {empty(filteredData) && !empty(query) ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-secondary-100 text-base">
                        No se encontró.
                      </div>
                    ) : (
                      filteredData.slice(0, 100).map((option: Option) => (
                        <ComboboxOption key={option.value} option={option} />
                      ))
                    )}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>
          )}
        />
      </div>
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  )
}

const ComboboxOption = ({ option }: any) => (
  <Combobox.Option
    className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-700 opacity-70 text-white' : 'text-indigo-700'}`}
    value={option}
  >
    {({ selected, active }) => (
      <>
        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
          {option.label}
        </span>
        {selected && (
          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-indigo-700'}`}>
            <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </>
    )}
  </Combobox.Option>
)

export default CustomCombobox
