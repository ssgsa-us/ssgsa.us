import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/admin-layout'
import {
  addReviewerInvite,
  getAcceptedReviewers,
  getRejetedReviewers,
  getUnresponsiveReviewers,
  sendRevReminder,
} from '../../api/reviewerInvite'

function InviteReviewers() {
  const [file, setFile] = useState<File>()
  const [acceptedReviewers, setAcceptedReviewers] = useState([])
  const [rejectedReviewers, setRejectedReviewers] = useState([])
  const [unresposiveReviewers, setUnresposiveReviewers] = useState([])

  useEffect(() => {
    getAcceptedReviewers()
      .then((data) => {
        setAcceptedReviewers(data)
      })
      .catch(() => alert('Try again, network error!'))

    getRejetedReviewers()
      .then((data) => {
        setRejectedReviewers(data)
      })
      .catch(() => alert('Try again, network error!'))

    getUnresponsiveReviewers()
      .then((data) => {
        setUnresposiveReviewers(data)
      })
      .catch((e) => alert(JSON.stringify(e)))
  }, [])

  const proceed = () => {
    const reader = new FileReader()
    reader.onload = (e) => {
      // Read data from excel file as worksheets
      let data = e.target.result
      let readedData = XLSX.read(data, { type: 'binary' })

      // Get a specific worksheet from file data
      let sheetName = readedData.SheetNames[0]
      let sheet = readedData.Sheets[sheetName]

      // Get all reviewer details as array from worksheet
      let reviewers = XLSX.utils.sheet_to_json(sheet, { header: 1 })

      reviewers.forEach(async (reviewer: Array<string>, index) => {
        if (!index) return // leave first row
        if (!reviewer[0]) return

        // reviewer details
        // reviewer[0] represents reviewer email
        // reviewer[1] represents name of reviewer
        const email = String(reviewer[0]).trim()
        const name = reviewer[1]

        setTimeout(() => {
          addReviewerInvite(email, name)

          if (index === reviewers.length - 1) {
            setTimeout(() => alert('Sent invites to all reviewers!'), 1000)
          }
        }, 1000 * index)
      })
    }

    reader.readAsBinaryString(file)
  }

  const sendReminders = () => {
    unresposiveReviewers.forEach((reviewer, index) => {
      setTimeout(() => {
        sendRevReminder(reviewer.email, reviewer.reminder + 1 || 1)

        if (index === unresposiveReviewers.length - 1) {
          setTimeout(
            () => alert('Sent reminder to unresponsive reviewers!'),
            1000,
          )
        }
      }, 1000 * index)
    })
  }

  return (
    <AdminLayout>
      <div className="py-10">
        <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
          Invite Reviewers
        </h1>

        <div className="flex justify-around mt-20 mb-10">
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-white text-base font-bold md:text-lg bg-gray-500 rounded-lg cursor-pointer w-max"
          />
          <input
            type="submit"
            onClick={proceed}
            className="text-white text-base md:text-lg bg-blue-850 ml-2 px-5 rounded-lg flex flex-row items-center cursor-pointer"
          />
        </div>
        <p className="text-red-850 text-center mb-10">
          Note: Provide the excel file containing the data in the specified
          format.
        </p>

        <div>
          <h2 className="text-sm sm:text-lg md:text-xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
            Accepted Reviewers
          </h2>

          <div className="flex justify-center">
            <table className="border-separate p-2">
              <thead>
                <tr>
                  <th className="border border-blue-850 p-2">S.No.</th>
                  <th className="border border-blue-850 p-2">Name</th>
                  <th className="border border-blue-850 p-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {acceptedReviewers.map((reviewer, index) => (
                  <tr key={index}>
                    <td className="border border-blue-850 p-2">{index + 1}</td>
                    <td className="border border-blue-850 p-2">
                      {reviewer.name}
                    </td>
                    <td className="border border-blue-850 p-2">
                      {reviewer.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-sm sm:text-lg md:text-xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
            Rejected Reviewers
          </h2>

          <div className="flex justify-center">
            <table className="border-separate p-2">
              <thead>
                <tr>
                  <th className="border border-blue-850 p-2">S.No.</th>
                  <th className="border border-blue-850 p-2">Name</th>
                  <th className="border border-blue-850 p-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {rejectedReviewers.map((reviewer, index) => (
                  <tr key={index}>
                    <td className="border border-blue-850 p-2">{index + 1}</td>
                    <td className="border border-blue-850 p-2">
                      {reviewer.name}
                    </td>
                    <td className="border border-blue-850 p-2">
                      {reviewer.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-sm sm:text-lg md:text-xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
            Unresponsive Reviewers
          </h2>

          <div className="flex justify-center mb-10">
            <button
              onClick={sendReminders}
              className="text-white text-base md:text-lg bg-red-850 ml-2 py-2 px-5 rounded-lg flex flex-row items-center cursor-pointer"
            >
              Send Reminders
            </button>
          </div>

          <div className="flex justify-center">
            <table className="border-separate p-2">
              <thead>
                <tr>
                  <th className="border border-blue-850 p-2">S.No.</th>
                  <th className="border border-blue-850 p-2">Name</th>
                  <th className="border border-blue-850 p-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {unresposiveReviewers.map((reviewer, index) => (
                  <tr key={index}>
                    <td className="border border-blue-850 p-2">{index + 1}</td>
                    <td className="border border-blue-850 p-2">
                      {reviewer.name}
                    </td>
                    <td className="border border-blue-850 p-2">
                      {reviewer.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default requireAuth(InviteReviewers, Roles.ADMIN)
