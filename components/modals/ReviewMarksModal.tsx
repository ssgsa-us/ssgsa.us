type ReviewMarks = {
  A: number
  B: number
  C: number
  D: number
  E: number
}

type Props = {
  reviewMarks: ReviewMarks
}

export default function ReviewMarksModal({ reviewMarks }: Props) {
  return (
    <div className="absolute top-0 left-0 z-50">
      <div className="hidden navgroup-box w-80 p-8">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white justify-center">
          {/*header*/}
          <div className="flex items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-2xl text-red-850 text-center rounded-3xl ">
              Review Marks
            </h3>
          </div>
          {/*body*/}
          <div>
            <div className="flex justify-around my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Based on A
              </p>
              <p className="sm:text-lg font-bold">{reviewMarks.A}</p>
            </div>
            <div className="flex justify-around my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Based on B
              </p>
              <p className="sm:text-lg font-bold">{reviewMarks.B}</p>
            </div>
            <div className="flex justify-around my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Based on C
              </p>
              <p className="sm:text-lg font-bold">{reviewMarks.C}</p>
            </div>
            <div className="flex justify-around my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Based on D
              </p>
              <p className="sm:text-lg font-bold">{reviewMarks.D}</p>
            </div>
            <div className="flex justify-around my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Based on E
              </p>
              <p className="sm:text-lg font-bold">{reviewMarks.E}</p>
            </div>
            <div className="flex justify-around my-5">
              <p className="text-red-850 text-lg sm:text-xl font-extrabold">
                Total Marks
              </p>
              <p className="sm:text-lg font-bold">
                {reviewMarks.A +
                  reviewMarks.B +
                  reviewMarks.C +
                  reviewMarks.D +
                  reviewMarks.E}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
