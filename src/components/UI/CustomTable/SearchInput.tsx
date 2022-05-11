import { useState } from 'react'
import CustomInput from '../Form/CustomInput'

const SearchInput = ({ value, onChanged }: any) => {
  const [search, setSearch] = useState(value)

  const handleSearchChange = (event:any) => {
    setSearch(event.target.value)
  }

  const handleCleanSearch = (event) => {
    setSearch('')
    onChanged('')
  }

  const onEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      onChanged(search)
    }
  }

  return (
    <CustomInput
      label=""
      type="text"
      name="search"
      value={search}
      onChange={handleSearchChange}
      onKeyPress={onEnterKeyPress}
      placeholder="Buscar"
    />
  )
}

export default SearchInput
