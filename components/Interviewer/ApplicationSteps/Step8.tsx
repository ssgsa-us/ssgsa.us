import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { updateInterviewMarks } from '../../../pages/api/updateInterviewMarks'
import { InterviewerInstructionsType } from '../../../types'
import Textarea from '../../ApplicationSteps/Textarea'
import TextInput from '../../ApplicationSteps/TextInput'
import Field from '../../ReviewApplicationSteps/Field'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  intInstructions: InterviewerInstructionsType
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const InterviewerStep8 = ({
  applId,
  applicationData,
  adminPortalData,
  intInstructions,
  formStatus,
  status,
  setStatus,
}: Props) => {
  const { authUser } = useAuth()
  const [higherStudiesMot, setHigherStudiesMot] = useState<number>(0)
  const [communication, setCommunication] = useState<number>(0)
  const [researchAptitude, setResearchAptitude] = useState<number>(0)
  const [motivationToGoBack, setMotivationToGoBack] = useState<number>(0)
  const [totalMarks, setTotalMarks] = useState<number>(0)
  const [remark, setRemark] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (
      adminPortalData.interview_marks &&
      adminPortalData.interview_marks[authUser.id]
    ) {
      setHigherStudiesMot(
        adminPortalData.interview_marks[authUser.id].higherStudiesMotivation ||
          0,
      )
      setCommunication(
        adminPortalData.interview_marks[authUser.id].communication || 0,
      )
      setResearchAptitude(
        adminPortalData.interview_marks[authUser.id].researchAptitude || 0,
      )
      setMotivationToGoBack(
        adminPortalData.interview_marks[authUser.id].motivationToGoBack || 0,
      )
      setRemark(adminPortalData.interview_marks[authUser.id].remark || '')

      setTotalMarks(
        adminPortalData.interview_marks[authUser.id].higherStudiesMotivation +
          adminPortalData.interview_marks[authUser.id].communication +
          adminPortalData.interview_marks[authUser.id].researchAptitude +
          adminPortalData.interview_marks[authUser.id].motivationToGoBack || 0,
      )
    }
  }, [])

  const validation = () => {
    if (!higherStudiesMot) {
      setError('Please provide higher studies motivation marks.')
      return false
    }
    if (!communication) {
      setError('Please provide communication marks.')
      return false
    }
    if (!researchAptitude) {
      setError('Please provide research aptitude marks.')
      return false
    }
    if (!motivationToGoBack) {
      setError('Please provide motivation to go back marks.')
      return false
    }
    return true
  }

  const updateMarks = (newStatus: number) => {
    const total =
      higherStudiesMot + communication + researchAptitude + motivationToGoBack
    return updateInterviewMarks(
      applId,
      authUser.id,
      higherStudiesMot,
      communication,
      researchAptitude,
      motivationToGoBack,
      total,
      remark,
      newStatus,
    )
  }

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Interview Marks
        </h1>
        <div className="text-xs sm:text-sm md:text-base font-bold mb-10">
          <p className="mb-5">
            <span className="text-base md:text-lg text-blue-850 font-black">
              Note:
            </span>{' '}
            Click on Complete to finalize reviewing this application
          </p>
        </div>

        <div className="md:w-1/2 text-blue-850 font-black">
          <TextInput
            name={`Higher Studies Motivation (Out of ${intInstructions.HIGHER_STUDIES_MOTIVATION})`}
            value={higherStudiesMot}
            type="number"
            onChange={(e) => {
              if (
                Number(e.target.value) <=
                  intInstructions.HIGHER_STUDIES_MOTIVATION &&
                Number(e.target.value) >= 0
              ) {
                setTotalMarks(
                  (prev) => prev + Number(e.target.value) - higherStudiesMot,
                )
                setHigherStudiesMot(Number(e.target.value))
              }
            }}
            required={true}
            step="0.01"
            minimum={0}
            maximum={intInstructions.HIGHER_STUDIES_MOTIVATION}
          />
        </div>
        <div className="md:w-1/2 text-blue-850 font-black">
          <TextInput
            name={`Communication (Out of ${intInstructions.COMMUNICATION})`}
            value={communication}
            type="number"
            onChange={(e) => {
              if (
                Number(e.target.value) <= intInstructions.COMMUNICATION &&
                Number(e.target.value) >= 0
              ) {
                setTotalMarks(
                  (prev) => prev + Number(e.target.value) - communication,
                )
                setCommunication(Number(e.target.value))
              }
            }}
            required={true}
            step="0.01"
            minimum={0}
            maximum={intInstructions.COMMUNICATION}
          />
        </div>
        <div className="md:w-1/2 text-blue-850 font-black">
          <TextInput
            name={`Research Aptitude (Out of ${intInstructions.RESEARCH_APTITUDE})`}
            value={researchAptitude}
            type="number"
            onChange={(e) => {
              if (
                Number(e.target.value) <= intInstructions.RESEARCH_APTITUDE &&
                Number(e.target.value) >= 0
              ) {
                setTotalMarks(
                  (prev) => prev + Number(e.target.value) - researchAptitude,
                )
                setResearchAptitude(Number(e.target.value))
              }
            }}
            required={true}
            step="0.01"
            minimum={0}
            maximum={intInstructions.RESEARCH_APTITUDE}
          />
        </div>
        <div className="md:w-1/2 text-blue-850 font-black">
          <TextInput
            name={`Motivation To Go Back (Out of ${intInstructions.MOTIVATION_TO_GO_BACK})`}
            value={motivationToGoBack}
            type="number"
            onChange={(e) => {
              if (
                Number(e.target.value) <=
                  intInstructions.MOTIVATION_TO_GO_BACK &&
                Number(e.target.value) >= 0
              ) {
                setTotalMarks(
                  (prev) => prev + Number(e.target.value) - motivationToGoBack,
                )
                setMotivationToGoBack(Number(e.target.value))
              }
            }}
            required={true}
            step="0.01"
            minimum={0}
            maximum={intInstructions.MOTIVATION_TO_GO_BACK}
          />
        </div>
        <Field name="Total Marks (out of 100)" value={totalMarks} />
        <div className="md:w-1/2 text-blue-850 font-black">
          <Textarea
            name="Any additional remark for the applicant"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            required={false}
          />
        </div>
      </div>

      <ProceedButtons
        formStatus={formStatus}
        status={status}
        setStatus={setStatus}
        validation={validation}
        updateInterviewMarks={updateMarks}
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default InterviewerStep8
