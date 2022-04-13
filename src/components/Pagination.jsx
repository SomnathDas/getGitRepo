import React, { useState, useEffect } from "react";

//  Splits the "link" response header and returns an array
const getLinks = (str) => {
  return str
    .split(",")
    .map((x) => x.split(";"))
    .map((y) => y[0].trim().slice(1, -1));
};

const Pagination = ({
  inputUsername,
  setGlobalCurrentPage,
  globalCurrentPage,
}) => {
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.github.com/users/${inputUsername}/repos?per_page=10&sort=created`
    )
      .then((res) => {
        if (res.status !== 200) {
          setIsError(true);
        }
        // Get "link" headers from the response
        const linkString = res.headers.get("link");
        // Check if the returned string is null
        if (linkString === null) {
          setPageCount(1);
          return res.json();
        }
        // Split the "link" response header
        const strArr = getLinks(linkString);
        // Separate &page=10 from the last page "link" reponse header
        const x = strArr[strArr.length - 1].split("=");
        // Get the integer of last page number
        const lastPageNumber = parseInt(x[x.length - 1]);
        setPageCount(lastPageNumber);
        return res.json();
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      });
  }, []);

  if (isError) {
    return <h1 className={`font-bold text-red-500`}>An Error Occured</h1>;
  }

  const nextHandler = () => {
    if (globalCurrentPage < pageCount) {
      setGlobalCurrentPage(globalCurrentPage + 1);
    }
  };

  const prevHandler = () => {
    if (globalCurrentPage > 1) {
      setGlobalCurrentPage(globalCurrentPage - 1);
    }
  };
  return (
    <div className={`text-blue-500 text-sm flex p-4`}>
      {isLoading ? (
        "..."
      ) : (
        <ul className={`flex border-1 border-dark rounded-md `}>
          {/* First Child Of the Unordered List */}
          <li>
            <button
              className={`p-2 border-r-1 border-dark ${
                globalCurrentPage === 1
                  ? "opacity-40"
                  : "hover:bg-blue-500 hover:text-white rounded-l-md"
              } `}
              onClick={prevHandler}
              disabled={globalCurrentPage === 1}
            >
              Previous
            </button>
          </li>
          {/* First Child Of the Unordered List */}
          {/* Ranged children of the Unordered List*/}
          {[...Array(pageCount).keys()].map((x) => (
            <li key={x} className={`hidden md:block`}>
              <button
                onClick={() => setGlobalCurrentPage(x + 1)}
                className={`${
                  globalCurrentPage === x + 1 ? " bg-secondary-btn" : ""
                } p-2  border-r-1 border-dark`}
              >
                {x + 1}
              </button>
            </li>
          ))}
          {/* Ranged children of the Unordered List*/}
          {/* Last Child of the Unordered List*/}
          <li>
            <button
              className={`p-2 ${
                globalCurrentPage === pageCount ? "opacity-40 " : ""
              } hover:bg-blue-500 hover:text-white transition-all rounded-r-md`}
              onClick={nextHandler}
              disabled={globalCurrentPage === pageCount}
            >
              Next
            </button>
          </li>
          {/* Last Child of the Unordered List*/}
        </ul>
      )}
    </div>
  );
};

export default Pagination;
