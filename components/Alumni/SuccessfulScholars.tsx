import { useState, useEffect } from 'react'
import { getSuccessfulScholarsList } from '../../pages/api/constants'
import { SuccessfulScholarsType } from '../../types'

const SuccessfulScholars = () => {
  const [currentSession, setCurrentSession] = useState<number>(2007)
  const [scholars, setScholars] = useState<SuccessfulScholarsType>({})

  useEffect(() => {
    getSuccessfulScholarsList()
      .then((data) => setScholars(data))
      .catch(() =>
        alert('Not able to get successful scholars list, Try again!'),
      )
  }, [])

  return (
    <div id="Scholars">
      <h1 className="my-8 mx-4 sm:mx-12 lg:mx-20 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Successful Scholars
      </h1>
      <div
        className="flex flex-wrap justify-around my-8 mx-4 sm:mx-12 lg:mx-20 bg-gray-200"
        style={{ fontFamily: 'Lora' }}
      >
        {Object.keys(scholars)
          .sort()
          .map((id, index) => (
            <h3
              className={`text-red-850 ${
                currentSession == scholars[id].session ? 'bg-blue-850' : ''
              } font-bold w-32 text-center text-xl px-4 py-2 cursor-pointer`}
              onClick={() => setCurrentSession(scholars[id].session)}
              key={index}
            >
              {scholars[id].session}
            </h3>
          ))}
      </div>
      <div className=" my-8 mx-4 sm:mx-12 lg:mx-20">
        {Object.keys(scholars)
          .sort()
          .map((id, index) => (
            <table
              className="w-full"
              hidden={currentSession != scholars[id].session}
              key={index}
            >
              <tbody>
                {scholars[id].scholars.map((scholar, ind) => (
                  <tr key={ind}>
                    <td className="bg-gray-200 text-blue-850 font-bold p-2 w-2/5">
                      {scholar.name}
                    </td>
                    <td className="p-2 w-3/5">{scholar.field}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
      </div>
    </div>
  )
}

export default SuccessfulScholars
