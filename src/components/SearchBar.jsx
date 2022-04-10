import React from "react";

const SearchBar = ({ input, setInput, setIsFetching }) => {
  return (
    <div className={`flex flex-col gap-4 p-2`}>
      <h1 className={`md:text-5xl text-xl text-white`}>
        Github Repository Fetcher
      </h1>

      <form className={`w-full`} onSubmit={() => setIsFetching(true)}>
        <input
          type="text"
          placeholder="Enter github username"
          className={`w-full bg-transparent  border-1 border-dark p-1 rounded-sm text-primary-text`}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
