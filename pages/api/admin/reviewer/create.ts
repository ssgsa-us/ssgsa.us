import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import { NextApiRequest, NextApiResponse } from 'next'
import { adminAuth, adminFirestore } from '../../../../firebase/admin'
import Roles from '../../../../constants/roles'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, email, password, sets } = req.body

  try {
    const user: UserRecord = await adminAuth.createUser({ email, password })

    await adminFirestore.doc(`users/${user.uid}`).set({
      name: name,
      email: email,
      mobile: 0,
      roles: [Roles.REVIEWER],
      review_sets: sets,
      interview_sets: [],
      verificationEmailEpoch: new Date().getTime(),
    })

    await adminFirestore
      .collection('reviewer_invites')
      .doc(email)
      .update({ account_created: true })

    res.status(200).send({ success: true })
  } catch (e) {
    console.log(e)
    res.status(400).send({ success: false })
  }
}
