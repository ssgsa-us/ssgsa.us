import path from 'path'
import { firestore } from '../../firebase'

export const updateInterviewRemark = (
  userId: string,
  interviewerId: string,
  remark: string,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`interview_marks.${interviewerId}.remark`]: remark,
  })
}
