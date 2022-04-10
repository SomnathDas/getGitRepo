import "./App.css";
import SearchBar from "./components/SearchBar";
import UserDetails from "./components/UserDetails";
import Pagination from "./components/Pagination";
import RepoList from "./components/RepoList";
import Loader from "./components/Loader";
import { useState } from "react";

function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div
      className={`App h-full w-full  ${
        !isFetching ? "flex justify-center items-center w-screen h-screen" : ""
      }`}
    >
      {isFetching ? (
        <section className={`flex md:flex-row flex-col gap-2 pt-12 md:pl-10`}>
          <UserDetails inputUsername={userInput} />
          <div className={`flex flex-col items-center w-full `}>
            <RepoList
              inputUsername={userInput}
              globalCurrentPage={currentPage}
              isFetching={isFetching}
            />
            <Pagination
              inputUsername={userInput}
              globalCurrentPage={currentPage}
              setGlobalCurrentPage={(value) => setCurrentPage(value)}
            />
          </div>
        </section>
      ) : isFetching ? (
        <Loader />
      ) : (
        <SearchBar
          input={userInput}
          setInput={(value) => setUserInput(value)}
          setIsFetching={(value) => setIsFetching(value)}
        />
      )}
    </div>
  );
}

export default App;
