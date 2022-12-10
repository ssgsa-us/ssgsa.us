import path from 'path'
import {
  getDownloadURL,
  ref as StorageRef,
  uploadBytesResumable,
  UploadTask,
  UploadTaskSnapshot,
} from 'firebase/storage'
import { firestore, storage } from '../../firebase'

export const uploadDocument = (
  userId: string,
  documentName: string,
  document: File,
  docUrlField: string,
) => {
  const storageRef = StorageRef(
    storage,
    path.join('documents', userId, documentName),
  )
  const uploadTask: UploadTask = uploadBytesResumable(storageRef, document)

  uploadTask.then((snapshot: UploadTaskSnapshot) => {
    getDownloadURL(snapshot.ref).then((downloadURL: string) => {
      firestore
        .doc(path.join('applications_data', userId))
        .update({ [docUrlField]: downloadURL })
    })
  })
  return uploadTask
}
