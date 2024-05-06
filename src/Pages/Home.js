import React, { useState, useEffect, useRef } from "react";
import { Counter } from "../Components/Counter";
import ButtonUsage from "../Components/ButtonUsage";
import JobCard from "../Components/JobCard/JobCard";
import Grid from "@mui/material/Unstable_Grid2";
import { Container } from "@mui/material";
const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);
  const fetchData = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        limit: 12 * page,
        offset: 0,
      });
      console.log(raw, "raw");
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
      console.log(data.jdList.length, "lenth");
      setItems((prevItems) => [...prevItems, ...data.jdList]);
      setPage((prevPageNumber) => prevPageNumber + 1); // Increment page number to fetch next page
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {items.map((item, index) => (
          <Grid xs={4} sm={4} md={4} lg={3} key={index}>
            <JobCard {...item} />
          </Grid>
        ))}
      </Grid>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div ref={observerTarget}></div>
    </Container>
  );
};

export default Home;
