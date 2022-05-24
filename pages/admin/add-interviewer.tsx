import emailjs from 'emailjs-com'
import { useState } from 'react'
import * as XLSX from 'xlsx'
import { Interviewer } from '../../classes/interviewer'
import firebase from '../../firebase'
import AdminLayout from '../../layouts/admin/admin-layout'
import { createInterviewer } from '../api/createInterviewer'

export default function AddInterviewer() {
  const [file, setFile] = useState<File>()
  const [addedInterviewers, setAddedInterviewers] = useState<Interviewer[]>([])
  const [removedInterviewers, setRemovedInterviewers] = useState<Interviewer[]>(
    [],
  )

  const createAccount = async (secondaryFirebaseApp, interviewer, password) => {
    await secondaryFirebaseApp
      .auth()
      .createUserWithEmailAndPassword(interviewer[0], password)
      .then(async (result: firebase.auth.UserCredential) => {
        try {
          secondaryFirebaseApp.auth().signOut()
        } catch (e) {
          console.log('Not able to sign out', interviewer[0])
        }

        // add interviewer data to firestore database
        createInterviewer(
          result.user.uid,
          interviewer[0],
          interviewer[1],
          interviewer[2],
          interviewer[3],
        )

        setAddedInterviewers((prevAddedInterviewers) => [
          ...prevAddedInterviewers,
          new Interviewer(
            interviewer[0],
            interviewer[2],
            interviewer[3],
            interviewer[1],
          ),
        ])

        let templateParams = {
          email: interviewer[0],
          personal_email: interviewer[1],
          name: interviewer[2],
          set: interviewer[3],
          zoom_link: interviewer[4],
          day: interviewer[5],
          date: interviewer[6],
          exec_name: interviewer[7],
          password: password,
        }
        emailjs.send(
          process.env.EMAILJS_SERVICE_ID,
          process.env.EMAILJS_INTERVIEWER_TEMPLATE_ID,
          templateParams,
          process.env.EMAILJS_USER_ID,
        )
      })
      .catch(() => {
        setRemovedInterviewers((prevRemovedInterviewers) => [
          ...prevRemovedInterviewers,
          new Interviewer(
            interviewer[0],
            interviewer[2],
            interviewer[3],
            interviewer[1],
          ),
        ])
      })
  }

  const proceed = () => {
    const reader = new FileReader()
    reader.onload = (e) => {
      // Create a new firebase app for account creation
      const FirebaseCredentials = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      }
      let secondaryFirebaseApp = firebase.initializeApp(
        FirebaseCredentials,
        'Secondary',
      )

      // Read data from excel file as worksheets
      let data = e.target.result
      let readedData = XLSX.read(data, { type: 'binary' })

      // Get a specific worksheet from file data
      let sheetName = readedData.SheetNames[0]
      let sheet = readedData.Sheets[sheetName]

      // Get all interviewer details as array from worksheet
      let interviewers = XLSX.utils.sheet_to_json(sheet, { header: 1 })

      interviewers.forEach(async (interviewer: Array<string>, index) => {
        if (!index) return // leave first row
        if (!interviewer[0]) return

        // interviewer details
        // interviewer[0] represents email from which account is created
        // interviewer[1] represents personal email on which details are to be mailed
        // interviewer[2] represents name of interviewer
        // interviewer[3] represents interviewer set

        // Generate a random password
        let charset =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let password = ''
        for (let i = 0; i < 8; i++)
          password += charset.charAt(Math.floor(Math.random() * 62))
        interviewer.push(password)

        // Create account of interviewer using signup on new firebase app
        await createAccount(secondaryFirebaseApp, interviewer, password)

        if (index == interviewers.length - 1) {
          alert('Added all interviewers')
          // Delete firebase application created above
          secondaryFirebaseApp.delete()
        }
      })

      let newSheet = XLSX.utils.json_to_sheet(interviewers)
      XLSX.utils.book_append_sheet(readedData, newSheet, 'New Sheet')
      XLSX.writeFile(readedData, 'NewInterviewers.xlsx')
    }

    reader.readAsBinaryString(file)
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
          Add New Interviewer
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
            className="text-white text-base md:text-lg bg-blue-850 ml-2 px-2 rounded-lg flex flex-row items-center cursor-pointer"
          />
        </div>
        <p className="text-red-850 text-center mb-40">
          Note: Provide the excel file containing the data in the specified
          format.
        </p>

        {!addedInterviewers.length ? null : (
          <div className="my-10">
            <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
              Added Interviewers
            </h1>
            <div className="flex justify-center">
              <table className="border p-2">
                <thead>
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Set</th>
                    <th className="border p-2">Personal Email</th>
                  </tr>
                </thead>
                <tbody>
                  {addedInterviewers.map(
                    (interviewer: Interviewer, index: number) => (
                      <tr key={index}>
                        <td className="border p-2">{interviewer.name}</td>
                        <td className="border p-2">{interviewer.email}</td>
                        <td className="border p-2">{interviewer.set}</td>
                        <td className="border p-2">
                          {interviewer.personal_email}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!removedInterviewers.length ? null : (
          <div className="my-10">
            <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
              Removed Interviewers
            </h1>
            <div className="flex justify-center">
              <table className="border p-2">
                <thead>
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Set</th>
                    <th className="border p-2">Personal Email</th>
                  </tr>
                </thead>
                <tbody>
                  {removedInterviewers.map(
                    (interviewer: Interviewer, index: number) => (
                      <tr key={index}>
                        <td className="border p-2">{interviewer.name}</td>
                        <td className="border p-2">{interviewer.email}</td>
                        <td className="border p-2">{interviewer.set}</td>
                        <td className="border p-2">
                          {interviewer.personal_email}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
