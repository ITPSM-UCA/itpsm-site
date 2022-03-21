import { useRouter } from 'next/router'
import { useState } from 'react'

const SwitchLanguaje = () => {
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState(router.locale)

  const onLanguajeChange = (e:any) => {
    setCurrentLocale(e.target.value)
    router.replace(router.pathname, router.pathname, { locale: e.target.value })
  }
  return (
    <select value={currentLocale} onChange={onLanguajeChange}>
      <option value="es">Español</option>
      <option value="en">Ingles</option>
    </select>
  )
}

export default SwitchLanguaje
