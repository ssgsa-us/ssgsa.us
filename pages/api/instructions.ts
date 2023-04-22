import firebase, { firestore } from '../../firebase'
import {
  InterviewerInstructionsType,
  ReviewerInstructionsType,
} from '../../types'

export const getReviewerInstructions = async () => {
  let instructions: ReviewerInstructionsType = await firestore
    .doc('instructions/reviewer')
    .get()
    .then(
      (
        instructions: firebase.firestore.DocumentSnapshot<ReviewerInstructionsType>,
      ) => {
        return instructions.data()
      },
    )

  return instructions
}

export const getInterviewerInstructions = async () => {
  let instructions: InterviewerInstructionsType = await firestore
    .doc('instructions/interviewer')
    .get()
    .then(
      (
        instructions: firebase.firestore.DocumentSnapshot<InterviewerInstructionsType>,
      ) => {
        return instructions.data()
      },
    )

  return instructions
}
