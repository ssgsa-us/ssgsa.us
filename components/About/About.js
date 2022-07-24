import AdvisoryBoard from './AdvisoryBoard'
import DonorAndContributors from './DonorAndContributors'
import Leadership from './LeadershipHistory'
import Members from './Members'

const About = () => {
  return (
    <div className="mx-8 sm:mx-12 md:mx-20 text-black">
      <div id="Mission">
        <h1 className="my-8 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
          Mission
        </h1>
        <div className="mx-2 sm:mx-8">
          <p>
            The SSGSA team strives hard to further the cause of the Aligarh
            Muslim University on two fronts:
          </p>
          <ul style={{ listStyle: 'disc' }} className="ml-2 p-2">
            <li className="m-2">
              Mentoring and financially supporting meritorious students so they are successful
              in getting admission at prestigious graduate programs across the globe.
            </li>
            <li className="m-2">
              Expanding our strong formal network of academic mentors who also
              function as brand ambassadors of AMU at their respective
              universities and organisations where they are placed after
              finishing their studies.
            </li>
          </ul>
        </div>
      </div>

      <Members />
      <AdvisoryBoard />
      <Leadership />
      <DonorAndContributors />
    </div>
  )
}

export default About
