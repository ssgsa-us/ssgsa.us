import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'
import {
  AwardeeType,
  LeaderType,
  MemberType,
  MonthStoryType,
  NewsletterType,
  ResourceType,
  SuccScholarType,
} from '../../../types'

type FieldType = {
  name: string
  title: string
  required: boolean
}

type ConstantType =
  | MemberType
  | AwardeeType
  | SuccScholarType
  | NewsletterType
  | MonthStoryType
  | ResourceType
  | LeaderType

type Props = {
  title: string
  fields: Array<FieldType>
  constant: ConstantType
  setConstant: Dispatch<SetStateAction<ConstantType>>
  updateConstant: () => void
  closeModal: () => void
}

export default function UpdateConstantModal({
  title,
  fields,
  constant,
  setConstant,
  updateConstant,
  closeModal,
}: Props) {
  const onChange = (e) =>
    setConstant((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

  if (!constant) return null
  return (
    <div className="fixed top-0 left-0 w-full h-full z-50">
      <div className="flex justify-center items-center w-full h-full">
        <div className="navgroup-box w-full sm:w-3/4 lg:w-1/2 p-8">
          <div className="flex flex-col bg-gray-200 border-0 rounded-lg shadow-lg">
            {/*header*/}
            <div className="flex items-center border-b border-solid border-blue-850 rounded-t p-5">
              <h3 className="text-2xl text-blue-850 text-center w-11/12 font-bold">
                {title}
              </h3>
              <div className="w-1/12">
                <FontAwesomeIcon
                  className="text-red-850 cursor-pointer"
                  icon={faTimesCircle}
                  width={25}
                  onClick={closeModal}
                />
              </div>
            </div>
            {/*body*/}
            <div className="px-5">
              {fields.map((field: FieldType, index: number) => (
                <div className="flex items-center my-5" key={index}>
                  <p className="text-red-850 text-lg sm:text-xl font-extrabold w-2/5">
                    {field.title}
                    {field.required ? (
                      <span className="text-red-850 font-black">*</span>
                    ) : null}
                  </p>
                  <input
                    name={field.name}
                    type="text"
                    value={constant[field.name]}
                    onChange={onChange}
                    className="border-2 border-gray-300 w-3/5 rounded-xl p-2"
                  />
                </div>
              ))}
              <div className="flex justify-center my-5">
                <button
                  className="text-white text-base md:text-lg bg-red-850 mb-4 sm:ml-4 sm:mb-0 py-2 px-2 rounded-lg"
                  onClick={() =>
                    fields
                      .map((field) =>
                        field.required ? !!constant[field.name] : true,
                      )
                      .find((value) => value === false) === false
                      ? alert('Please provide the required fields')
                      : updateConstant()
                  }
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
