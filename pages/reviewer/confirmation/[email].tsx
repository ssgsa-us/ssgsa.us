import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import ReviewerLayout from '../../../layouts/reviewer'
import {
  getReviewerInvite,
  updateReviewerResponse,
} from '../../api/reviewerInvite'
import { ReviewerInviteType } from '../../../types'

function ReviewerConfirmation() {
  const [reviewerInvite, setReviewerInvite] = useState<ReviewerInviteType>(null)
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
        else if (invite.response === 'YES')
          setError("You have already responded to 'YES'.")
        else setReviewerInvite(invite)
      })
      .catch(() => setError('Network issue, Try Again!'))
  }, [email])

  const proceed = (response) => {
    if (!reviewerInvite || !reviewerInvite.name) return
    setError('')

    // Update reviewer response
    updateReviewerResponse(email, response).then(() => {
      alert('Thanks for responding')
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
            If you agree to review SSGSA Applications this year, please click on
            the YES button. If you are declining to review, please press the NO
            button.
          </p>
          {error ? (
            <p className="text-red-850 text-center pt-1">
              <span className="font-bold">Error:</span> {error}
            </p>
          ) : null}
          <div className="flex flex-col items-center my-10">
            <div className="flex mt-10">
              <button
                className={`text-white text-base md:text-lg rounded-lg ${
                  !reviewerInvite || !reviewerInvite.name
                    ? 'bg-red-860 cursor-not-allowed'
                    : 'bg-red-850'
                } py-2 px-5 order-1 sm:order-2
                `}
                onClick={() => proceed('YES')}
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
                onClick={() => proceed('NO')}
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
