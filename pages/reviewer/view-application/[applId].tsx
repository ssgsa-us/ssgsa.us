import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import Loading from '../../../components/Loading'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import { useAuth } from '../../../context/AuthUserContext'
import { getAdminPortalData } from '../../api/getAdminPortalData'
import { getApplicationData } from '../../api/getApplicationData'
import { updateReviewMarks } from '../../api/updateReviewMarks'
import { updateReviewRemark } from '../../api/updateReviewRemark'
import ApplicationLayout from '../../../layouts/reviewer/ApplicationLayout'

function ViewApplication() {
  const { authUser } = useAuth()
  const [adminPortalData, setAdminPortalData] = useState<AdminPortalData>(
    new AdminPortalData(),
  )
  const [applicationData, setApplicationData] = useState<ApplicationData>()
  const [status, setStatus] = useState<number>(1)
  const [A, setA] = useState<number>(0)
  const [B, setB] = useState<number>(0)
  const [C, setC] = useState<number>(0)
  const [D, setD] = useState<number>(0)
  const [E, setE] = useState<number>(0)
  const [remark, setRemark] = useState<string>('')
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()
  const applId = String(router.query['applId'])

  const setReviewerMarks = (data: AdminPortalData) => {
    let review_marks = data.review_marks
    if (review_marks && review_marks[authUser.id]) {
      setA(review_marks[authUser.id].A || 0)
      setB(review_marks[authUser.id].B || 0)
      setC(review_marks[authUser.id].C || 0)
      setD(review_marks[authUser.id].D || 0)
      setE(review_marks[authUser.id].E || 0)
      setRemark(review_marks[authUser.id].remark || '')
    }
  }

  useEffect(() => {
    if (applId) {
      getApplicationData(applId)
        .then((data) => {
          setApplicationData(data)
          getAdminPortalData(applId)
            .then((data: AdminPortalData) => {
              if (data) {
                setAdminPortalData(data)
                setReviewerMarks(data)
              }
            })
            .catch(() => alert('Try again, network error!'))
        })
        .catch(() => alert('Try again, network error!'))
        .finally(() => setPageReady(true))
    }
  }, [router.query, changeOccured])

  return (
    <ApplicationLayout status={status} formStatus={3} setStatus={setStatus}>
      {pageReady ? (
        <div></div>
      ) : (
        <Loading message="Loading your application data!" />
      )}
    </ApplicationLayout>
  )
}

export default requireAuth(ViewApplication, Roles.REVIEWER)
