import path from 'path'
import { firestore } from '../../firebase'
import { Reviewer, reviewerController } from '../../classes/reviewer'

export const createReviewer = (
  userId: string,
  email: string,
  name: string,
  sets: Array<string>,
) => {
  const reviewer: Reviewer = new Reviewer(email, name, sets)

  firestore
    .doc(path.join('reviewer', userId))
    .withConverter(reviewerController)
    .set(reviewer)
}
