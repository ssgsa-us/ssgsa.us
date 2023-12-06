import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import UpdateConstantModal from '../../../components/Admin/Modals/UpdateConstant'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { NewsletterType, NewslettersType } from '../../../types'
import {
  deleteNewsletter,
  updateNewsletter,
} from '../../api/admin/constants/newsletter'
import { getNewsletters } from '../../api/constants'

function NewslettersUpdateForm() {
  const [newslettersList, setNewslettersList] = useState<NewslettersType>({})
  const [selNewsletterId, setSelNewsletterId] = useState<string>(null)
  const [newsletter, setNewsletter] = useState<NewsletterType>(null)
  const [changeOccured, setChangeOccured] = useState<boolean>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getNewsletters()
      .then((data) => setNewslettersList(data))
      .catch(() => setError('Not able to get newsletters list, Try again!'))
  }, [changeOccured])

  const editNewsletterDetails = () => {
    updateNewsletter(selNewsletterId, newsletter)
      .then(() => {
        alert('Updated Newsletter Details')
        setChangeOccured(!changeOccured)
      })
      .catch(() =>
        setError('Not able to update newsletter details, Try again!'),
      )
      .finally(() => closeModal())
  }

  const addNewsletter = () => {
    const nextId =
      Math.max.apply(
        null,
        Object.keys(newslettersList).map((i) => Number(i)),
      ) + 1
    const newNewsletter = {
      ...newsletter,
      index: nextId,
    }

    updateNewsletter(String(nextId), newNewsletter)
      .then(() => {
        alert('New Newsletter Created')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to create new newsletter, Try again!'))
      .finally(() => closeModal())
  }

  const deleteNewsletterDetails = (newsletterId: string) => {
    deleteNewsletter(newsletterId)
      .then(() => {
        alert(`${newslettersList[newsletterId].title} Newsletter Deleted`)
        setChangeOccured(!changeOccured)
      })
      .catch(() =>
        setError(`
          Not able to delete newsletter ${newslettersList[newsletterId].title}, Try again!
        `),
      )
      .finally(() => closeModal())
  }

  const closeModal = () => {
    setNewsletter(null)
    setSelNewsletterId(null)
  }

  return (
    <AdminLayout>
      <h1 className="my-8 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Newsletters
      </h1>
      {!error ? (
        <div className="mx-8 my-8">
          <div className="flex justify-center mt-4 flex-wrap">
            <table className="border-separate p-2">
              <thead>
                <tr>
                  <th className="border border-blue-850 p-2">S. No.</th>
                  <th className="border border-blue-850 p-2">Title</th>
                  <th className="border border-blue-850 p-2">Link</th>
                  <th className="border border-blue-850 p-2">Edit</th>
                  <th className="border border-blue-850 p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(newslettersList).map((key, index) => (
                  <tr key={key}>
                    <td className="border border-blue-850 p-2">{index + 1}</td>
                    <td className="border border-blue-850 p-2">
                      {newslettersList[key].title}
                    </td>
                    <td className="border border-blue-850 p-2">
                      {newslettersList[key].link}
                    </td>
                    <td className="border border-blue-850 p-2">
                      <div className="flex justify-center items-center">
                        <FontAwesomeIcon
                          className="cursor-pointer"
                          icon={faEdit}
                          width={20}
                          onClick={() => {
                            setSelNewsletterId(key)
                            setNewsletter(newslettersList[key])
                          }}
                        />
                      </div>
                    </td>
                    <td className="border border-blue-850 p-2">
                      <div className="flex justify-center items-center">
                        <FontAwesomeIcon
                          className="cursor-pointer"
                          icon={faTrash}
                          width={20}
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure, you want to remove this newsletter "${newslettersList[key].title}"`,
                              ) == true
                            )
                              deleteNewsletterDetails(key)
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-red-850 text-center text-lg lg:text-xl">
            <span className="font-bold">Error -</span> {error}
          </h3>
        </div>
      )}

      <div className="flex justify-center my-10 flex-wrap">
        <button
          className="text-white text-base md:text-lg bg-red-850 p-2 rounded-lg"
          onClick={() => {
            setSelNewsletterId(null)
            setNewsletter({
              index: 0,
              title: '',
              link: '',
            })
          }}
        >
          Add New Newsletter
        </button>
      </div>

      <UpdateConstantModal
        title={
          selNewsletterId === null
            ? 'Add New Newsletter'
            : 'Edit Newsletter Details'
        }
        fields={[
          { name: 'title', title: 'Title', required: true },
          { name: 'link', title: 'Link', required: true },
        ]}
        constant={newsletter}
        setConstant={setNewsletter}
        updateConstant={
          selNewsletterId === null ? addNewsletter : editNewsletterDetails
        }
        closeModal={closeModal}
      />
    </AdminLayout>
  )
}

export default requireAuth(NewslettersUpdateForm, Roles.ADMIN)
