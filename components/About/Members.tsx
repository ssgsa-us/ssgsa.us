import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getMembers } from '../../pages/api/constants'
import { MembersType } from '../../types'

const Members = () => {
  const [members, setMembers] = useState<MembersType>({})
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getMembers()
      .then((data) => setMembers(data))
      .catch(() => setError('Not able to get members list, Try again!'))
  }, [])

  return (
    <div id="Members">
      <h1 className="my-8 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Members
      </h1>
      {!error ? (
        Object.values(members)
          .sort((a, b) => a.index - b.index)
          .map((doc, ind) => (
            <div className="mx-8 my-8" key={ind}>
              <h3 className="text-red-850 font-extrabold text-center text-xl lg:text-2xl">
                {doc.category}
              </h3>
              <div className="flex justify-center mt-4 flex-wrap">
                {doc.members.map((member, index) => (
                  <div
                    className="flex flex-col items-center text-center m-2 p-2 transform duration-200 hover:scale-110 cursor-pointer"
                    style={{ maxWidth: 220 }}
                    key={ind * 10 + index}
                  >
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <p className="font-bold text-sm lg:text-base">
                      {member.name}
                    </p>
                    {member.position && (
                      <p className="text-red-850 font-bold text-xs lg:text-sm">
                        {member.position}
                      </p>
                    )}
                    {member.scholar && (
                      <p className="text-xs lg:text-sm">{member.scholar}</p>
                    )}
                    {member.university && (
                      <p className="text-xs lg:text-sm">{member.university}</p>
                    )}
                    {member.place && (
                      <p className="text-xs lg:text-sm">{member.place}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
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

export default Members
