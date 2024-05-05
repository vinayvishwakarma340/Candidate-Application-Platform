import * as React from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

export default function ButtonUsage() {
  const count = useSelector((state) => state.counter.value);
  return <Button variant="contained">Hello world {count}</Button>;
}
