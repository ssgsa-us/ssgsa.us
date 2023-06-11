import path from 'path'
import firebase, { firestore } from '../../firebase'
import { User, userController } from '../../classes/user'

export const updateReviewSet = (userId: string, set: string) => {
  return firestore
    .doc(path.join('admin_portal_data', userId))
    .update({ review_set: set })
}

export const sendRevSetMails = () => {
  return firestore
    .collection('users')
    .where('role', '==', 'REVIEWER')
    .withConverter(userController)
    .get()
    .then((users: firebase.firestore.QuerySnapshot<User>) => {
      // this code needs update because if users are more than 20,
      // request will be closed and not able to wait for each mail request
      users.docs.map(
        async (
          userData: firebase.firestore.QueryDocumentSnapshot<User>,
          index: number,
        ) => {
          const user = userData.data()
          setTimeout(() => {
            fetch(
              process.env.NEXT_PUBLIC_REVIEWER_CRED_MAIL_LINK +
                new URLSearchParams({
                  email: user.email,
                  name: user.name,
                  sets: user.sets.join(', '),
                }),
            )
          }, 1000 * index)

          if (index == users.docs.length - 1) {
            setTimeout(() => {
              console.log('Completed! Mail sent to all reviewers.')
            }, 1000 * index)
          }
        },
      )
    })
    .catch((error) => console.log(error))
}
