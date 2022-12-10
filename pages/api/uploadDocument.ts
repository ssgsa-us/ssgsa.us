import path from 'path'
import {
  getDownloadURL,
  ref as StorageRef,
  uploadBytesResumable,
  UploadTask,
  UploadTaskSnapshot,
} from 'firebase/storage'
import { firestore, storage } from '../../firebase'

export const uploadDocument = async (
  userId: string,
  documentName: string,
  document: File,
) => {
  const storageRef = StorageRef(
    storage,
    path.join('documents', userId, documentName),
  )

  const snapshot: UploadTaskSnapshot = await uploadBytesResumable(
    storageRef,
    document,
  )

  const downloadURL: string = await getDownloadURL(snapshot.ref)
  return downloadURL
}
