import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { getResult } from 'services/Evaluation'

interface Props {
  data: any,

}

const EvaluationsForm = ({
  data,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState,
    control,
    setValue,
    clearErrors,
    // reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: data,
    resolver: yupResolver(schema),
  })
  const [commentario, setComment] = useState('')

  const fetchData = async () => {
    const response = await getResult(data.id)
    setComment(response.data.attributes.comment)
    console.log(response)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {
        commentario !== ''
        && (
          <p>
            Comentario:
            {`   ${commentario}`}
          </p>
        )
      }
    </>
  )
}

const schema = yup.object()
  .shape({
    name: yup.string()
      .required('Este campo es obligatorio.'),
    description: yup.string()
      .required('Este campo es obligatorio.'),

    percentage: yup.number()
      .required('Este campo es obligatorio.')
      .positive(),
    curriculum_subject_id: yup.number()
      .required('Este campo es obligatorio.')
      .positive()
      .integer(),
    code: yup.number()
      .positive(),
    eval_id: yup.number()
      .positive(),
    period_id: yup.number()
      .required('Este campo es obligatorio.')
      .positive()
      .integer(),
  })

export default EvaluationsForm
