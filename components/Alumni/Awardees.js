import { useState } from 'react'
import { awardees } from '../../constants/awardees'

const Awardees = () => {
  const [currentSession, setCurrentSession] = useState('2007-08')

  return (
    <div id="Awardees">
      <h1 className="my-8 mx-4 sm:mx-12 lg:mx-20 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Awardees
      </h1>
      <div
        className="flex flex-wrap justify-around my-8 mx-4 sm:mx-12 lg:mx-20 bg-gray-200"
        style={{ fontFamily: 'Lora' }}
      >
        {awardees.map((session, index) => (
          <h3
            className={`text-red-850 ${
              currentSession == session.session ? 'bg-blue-850' : ''
            } font-bold w-32 text-center text-xl px-4 py-2 cursor-pointer`}
            onClick={() => setCurrentSession(session.session)}
            key={index}
          >
            {session.session}
          </h3>
        ))}
      </div>
      <div className=" my-8 mx-4 sm:mx-12 lg:mx-20">
        {awardees.map((session, index) => (
          <table
            className="w-full"
            hidden={currentSession != session.session}
            key={index}
          >
            <tbody>
              {session.awardees.map((awardee, ind) => (
                <tr key={ind}>
                  <td className="bg-gray-200 text-blue-850 font-bold p-2 w-2/5">
                    {awardee.name}
                  </td>
                  <td className="p-2 w-3/5">{awardee.field}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  )
}

export default Awardees
