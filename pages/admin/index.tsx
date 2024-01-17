import Link from 'next/link'
import requireAuth from '../../components/requireAuth'
import Roles from '../../constants/roles'
import AdminLayout from '../../layouts/admin/AdminLayout'

function Admin() {
  return (
    <AdminLayout>
      <div className="my-10 bg-gray-200 rounded-3xl pt-5 px-3 sm:pt-10 sm:px-10">
        <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 mb-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
          Admin Portal
        </h1>

        <div className="flex flex-col items-center text-xl text-red-850 m-10">
          <Link href={'/admin/applications/completed'}>
            <a className="my-5">Applications</a>
          </Link>
          <Link href={'/admin/reviewers/invite'}>
            <a className="my-5">Invite Reviewers</a>
          </Link>
          <Link href={'/admin/reviewers'}>
            <a className="my-5">All Reviewers</a>
          </Link>
          <Link href={'/admin/interviewers/invite'}>
            <a className="my-5">Invite Interviewers</a>
          </Link>
          <Link href={'/admin/interviewers'}>
            <a className="my-5">All Interviewers</a>
          </Link>
          <Link href={'/admin/data/awardees'}>
            <a className="my-5">Update Awardees List</a>
          </Link>
          <Link href={'/admin/data/members'}>
            <a className="my-5">Update Members List</a>
          </Link>
          <Link href={'/admin/data/monthStories'}>
            <a className="my-5">Update Month Stories</a>
          </Link>
          <Link href={'/admin/data/newsletters'}>
            <a className="my-5">Update Newsletters</a>
          </Link>
          <Link href={'/admin/data/successful-scholars'}>
            <a className="my-5">Update Successful Scholars List</a>
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}

export default requireAuth(Admin, Roles.ADMIN)
