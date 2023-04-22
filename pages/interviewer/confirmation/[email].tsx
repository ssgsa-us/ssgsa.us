import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Roles from '../../../constants/roles'
import { useAuth } from '../../../context/AuthUserContext'
import firebase from '../../../firebase'
import InterviewerLayout from '../../../layouts/interviewer'
import { createUser, updateUserRole } from '../../api/createUser'
import { getUserIdByEmail } from '../../api/getUserDetails'
import {
  getInterviewerInvite,
  updateInterviewerResponse,
} from '../../api/interviewerInvite'

function InterviewerConfirmation() {
  const { createUserWithEmailAndPassword } = useAuth()
  const [password, setPassword] = useState<string>('')
  const [interviewerInvite, setInterviewerInvite] =
    useState<firebase.firestore.DocumentData>(null)
  const [isReviewer, setIsReviewer] = useState<boolean>(false)
  const [reviewerId, setReviewerId] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const email = String(router.query['email'])

  useEffect(() => {
    if (!router.query['email']) return

    setLoading(true)
    setError('')
    getInterviewerInvite(email)
      .then((invite) => {
        if (!invite || !Object.keys(invite).length || !invite.name)
          setError(
            "Sorry, we don't have your data. Please contact at contact@ssgsa.us",
          )
        else if (invite.response === 'YES')
          setError("You have already responded to 'YES'.")
        else setInterviewerInvite(invite)
      })
      .catch(() => setError('Network issue, Try Again!'))

    // As User collection not set to accept many roles
    // Updating Reviewer role Interviewer for now
    // Need to update user collection to accept many roles in next session
    getUserIdByEmail(email)
      .then((userId: string | null) => {
        if (!userId) setIsReviewer(false)
        else {
          setIsReviewer(true)
          setReviewerId(userId)
        }
      })
      .catch(() => setError('Network issue, Try Again!'))
      .finally(() => setLoading(false))
  }, [email])

  const proceedYes = () => {
    if (loading || !interviewerInvite || !interviewerInvite.name) return

    setError('')
    if (!isReviewer) {
      if (!password) {
        setError('Please provide PASSWORD to create your account.')
        return
      }

      createUserWithEmailAndPassword(email, password)
        .then(async (result: firebase.auth.UserCredential) => {
          result.user
            .sendEmailVerification()
            .then(() =>
              alert(
                'An email verification mail is sent to you. Please follow the instructions to verify your email.',
              ),
            )
            .finally(() => {
              // Update interviewer response to 'YES'
              updateInterviewerResponse(email, 'YES')
                .then(() => {
                  // add interviewer data to firestore database
                  // Mobile not required for now so giving 0 for now
                  createUser(
                    result.user.uid,
                    interviewerInvite.name,
                    email,
                    0,
                    new Date().getTime(),
                    Roles.INTERVIEWER,
                  )
                })
                .finally(() => {
                  alert('Thanks for responding')
                  router.push('/interviewer')
                })
            })
        })
        .catch((error) => {
          if (error.code === 'auth/weak-password') {
            setError('The password is too weak.')
          } else {
            setError(error.message.replace('Firebase', ''))
          }
        })
    } else {
      // Update interviewer response to 'YES'
      updateInterviewerResponse(email, 'YES')
        .then(() => {
          // Update user role to Interviewer
          updateUserRole(reviewerId, Roles.INTERVIEWER)
        })
        .finally(() => {
          alert('Thanks for responding')
          router.push('/interviewer')
        })
    }
  }

  const proceedNo = () => {
    if (loading || !interviewerInvite || !interviewerInvite.name) return

    updateInterviewerResponse(email, 'NO').then(() => {
      alert('Response Updated, Thank you!')
      setError('')
      router.push('/')
    })
  }

  return (
    <InterviewerLayout>
      <div className="mx-5 sm:mx-10 md:mx-16 lg:mx-32">
        <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
          Interviewer Confirmation
        </h1>
        <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10">
          <p className="my-5 text-sm sm:text-lg text-blue-850">
            If you agree to interview SSGSA Applications this year, please first
            enter a PASSWORD that you will use to log in, and then click on the
            YES button. If you are declining to interview, please press the NO
            button without needing to enter the password.
          </p>
          <p className="my-5 text-sm sm:text-lg text-blue-850">
            Note: Your email will be your username.
          </p>
          {error ? (
            <p className="text-red-850 text-center pt-1">
              <span className="font-bold">Error:</span> {error}
            </p>
          ) : null}
          {interviewerInvite && interviewerInvite.response === 'NO' ? (
            <p className="text-blue-850 text-center pt-1">
              You have already responded &apos;NO&apos;, still you can change
              your response if needed
            </p>
          ) : null}
          <div className="flex flex-col items-center my-10">
            {error || !isReviewer ? (
              <input
                name="Password"
                placeholder="Provide your PASSWORD"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl p-2 mt-1 md:w-3/4 lg:w-1/2"
              />
            ) : (
              <p className="text-blue-850 text-center pt-1">
                No need of password, you can use your Reviewer account
                credentials as an Interviewer if you click on &apos;YES&apos;
              </p>
            )}
            <div className="flex mt-10">
              <button
                className={`text-white text-base md:text-lg rounded-lg ${
                  loading || !interviewerInvite || !interviewerInvite.name
                    ? 'bg-red-860 cursor-not-allowed'
                    : 'bg-red-850'
                } py-2 px-5 order-1 sm:order-2
                `}
                onClick={proceedYes}
                disabled={
                  loading || !interviewerInvite || !interviewerInvite.name
                }
              >
                YES
              </button>
              <button
                className={`text-white text-base md:text-lg rounded-lg ${
                  loading || !interviewerInvite || !interviewerInvite.name
                    ? 'bg-red-860 cursor-not-allowed'
                    : 'bg-red-850'
                } ml-5 py-2 px-5 order-1 sm:order-2
                `}
                onClick={proceedNo}
                disabled={
                  loading || !interviewerInvite || !interviewerInvite.name
                }
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </InterviewerLayout>
  )
}

export default InterviewerConfirmation
