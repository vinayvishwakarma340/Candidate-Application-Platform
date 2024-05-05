import React, { useState, useEffect, useRef } from "react";
import { Counter } from "../Components/Counter";
import ButtonUsage from "../Components/ButtonUsage";
import JobCard from "../Components/JobCard/JobCard";
const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        limit: 20 * page,
        offset: 0,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const response = await fetch(
        `https://api.weekday.technology/adhoc/getSampleJdJSON`,
        requestOptions
      );
      const data = await response.json();

      setItems((prevItems) => [...prevItems, ...data.jdList]);
      setPage((prevPageNumber) => prevPageNumber + 1); // Increment page number to fetch next page
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle scroll event
  const handleScroll = () => {
    if (
      window.innerHeight + Math.round(document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);
  return (
    <div>
      <div>
        {items.map((item, index) => (
          <JobCard key={index} {...item} />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );

  return (
    <div>
      <JobCard />
      {/* <Counter />
      <ButtonUsage /> */}
    </div>
  );
};

export default Home;
