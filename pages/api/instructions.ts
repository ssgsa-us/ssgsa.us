import path from 'path'
import firebase, { firestore } from '../../firebase'
import { ReviewerInstructionsType } from '../../types'

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
