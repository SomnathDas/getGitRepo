import React from "react";

function Topic({ index, topicName }) {
  return (
    <li
      className={`text-blue-500 bg-primary-tag rounded-full  inline-flex justify-center pt-1 pb-1 pl-2 pr-2 m-1 hover:bg-blue-500 hover:text-white cursor-pointer`}
      key={index * 2}
    >
      <a href={"https://github.com/topics/" + topicName} className={`text-sm`}>
        {topicName}
      </a>
    </li>
  );
}

export default Topic;
