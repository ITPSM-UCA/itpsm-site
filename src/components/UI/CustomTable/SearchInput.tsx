import { useState } from 'react'
import CustomInput from '../Form/CustomInput'

const SearchInput = ({ value, onChanged, applyRegex }: any) => {
  const [search, setSearch] = useState(value)

  const handleSearchChange = (event:any) => {
    let value =  event.target.value
    
    if(applyRegex.test(value))
      setSearch(event.target.value)
  }

  // const handleCleanSearch = (event:any) => {
  //   setSearch('')
  //   onChanged('')
  // }

  const onEnterKeyPress = (event:any) => {
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
