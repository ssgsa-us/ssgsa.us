const LeadershipHistory = () => {
  return (
    <div id="Leadership">
      <h1 className="my-8 bg-blue-850 lg:text-3xl text-2xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Leadership History
      </h1>
      <table className="flex justify-center mx-4 text-sm sm:text-base">
        <tbody>
          <tr>
            <td className="text-left sm:text-right pr-4 sm:pr-12">
              2021-Present
            </td>
            <td className="bg-gray-100 text-gray-700 font-black p-2">
              Mr. Salman Bin Kashif
            </td>
          </tr>
          <tr>
            <td className="text-left sm:text-right pr-4 sm:pr-12">2019-21</td>
            <td className="bg-gray-100 text-gray-700 font-black p-2">
              Mr. Wasikul Islam
            </td>
          </tr>
          <tr>
            <td className="text-left sm:text-right pr-4 sm:pr-12">2016-18</td>
            <td className=" bg-gray-100 text-gray-700 font-black p-2">
              Mr. Ali Muzaffar, Chairman
            </td>
          </tr>
          <tr>
            <td className="text-left sm:text-right pr-4 sm:pr-12">2013-15</td>
            <td className="bg-gray-100 text-gray-700 font-black p-2">
              Dr. Mohsin Khan, Chairman
            </td>
          </tr>
          <tr>
            <td className="text-left sm:text-right pr-4 sm:pr-12">2011-13</td>
            <td className=" bg-gray-100 text-gray-700 font-black p-2">
              Dr. Saif Sheikh, Chairman
            </td>
          </tr>
          <tr>
            <td className="text-left sm:text-right pr-4 sm:pr-12">2008-11</td>
            <td className="bg-gray-100 text-gray-700 font-black p-2">
              Dr. Rehan Baqri, Chairman
            </td>
          </tr>
          <tr>
            <td className="text-left sm:text-right pr-4 sm:pr-12">2006-08</td>
            <td className="bg-gray-100 text-gray-700 font-black p-2">
              Dr. Shaida Andrabi, Chairman
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeadershipHistory;
