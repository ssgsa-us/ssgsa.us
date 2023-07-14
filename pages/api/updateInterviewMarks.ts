import path from 'path'
import { firestore } from '../../firebase'

export const updateIntFormStatus = (
  userId: string,
  interviewerId: string,
  formStatus: number,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`interview_marks.${interviewerId}.formStatus`]: formStatus,
  })
}

export const updateInterviewMarks = (
  userId: string,
  interviewerId: string,
  higherStudiesMot: number,
  communication: number,
  researchAptitude: number,
  motivationToGoBack: number,
  totalMarks: number,
  remark: string,
  formStatus: number,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`interview_marks.${interviewerId}.higherStudiesMotivation`]:
      higherStudiesMot,
    [`interview_marks.${interviewerId}.communication`]: communication,
    [`interview_marks.${interviewerId}.researchAptitude`]: researchAptitude,
    [`interview_marks.${interviewerId}.motivationToGoBack`]: motivationToGoBack,
    [`interview_marks.${interviewerId}.totalMarks`]: totalMarks,
    [`interview_marks.${interviewerId}.remark`]: remark,
    [`interview_marks.${interviewerId}.formStatus`]: formStatus,
  })
}
