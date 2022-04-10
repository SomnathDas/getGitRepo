import React, { useEffect, useState } from "react";
import { BsPeople, BsLink45Deg, BsTwitter } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import Loader from "./Loader";

const UserDetails = ({ inputUsername }) => {
  const [userData, setUserData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/${inputUsername}`)
      .then((res) => {
        if (res.status !== 200) {
          setIsError(true);
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  return (
    <div
      className={`lg:w-1/4 md:w-1/2 w-full flex flex-col gap-2 items-center text-white`}
    >
      {isLoading ? (
        <Loader />
      ) : isLoading === false && isError === false ? (
        <>
          <div className={`flex flex-col justify-center items-center gap-2`}>
            {/* Profile Picture*/}
            <img
              src={userData.avatar_url}
              alt="Profile Picture of the user"
              className={`rounded-full md:w-9/12 w-1/2`}
            />
            {/* Profile Picture*/}
            {/* Username and Real Name*/}
            <div className={`md:w-full md:text-left text-center`}>
              <h1
                className={`md:text-3xl text-2xl font-bold text-primary-text`}
              >
                {userData.name}
              </h1>
              <h2 className={`md:text-xl font-medium text-secondary-text`}>
                {userData.login}
              </h2>
            </div>
            {/* Username and Real Name*/}
          </div>

          {/* Bio */}
          <div className={`md:w-full`}>
            <p className={`text-md text-primary-text`}>{userData.bio}</p>
          </div>
          {/* Bio */}
          {/* Followers and Following */}
          <div
            className={`md:w-full flex items-center gap-2 text-secondary-text text-sm`}
          >
            <BsPeople size={18} />
            <p className={`text-primary-text`}>
              {userData.followers}{" "}
              <span className={`text-secondary-text`}>followers</span> ·{" "}
              {userData.following}{" "}
              <span className={`text-secondary-text`}>following</span>
            </p>
          </div>
          {/* Followers and Following */}
          {/* Location */}
          <div
            className={`md:w-full flex items-center gap-1 text-primary-text`}
          >
            <GoLocation />
            <p>{userData.location}</p>
          </div>
          {/* Location */}
          {/* Personal Website */}
          <div
            className={`md:w-full flex items-center gap-1 text-primary-text`}
          >
            <BsLink45Deg size={20} />
            <a
              href={"https://" + userData.blog}
              target="_blank"
              referrerPolicy="no-referrer"
              className={`hover:text-blue-500 hover:underline`}
            >
              {userData.blog}
            </a>
          </div>
          {/* Personal Website */}
          {/* Twitter */}
          <div
            className={`md:w-full flex items-center gap-1 text-primary-text border-b-1 border-dark pb-4 mb-4`}
          >
            <BsTwitter />
            <a
              href={"https://twitter.com/" + userData.twitter_username}
              target="_blank"
              referrerPolicy="no-referrer"
              className={`hover:text-blue-500 hover:underline`}
            >
              {userData.twitter_username}
            </a>
          </div>
          {/* Twitter */}
        </>
      ) : (
        <h1 className={`font-bold text-red-500`}>
          {userData.message === "Not Found"
            ? "Error! Invalid Username"
            : "An Error Occured"}
        </h1>
      )}
    </div>
  );
};

export default UserDetails;
