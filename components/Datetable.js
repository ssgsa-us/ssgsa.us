const DateTable = ({ bgcolor, textcolor, textbold }) => {
  return (
    <div className="m-2 text-xs md:text-sm">
      <table className="w-full">
        <tbody>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2 w-2/5`}>
              Opening date of Applications
            </td>
            <td className="border-2 border-gray-300 p-2 w-3/5">Feb 12, 2022</td>
          </tr>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2`}>
              Closing date of Applications
            </td>
            <td className="border-2 border-gray-300 p-2">Mar 15, 2022</td>
          </tr>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2`}>
              Announcement of Shortlisted candidates
            </td>
            <td className="border-2 border-gray-300 p-2">May 8, 2022</td>
          </tr>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2`}>
              Interviews
            </td>
            <td className="border-2 border-gray-300 p-2">
              May 28, 2022 and May 29, 2022
            </td>
          </tr>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2`}>
              Announcement of Sir Syed Global Scholar Awardees 2022-23
            </td>
            <td className="border-2 border-gray-300 p-2">June 6, 2022</td>
          </tr>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2`}>
              Orientation
            </td>
            <td className="border-2 border-gray-300 p-2">June 11, 2022</td>
          </tr>
          <tr>
            <td className={`${bgcolor} ${textcolor} ${textbold} p-2`}>
              Allotment of Mentors
            </td>
            <td className="border-2 border-gray-300 p-2">June 18, 2022</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default DateTable
