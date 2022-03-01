import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../layouts/admin/admin-layout'
import { auth } from '../../firebase'

export default function Admin() {
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!auth.currentUser) router.push('/admin/signin')
      else {
        if (auth.currentUser.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL)
          setPageReady(true)
        else router.push('/404')
      }
    })
  }, [])

  return (
    <AdminLayout>
      {pageReady ? <div className="mt-96" /> : <div className="mt-96" />}
    </AdminLayout>
  )
}
