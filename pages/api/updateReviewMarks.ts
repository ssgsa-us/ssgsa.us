import path from 'path'
import { firestore } from '../../firebase'
import { ReviewMarksType } from '../../types'

export const step1 = (
  userId: string,
  reviewerId: string,
  formStatus: number,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`review_marks.${reviewerId}.formStatus`]: formStatus,
  })
}

export const step2 = (
  userId: string,
  reviewerId: string,
  academicGrades: ReviewMarksType[string]['academicGrades'],
  totalAcademicMarks: number,
  formStatus: number,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`review_marks.${reviewerId}.academicGrades`]: academicGrades,
    [`review_marks.${reviewerId}.totalAcademicMarks`]: totalAcademicMarks,
    [`review_marks.${reviewerId}.formStatus`]: formStatus,
  })
}

export const step3 = (
  userId: string,
  reviewerId: string,
  curricularMarks: number,
  formStatus: number,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`review_marks.${reviewerId}.curricularMarks`]: curricularMarks,
    [`review_marks.${reviewerId}.formStatus`]: formStatus,
  })
}

export const step4 = (
  userId: string,
  reviewerId: string,
  extracurricularMarks: number,
  formStatus: number,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`review_marks.${reviewerId}.extracurricularMarks`]: extracurricularMarks,
    [`review_marks.${reviewerId}.formStatus`]: formStatus,
  })
}

export const step5 = (
  userId: string,
  reviewerId: string,
  sopMarks: ReviewMarksType[string]['sopMarks'],
  totalSOPMarks: number,
  formStatus: number,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`review_marks.${reviewerId}.sopMarks`]: sopMarks,
    [`review_marks.${reviewerId}.totalSOPMarks`]: totalSOPMarks,
    [`review_marks.${reviewerId}.formStatus`]: formStatus,
  })
}

export const step6 = (
  userId: string,
  reviewerId: string,
  formStatus: number,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`review_marks.${reviewerId}.formStatus`]: formStatus,
  })
}

export const step7 = (
  userId: string,
  reviewerId: string,
  remark: string,
  formStatus: number,
) => {
  return firestore.doc(path.join('admin_portal_data', userId)).update({
    [`review_marks.${reviewerId}.remark`]: remark,
    [`review_marks.${reviewerId}.formStatus`]: formStatus,
  })
}
