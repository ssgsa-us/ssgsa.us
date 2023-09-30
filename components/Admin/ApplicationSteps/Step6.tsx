import { Dispatch, SetStateAction, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { updateApplicationStatus } from '../../../pages/api/applications/updateApplicationStatus'
import { updateReviewSet } from '../../../pages/api/updateReviewSet'
import Step9 from '../../ReviewApplicationSteps/Step9'
import SetDropdown from '../SetDropdown'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
  formStatus: number
  changeOccured: boolean
  setChangeOccured: Dispatch<SetStateAction<boolean>>
}

const AdminStep6 = ({
  applId,
  applicationData,
  adminPortalData,
  status,
  setStatus,
  formStatus,
  changeOccured,
  setChangeOccured,
}: Props) => {
  return (
    <div className="w-full">
      <Step9 otherInfo={applicationData.other_information} />

      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5 mb-10">
          Application Status
        </h1>

        <div className="flex flex-col items-center">
          <p className="text-red-850 text-2xl mb-5">
            {!adminPortalData.application_status
              ? 'Not Checked'
              : adminPortalData.application_status == 1
              ? 'Removed'
              : adminPortalData.application_status == 2
              ? 'Finalised For Review'
              : adminPortalData.application_status == 3
              ? 'Reviewed'
              : adminPortalData.application_status == 4
              ? 'Finalised For Interview'
              : 'Interviewed'}
          </p>
          {adminPortalData.application_status == 2 ? (
            <div className="flex items-center mb-5">
              <p className="text-xl mr-10">Assign Set</p>
              <SetDropdown
                set={adminPortalData.review_set}
                onChange={(e) => {
                  let set = e.target.value
                  updateReviewSet(applId, set)
                    .then(() => {
                      setChangeOccured(!changeOccured)
                    })
                    .catch(() => alert('Try again, network error!'))
                }}
                disabled={false}
              />
            </div>
          ) : null}
          {!adminPortalData.application_status ? (
            <button
              className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850 mb-5"
              onClick={() =>
                updateApplicationStatus(applId, 2)
                  .then(() => setChangeOccured(!changeOccured))
                  .catch(() => alert('Try again, network error!'))
              }
            >
              Finalise For Review
            </button>
          ) : null}
          {!adminPortalData.application_status ||
          adminPortalData.application_status == 2 ? (
            <button
              className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850 mb-5"
              onClick={() =>
                updateApplicationStatus(applId, 1)
                  .then(() => setChangeOccured(!changeOccured))
                  .catch(() => alert('Try again, network error!'))
              }
            >
              Remove
            </button>
          ) : null}
          {adminPortalData.application_status == 1 ? (
            <button
              className="text-white text-base md:text-lg py-1 px-3 rounded-lg bg-red-850 mb-5"
              onClick={() =>
                updateApplicationStatus(applId, 0)
                  .then(() => setChangeOccured(!changeOccured))
                  .catch(() => alert('Try again, network error!'))
              }
            >
              Unremove
            </button>
          ) : null}
        </div>
      </div>

      <ProceedButtons
        status={status}
        setStatus={setStatus}
        formStatus={formStatus}
        error=""
      />
    </div>
  )
}

export default AdminStep6
