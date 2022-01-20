import path from 'path'
import { ref as StorageRef, uploadBytesResumable } from 'firebase/storage'
import { firestore, storage } from '../../firebase'

export const uploadDocument = (
  userId: string,
  documentType: string,
  document: File,
) => {
  const storageRef = StorageRef(
    storage,
    path.join('documents', userId, documentType),
  )
  uploadBytesResumable(storageRef, document)
}

export const updateFormStatus = (userId: string, formStatus: number) => {
  firestore
    .doc(path.join('applications_data', userId))
    .update({ form_status: formStatus })
}
