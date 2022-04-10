import React from "react";
import Topic from "./Topic";

function RepoCard({ data }) {
  return (
    <article className={` w-11/12 border-b-1 border-dark p-4`}>
      <div>
        <h1 className={`md:text-3xl text-xl text-blue-500`}>
          <a href={data.html_url} target="_blank" referrerPolicy="no-referrer">
            {data.name}
          </a>
        </h1>
        <p className={`text-secondary-text`}>{data.description}</p>
      </div>
      <ul className={` `}>
        {data.topics === undefined
          ? ""
          : data.topics.map((name, index) => (
              <Topic index={index} topicName={name} />
            ))}
      </ul>
    </article>
  );
}

export default RepoCard;
