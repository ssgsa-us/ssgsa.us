import { useState } from 'react'
import * as XLSX from 'xlsx'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { addReviewerInvite } from '../../api/reviewerInvite'

export default function InviteReviewers() {
  const [file, setFile] = useState<File>()

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
        const email = reviewer[0]
        const name = reviewer[1]

        addReviewerInvite(email, name)

        if (index == reviewers.length - 1) {
          alert('Sent invites to all reviewers!')
        }
      })
    }

    reader.readAsBinaryString(file)
  }

  return (
    <AdminLayout>
      <div>
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
            className="text-white text-base md:text-lg bg-blue-850 ml-2 px-2 rounded-lg flex flex-row items-center cursor-pointer"
          />
        </div>
        <p className="text-red-850 text-center mb-40">
          Note: Provide the excel file containing the data in the specified
          format.
        </p>
      </div>
    </AdminLayout>
  )
}
