import { useEffect, useState } from 'react'
import { getAwardees } from '../../pages/api/constants'
import { AwardeeType } from '../../types'

const Awardees = () => {
  const [currentSession, setCurrentSession] = useState('2007-08')
  const [awardees, setAwardees] = useState<Array<AwardeeType>>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getAwardees()
      .then((data) =>
        setAwardees(Object.values(data).sort((a, b) => a.index - b.index)),
      )
      .catch(() => setError('Not able to get awardees list, Try again!'))
  }, [])

  return (
    <div id="Awardees">
      <h1 className="my-8 mx-4 sm:mx-12 lg:mx-20 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Awardees
      </h1>
      {!error ? (
        <>
          <div
            className="flex flex-wrap justify-around my-8 mx-4 sm:mx-12 lg:mx-20 bg-gray-200"
            style={{ fontFamily: 'Lora' }}
          >
            {awardees.map((doc, index) => (
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
            {awardees.map((doc, index) => {
              if (currentSession != doc.session) return null
              return (
                <table className="w-full" key={index}>
                  <tbody>
                    {doc.awardees.map((awardee, ind) => (
                      <tr key={ind}>
                        <td className="bg-gray-200 text-blue-850 font-bold p-2 w-2/5">
                          {awardee.name}
                        </td>
                        <td className="p-2 w-3/5">{awardee.field}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            })}
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

export default Awardees
