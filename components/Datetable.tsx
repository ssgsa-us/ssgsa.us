import { useEffect, useState } from 'react'
import { getApplicationDates } from '../pages/api/constants'
import { ApplicationDatesType } from '../types'

const DateTable = ({ bgcolor, textcolor, textbold }) => {
  const [dates, setDates] = useState<ApplicationDatesType>({})

  useEffect(() => {
    getApplicationDates()
      .then((data) => setDates(data))
      .catch(() => {})
  }, [])

  return (
    <div className="m-2 text-xs md:text-sm">
      <table className="w-full">
        <tbody>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2 w-2/5`}>
              Opening date of Applications
            </td>
            <td className="border-2 border-gray-300 p-2 w-3/5">
              {dates.openingDate || '-'}
            </td>
          </tr>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2`}>
              Closing date of Applications
            </td>
            <td className="border-2 border-gray-300 p-2">
              {dates.closingDate || '-'}
            </td>
          </tr>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2`}>
              Announcement of Shortlisted candidates
            </td>
            <td className="border-2 border-gray-300 p-2">
              {dates.shortlistAnnouncement || '-'}
            </td>
          </tr>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2`}>
              Interviews
            </td>
            <td className="border-2 border-gray-300 p-2">
              {dates.interviewDates || '-'}
            </td>
          </tr>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2`}>
              Announcement of Sir Syed Global Scholar Awardees{' '}
              {dates.session || ''}
            </td>
            <td className="border-2 border-gray-300 p-2">
              {dates.awardeesAnnouncement || '-'}
            </td>
          </tr>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2`}>
              Orientation
            </td>
            <td className="border-2 border-gray-300 p-2">
              {dates.orientationDate || '-'}
            </td>
          </tr>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2`}>
              Allotment of Mentors
            </td>
            <td className="border-2 border-gray-300 p-2">
              {dates.mentorAllotmentDate || '-'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DateTable
