import { useState, useEffect } from 'react'
import { getSuccessfulScholarsList } from '../../pages/api/constants'
import { SuccScholarSessionType } from '../../types'

const SuccessfulScholars = () => {
  const [currentSession, setCurrentSession] = useState<string>('2007')
  const [scholars, setScholars] = useState<Array<SuccScholarSessionType>>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getSuccessfulScholarsList()
      .then((data) =>
        setScholars(Object.values(data).sort((a, b) => a.index - b.index)),
      )
      .catch(() =>
        setError('Not able to get successful scholars list, Try again!'),
      )
  }, [])

  return (
    <div id="Scholars">
      <h1 className="my-8 mx-4 sm:mx-12 lg:mx-20 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Successful Scholars
      </h1>
      {!error ? (
        <>
          <div
            className="flex flex-wrap justify-around my-8 mx-4 sm:mx-12 lg:mx-20 bg-gray-200"
            style={{ fontFamily: 'Lora' }}
          >
            {scholars.map((doc, index) => (
              <h3
                className={`text-red-850 ${
                  currentSession == doc.session ? 'bg-blue-850' : ''
                } font-bold w-32 text-center text-xl px-4 py-2 cursor-pointer`}
                onClick={() => setCurrentSession(doc.session)}
                key={index}
              >
                {doc.session}
              </h3>
            ))}
          </div>
          <div className=" my-8 mx-4 sm:mx-12 lg:mx-20">
            {scholars.map((doc, index) => (
              <table
                className="w-full"
                hidden={currentSession != doc.session}
                key={index}
              >
                <tbody>
                  {doc.scholars.map((scholar, ind) => (
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
        </>
      ) : (
        <div>
          <h3 className="text-red-850 text-center text-lg lg:text-xl">
            <span className="font-bold">Error -</span> {error}
          </h3>
        </div>
      )}
    </div>
  )
}

export default SuccessfulScholars
