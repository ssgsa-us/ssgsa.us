import '@fortawesome/fontawesome-svg-core/styles.css' // import for spin
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import requireAuth from '../../../components/requireAuth'
import UsersTable from '../../../components/UsersTable'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/ApplicationsLayout'
import {
  addInterviewerInvite,
  getAcceptedInterviewers,
  getRejetedInterviewers,
  getUnresponsiveInterviewers,
  sendIntReminder,
} from '../../api/interviewerInvite'

function InviteInterviewers() {
  const [file, setFile] = useState<File>()
  const [acceptedInterviewers, setAcceptedInterviewers] = useState([])
  const [rejectedInterviewers, setRejectedInterviewers] = useState([])
  const [unresposiveInterviewers, setUnresposiveInterviewers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAcceptedInterviewers()
      .then((data) => {
        setAcceptedInterviewers(data)
      })
      .catch(() => alert('Try again, network error!'))

    getRejetedInterviewers()
      .then((data) => {
        setRejectedInterviewers(data)
      })
      .catch(() => alert('Try again, network error!'))

    getUnresponsiveInterviewers()
      .then((data) => {
        setUnresposiveInterviewers(data)
      })
      .catch((e) => alert(JSON.stringify(e)))
  }, [])

  const proceed = () => {
    if (loading) return
    if (!file) return

    setLoading(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      // Read data from excel file as worksheets
      let data = e.target.result
      let readedData = XLSX.read(data, { type: 'binary' })

      // Get a specific worksheet from file data
      let sheetName = readedData.SheetNames[0]
      let sheet = readedData.Sheets[sheetName]

      // Get all Interviewer details as array from worksheet
      let interviewers = XLSX.utils.sheet_to_json(sheet, { header: 1 })

      interviewers.forEach(async (interviewer: Array<string>, index) => {
        if (!index) return // leave first row
        if (!interviewer[0]) return

        // Interviewer details
        // Interviewer[0] represents Interviewer email
        // Interviewer[1] represents name of Interviewer
        const email = String(interviewer[0]).trim()
        const name = interviewer[1]

        setTimeout(() => {
          addInterviewerInvite(email, name)

          if (index === interviewers.length - 1) {
            setTimeout(() => {
              setLoading(false)
              alert('Sent invites to all Interviewers!')
            }, 1000)
          }
        }, 1000 * index)
      })
    }

    reader.readAsBinaryString(file)
  }

  const sendReminders = () => {
    if (loading) return

    setLoading(true)
    unresposiveInterviewers.forEach((interviewer, index) => {
      setTimeout(() => {
        sendIntReminder(interviewer.email, interviewer.reminder + 1 || 1)

        if (index === unresposiveInterviewers.length - 1) {
          setTimeout(() => {
            setLoading(false)
            alert('Sent reminder to unresponsive Interviewers!')
          }, 1000)
        }
      }, 1000 * index)
    })
  }

  return (
    <AdminLayout>
      <div className="py-10">
        <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
          Invite Interviewers
        </h1>

        <div className="flex justify-around mt-20 mb-10">
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-white text-base font-bold md:text-lg bg-gray-500 rounded-lg cursor-pointer w-max"
          />
          <button
            onClick={proceed}
            className="text-white text-base md:text-lg bg-blue-850 ml-2 px-5 rounded-lg flex flex-row items-center cursor-pointer"
          >
            {!loading ? (
              'Submit'
            ) : (
              <FontAwesomeIcon
                icon={faSpinner}
                width={30}
                spin={true}
                className="mx-5"
              />
            )}
          </button>
        </div>
        <p className="text-red-850 text-center mb-10">
          Note: Provide the excel file containing the data in the specified
          format.
        </p>

        <div>
          <h2 className="text-sm sm:text-lg md:text-xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
            Accepted Interviewers
          </h2>

          <div className="flex justify-center">
            <UsersTable users={acceptedInterviewers} />
          </div>
        </div>

        <div>
          <h2 className="text-sm sm:text-lg md:text-xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
            Rejected Interviewers
          </h2>

          <div className="flex justify-center">
            <UsersTable users={rejectedInterviewers} />
          </div>
        </div>

        <div>
          <h2 className="text-sm sm:text-lg md:text-xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
            Unresponsive Interviewers
          </h2>

          <div className="flex justify-center mb-10">
            <button
              onClick={sendReminders}
              className="text-white text-base md:text-lg bg-red-850 ml-2 py-2 px-5 rounded-lg flex flex-row items-center cursor-pointer"
            >
              {!loading ? (
                'Send Reminders'
              ) : (
                <FontAwesomeIcon
                  icon={faSpinner}
                  width={30}
                  spin={true}
                  className="mx-5"
                />
              )}
            </button>
          </div>

          <div className="flex justify-center">
            <UsersTable users={unresposiveInterviewers} />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default requireAuth(InviteInterviewers, Roles.ADMIN)
