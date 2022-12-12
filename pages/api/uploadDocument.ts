import path from 'path'
import {
  deleteObject,
  getDownloadURL,
  ref as StorageRef,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from 'firebase/storage'
import { storage } from '../../firebase'

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

// To delete documents that have been uploaded by user in the records of a step
// but then deleted that record which does not delete the document.
// Make sure to run it after user saves data, so that it will be sure
// user will not use these documents again.
export const deleteDocuments = async (documentURLs: Array<string>) => {
  documentURLs.map((documentURL) => {
    const storageRef = StorageRef(storage, documentURL)

    deleteObject(storageRef).catch(() => {})
  })
}
