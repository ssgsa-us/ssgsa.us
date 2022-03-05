import React from 'react'
import { faculties } from '../../constants/faculties'

export default function ApplyFacultyModal() {
  const [showModal, setShowModal] = React.useState(true)
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl text-red-850 text-center rounded-3xl ">
                    Please choose your faculty
                  </h3>
                </div>
                {/*body*/}
                {faculties.map((faculty, index) => {
                  return (
                    <div className="relative p-6 flex-auto" key="index">
                      <input
                        className="my-2 text-lg"
                        type="radio"
                        id={faculty.label}
                        value={faculty.label}
                      />
                      <label className="pl-5 text-blue-850">
                        {faculty.value}
                      </label>
                    </div>
                  )
                })}
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-white text-lg md:text-xl bg-blue-850 font-bold py-2 px-5 rounded-lg flex flex-row items-center"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save and Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
