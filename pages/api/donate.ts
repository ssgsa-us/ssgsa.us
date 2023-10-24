import path from 'path'
import { firestore } from '../../firebase'

export const addDonation = (
  name: string,
  email: string,
  donationType: string,
  amount: number,
  paymentType: string,
) => {
  return firestore.doc(path.join('donations', email)).set({
    name,
    email,
    donationType,
    amount,
    paymentType,
  })
}
