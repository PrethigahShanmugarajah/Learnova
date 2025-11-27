import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { formatDDMMYYYYWithTimeAMPM } from "../../utils/date";
import { AppContext } from "../../context/AppContext";
import { fetchEnrolledStudents } from "../../services/fetch";

const StudentsEnrolled = () => {
  const { isEducator, getToken } = useContext(AppContext);

  const [enrolledStudents, setEnrolledStudents] = useState(null);

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents(getToken, setEnrolledStudents);
    }
  }, [isEducator]);

  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-200">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          <thead className="text-black border-b border-gray-200 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                #
              </th>

              <th className="px-4 py-3 font-semibold">Student Name</th>

              <th className="px-4 py-3 font-semibold">Course Title</th>

              <th className="px-4 py-3 font-semibold hidden sm:table-cell">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="px-4 py-3 text-center hidden sm:table-cell">
                  {index + 1}
                </td>

                <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                  <img
                    src={item.student.imageUrl}
                    alt={item.student.name}
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="font-truncate text-gray-600">
                    {item.student.name}
                  </span>
                </td>

                <td className="px-4 py-3 truncate">{item.courseTitle}</td>

                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {
                        formatDDMMYYYYWithTimeAMPM(item.purchaseDate).split(
                          " "
                        )[0]
                      }{" "}
                    </span>
                    <span className="text-gray-600 text-xs">
                      {formatDDMMYYYYWithTimeAMPM(item.purchaseDate)
                        .split(" ")
                        .slice(1)
                        .join(" ")}{" "}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;
