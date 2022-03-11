import firebase, { firestore } from '../../firebase'
import { Reviewer, reviewerController } from '../../classes/reviewer'

export const getReviewerDetails = async (email: string) => {
  let reviewer: Reviewer = await firestore
    .collection('reviewer')
    .where('email', '==', email)
    .withConverter(reviewerController)
    .get()
    .then((reviewers: firebase.firestore.QuerySnapshot<Reviewer>) => {
      if (reviewers.size) {
        let reviewer: Reviewer
        reviewers.forEach(
          (document: firebase.firestore.QueryDocumentSnapshot<Reviewer>) => {
            reviewer = document.data()
          },
        )
        return reviewer
      }
      return null
    })

  return reviewer
}
