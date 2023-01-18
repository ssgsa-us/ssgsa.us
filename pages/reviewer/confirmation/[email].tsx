import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Roles from '../../../constants/roles'
import { useAuth } from '../../../context/AuthUserContext'
import firebase from '../../../firebase'
import ReviewerLayout from '../../../layouts/reviewer'
import { createUser } from '../../api/createUser'
import {
  getReviewerInvite,
  updateReviewerResponse,
} from '../../api/reviewerInvite'

function ReviewerConfirmation() {
  const { createUserWithEmailAndPassword } = useAuth()
  const [password, setPassword] = useState<string>('')
  const [reviewerInvite, setReviewerInvite] =
    useState<firebase.firestore.DocumentData>(null)
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const email = String(router.query['email'])

  useEffect(() => {
    if (!router.query['email']) return

    setError('')
    getReviewerInvite(email)
      .then((invite) => {
        if (!invite || !Object.keys(invite).length || !invite.name)
          setError(
            "Sorry, we don't have your data. Please contact at contact@ssgsa.us",
          )
        else if (invite.response) setError('You have already responded.')
        else setReviewerInvite(invite)
      })
      .catch(() => setError('Network issue, Try Again!'))
  }, [email])

  const proceedYes = () => {
    if (!reviewerInvite || !reviewerInvite.name) return

    setError('')
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
            // Update reviewer response to 'YES'
            updateReviewerResponse(email, 'YES')
              .then(() => {
                // add reviewer data to firestore database
                // Mobile not required for now so giving 0 for now
                createUser(
                  result.user.uid,
                  reviewerInvite.name,
                  email,
                  0,
                  new Date().getTime(),
                  Roles.REVIEWER,
                )
              })
              .finally(() => {
                alert('Thanks for responding')
                router.push('/reviewer')
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
  }

  const proceedNo = () => {
    if (!reviewerInvite || !reviewerInvite.name) return

    updateReviewerResponse(email, 'NO').then(() => {
      alert('Response Updated, Thank you!')
      router.push('/')
    })
  }

  return (
    <ReviewerLayout>
      <div className="mx-5 sm:mx-10 md:mx-16 lg:mx-32">
        <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
          Reviewer Confirmation
        </h1>
        <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10">
          <p className="my-5 text-sm sm:text-lg text-blue-850">
            Please provide your confirmation by clicking &apos;YES&apos; or
            &apos;NO&apos; button below.
          </p>
          <p className="my-5 text-sm sm:text-lg text-blue-850">
            Please provide PASSWORD for creating your account before clicking on
            &apos;YES&apos; button. You will be able to change your password
            anytime.
          </p>
          {error ? (
            <p className="text-red-850 text-center pt-1">
              <span className="font-bold">Error:</span> {error}
            </p>
          ) : null}
          <div className="flex flex-col items-center my-10">
            <input
              name="Password"
              placeholder="Provide your PASSWORD"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl p-2 mt-1 md:w-3/4 lg:w-1/2"
            />
            <div className="flex mt-10">
              <button
                className={`text-white text-base md:text-lg rounded-lg ${
                  !reviewerInvite || !reviewerInvite.name
                    ? 'bg-red-860 cursor-not-allowed'
                    : 'bg-red-850'
                } py-2 px-5 order-1 sm:order-2
                `}
                onClick={proceedYes}
                disabled={!reviewerInvite || !reviewerInvite.name}
              >
                YES
              </button>
              <button
                className={`text-white text-base md:text-lg rounded-lg ${
                  !reviewerInvite || !reviewerInvite.name
                    ? 'bg-red-860 cursor-not-allowed'
                    : 'bg-red-850'
                } ml-5 py-2 px-5 order-1 sm:order-2
                `}
                onClick={proceedNo}
                disabled={!reviewerInvite || !reviewerInvite.name}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReviewerLayout>
  )
}

export default ReviewerConfirmation
