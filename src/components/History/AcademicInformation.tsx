import React from 'react'
import { useSelector } from 'react-redux'

interface Props {
  career: string
}

const AcademicInformation = ({ career }: Props) => {
  const { name, email, created_at } = useSelector((state: any) => state.user.userInformation)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-5">{name}</h1>
      <section aria-labelledby="applicant-information-title">
        <div className="bg-white shadow-md border-2 sm:rounded-lg ">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
              Información del estudiante
            </h2>
          </div>
          <div className="px-4 py-4 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Plan de estudio</dt>
                <dd className="mt-1 text-sm text-gray-900">{career}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Correo institucional</dt>
                <dd className="mt-1 text-sm text-gray-900">{email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Año de ingreso</dt>
                <dd className="mt-1 text-sm text-gray-900">{created_at.slice(0, 4)}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">CUM</dt>
                <dd className="mt-1 text-sm text-gray-900">0.00 (mínimo para egresar: 7.00)</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Estado</dt>
                <dd className="mt-1 text-sm text-gray-900">En curso</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">UV aprobadas</dt>
                <dd className="mt-1 text-sm text-gray-900">0</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>

  )
}

export default AcademicInformation
