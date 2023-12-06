import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import UpdateConstantModal from '../../../components/Admin/Modals/UpdateConstant'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/admin-layout'
import { MonthStoriesType, MonthStoryType } from '../../../types'
import { getMonthStories } from '../../api/constants'
import {
  deleteMonthStory,
  updateMonthStory,
} from '../../api/admin/constants/monthStories'

function MonthStoriesUpdateForm() {
  const [monthStoriesList, setMonthStoriesList] = useState<MonthStoriesType>({})
  const [selMonthStoryId, setSelMonthStoryId] = useState<string>(null)
  const [monthStory, setMonthStory] = useState<MonthStoryType>(null)
  const [changeOccured, setChangeOccured] = useState<boolean>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getMonthStories()
      .then((data) => setMonthStoriesList(data))
      .catch(() => setError('Not able to get month stories, Try again!'))
  }, [changeOccured])

  const editMonthStoryDetails = () => {
    updateMonthStory(selMonthStoryId, monthStory)
      .then(() => {
        alert('Updated Month Story Details')
        setChangeOccured(!changeOccured)
      })
      .catch(() =>
        setError('Not able to update month story details, Try again!'),
      )
      .finally(() => closeModal())
  }

  const addMonthStory = () => {
    const nextId =
      Math.max.apply(
        null,
        Object.keys(monthStoriesList).map((i) => Number(i)),
      ) + 1
    const newMonthStory = {
      ...monthStory,
      index: nextId,
    }

    updateMonthStory(String(nextId), newMonthStory)
      .then(() => {
        alert('New Month Story Created')
        setChangeOccured(!changeOccured)
      })
      .catch(() => setError('Not able to create new month story, Try again!'))
      .finally(() => closeModal())
  }

  const deleteMonthStoryDetails = (monthStoryId: string) => {
    deleteMonthStory(monthStoryId)
      .then(() => {
        alert(`${monthStoriesList[monthStoryId].title} Month Story Deleted`)
        setChangeOccured(!changeOccured)
      })
      .catch(() =>
        setError(`
          Not able to delete month story ${monthStoriesList[monthStoryId].title}, Try again!
        `),
      )
      .finally(() => closeModal())
  }

  const closeModal = () => {
    setMonthStory(null)
    setSelMonthStoryId(null)
  }

  return (
    <AdminLayout>
      <h1 className="my-8 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Month Stories
      </h1>
      {!error ? (
        <div className="m-4">
          <div className="flex justify-center mt-4">
            <table className="border-separate p-2 w-full">
              <thead>
                <tr>
                  <th className="border border-blue-850 p-2">S. No.</th>
                  <th className="border border-blue-850 p-2">Month</th>
                  <th className="border border-blue-850 p-2">Name</th>
                  <th className="border border-blue-850 p-2">Link</th>
                  <th className="border border-blue-850 p-2">Title</th>
                  <th className="border border-blue-850 p-2">Edit</th>
                  <th className="border border-blue-850 p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(monthStoriesList).map((key, index) => (
                  <tr key={key}>
                    <td className="border border-blue-850 p-2">{index + 1}</td>
                    <td className="border border-blue-850 p-2 break-all">
                      {monthStoriesList[key].issue}
                    </td>
                    <td className="border border-blue-850 p-2 break-all">
                      {monthStoriesList[key].name}
                    </td>
                    <td className="border border-blue-850 p-2 break-all">
                      {monthStoriesList[key].link}
                    </td>
                    <td className="border border-blue-850 p-2 break-all">
                      {monthStoriesList[key].title}
                    </td>
                    <td className="border border-blue-850 p-2">
                      <div className="flex justify-center items-center">
                        <FontAwesomeIcon
                          className="cursor-pointer"
                          icon={faEdit}
                          width={20}
                          onClick={() => {
                            setSelMonthStoryId(key)
                            setMonthStory(monthStoriesList[key])
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
                                `Are you sure, you want to remove this month story "${monthStoriesList[key].title}"`,
                              ) == true
                            )
                              deleteMonthStoryDetails(key)
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
            setSelMonthStoryId(null)
            setMonthStory({
              index: 0,
              issue: '',
              link: '',
              name: '',
              title: '',
            })
          }}
        >
          Add New Month Story
        </button>
      </div>

      <UpdateConstantModal
        title={
          selMonthStoryId === null
            ? 'Add New Month Story'
            : 'Edit Month Story Details'
        }
        fields={[
          { name: 'issue', title: 'Month', required: true },
          { name: 'name', title: 'Name', required: true },
          { name: 'link', title: 'Link', required: true },
          { name: 'title', title: 'Title', required: true },
        ]}
        constant={monthStory}
        setConstant={setMonthStory}
        updateConstant={
          selMonthStoryId === null ? addMonthStory : editMonthStoryDetails
        }
        closeModal={closeModal}
      />
    </AdminLayout>
  )
}

export default requireAuth(MonthStoriesUpdateForm, Roles.ADMIN)
