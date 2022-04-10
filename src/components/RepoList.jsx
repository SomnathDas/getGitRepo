import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import RepoCard from "./RepoCard";

const RepoList = ({ inputUsername, globalCurrentPage }) => {
  const [repoData, setRepoData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.github.com/users/${inputUsername}/repos?per_page=10&sort=created&page=${globalCurrentPage}`
    )
      .then((res) => {
        if (res.status !== 200) {
          setIsError(true);
        }
        return res.json();
      })
      .then((data) => {
        setRepoData(data);
        setLoading(false);
      });
  }, [globalCurrentPage]);

  return (
    <>
      {isLoading ? (
        <div
          className={`${
            isLoading === true
              ? "flex justify-center items-center h-screen"
              : ""
          }`}
        >
          <Loader />
        </div>
      ) : (
        <div className={`w-full flex flex-col gap-4 items-center `}>
          {isError === false ? (
            repoData.map((x, index) => <RepoCard data={x} key={index - 12} />)
          ) : (
            <h1 className={`font-bold text-red-500`}>
              {repoData.message === "Not Found"
                ? "Error! Invalid Username"
                : "An Error Occured"}
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default RepoList;
