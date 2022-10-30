import React from 'react'

const GradesEvaluations = ({ subjectsByCycles,subjectName }: any) => (
  <fieldset className="border border-gray-300 rounded-lg mt-4 p-4">
    <legend className="font-medium text-indigo-600">{subjectName}</legend>

      <div>
       
        <Evaluations subjects={subjectsByCycles} />
      </div>
 
  </fieldset>
)


const Evaluations = ({ subjects }: any) => {
  
  
  let total=0
  subjects.map((Evaluation: any) => (total+=Evaluation?.percentage*Evaluation?.score/100))
  console.log(total)
  return(
  
  <div className="-mx-4 mt-5 mb-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
            Evaluacion
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell"
          >
            Fecha
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 lg:table-cell"
          >
            Porcentaje
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-center text-sm font-semibold text-gray-900 sm:table-cell"
          >
            Nota
          </th>
      
         
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {subjects?.map((Evaluation: any) => (
          <tr key={Evaluation?.id}>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
              {Evaluation?.name}
             
           
            
             
            </td>
           
            <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{Evaluation?.date}</td>
            <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{Evaluation?.percentage}</td>
            <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell">{Evaluation?.score}</td>
           
          </tr>
        ))}
      </tbody>
      <tfoot>
          <tr>
          <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell"></td>
          <td className="hidden px-3 py-4 text-sm text-center text-gray-500 sm:table-cell"></td>
          <td className="hidden px-3 py-4 text-sm text-center  sm:table-cell">Nota Final:</td>
          <td className="hidden px-3 py-4 text-sm text-center  sm:table-cell">{total.toFixed(2)}</td>
          </tr>
      </tfoot>
    </table>
  </div>
)}

export default GradesEvaluations
