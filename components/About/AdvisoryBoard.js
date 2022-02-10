const AdvisoryBoard = () => {
  return (
    <div id="Advisory">
      <h1 className="my-8 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Advisory Board
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-800 text-sm sm:text-base sm:text-left mx-2 sm:mx-8">
        <div className="lg:mr-0 lg:ml-32 xl:ml-48">
          Dr. Suhail Sabir, Aligarh Muslim University, India
        </div>
        <div className="lg:ml-0 lg:mr-32 xl:mr-48">
          Dr. Asadullah Khan, Aligarh Muslim University, India
        </div>
        <div className="lg:mr-0 lg:ml-32 xl:ml-48">
          Prof. Shakir Husain, Youngstown, Ohio, USA
        </div>
        <div className="lg:ml-0 lg:mr-32 xl:mr-48">
          Dr. Shahid Jameel, University of Oxford
        </div>
        <div className="lg:mr-0 lg:ml-32 xl:ml-48">
          Dr. Moyeen Haque, Houston, Texas, USA
        </div>
        <div className="lg:ml-0 lg:mr-32 xl:mr-48">
          Dr. Farhan Ahmad, Hicksville, NY, USA
        </div>
        <div className="lg:mr-0 lg:ml-32 xl:ml-48">
          Prof. Shakeel Ansari, University of Texas, USA
        </div>
        <div className="lg:ml-0 lg:mr-32 xl:mr-48">
          Prof. Nawab Ali, Professor, University of Arkansas, USA
        </div>
      </div>
    </div>
  )
}

export default AdvisoryBoard
