import path from 'path'
import {
  getDownloadURL,
  ref as StorageRef,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from 'firebase/storage'
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
  uploadBytesResumable(storageRef, document).then(
    (snapshot: UploadTaskSnapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL: string) => {
        firestore
          .doc(path.join('applications_data', userId))
          .update({ [`documents.${documentType}`]: downloadURL })
      })
    },
  )
}

export const updateFormStatus = (userId: string, formStatus: number) => {
  firestore
    .doc(path.join('applications_data', userId))
    .update({ form_status: formStatus })
}
