import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const columns = ["Name of Person", "Company Name", "Post Link"];

  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [searched, setSearched] = useState({
    name: "",
    company: "",
  });
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setApiData(data);
      setFullData(data);
      setLoading(false);
    }

    getData();
  }, []);

  useEffect(() => {
    if (searched.name !== "" || searched.company !== "") {
      const newData = () => {
        let names = fullData.filter((item) => {
          return item.name.toLowerCase().includes(searched.name.toLowerCase());
        });
        let companyies = fullData.filter((item) => {
          return item.company.name
            .toLowerCase()
            .includes(searched.company.toLowerCase());
        });
        return names.filter((item) => companyies.includes(item));
      };
      setApiData(newData());
    } else {
      setApiData(fullData);
    }
  }, []);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearched((prev) => {
      return {
       
        [name]: value,
      };
    });

    // if (value !== "") {
    //   const newData = () => {
    //     let names = fullData.filter((item) => {
    //         return item.name
    //           .toLowerCase()
    //           .includes(value.toLowerCase());
    //         });
    //     let companyies = fullData.filter((item) => {

    //         return item.company.name
    //           .toLowerCase()
    //           .includes(value.toLowerCase());
    //     });
    //     return names.filter((item) => companyies.includes(item));
    //   };
    //   setApiData(newData());
    // } else {
    //   setApiData(fullData);
    // }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={searched.name}
          label="name"
          name="name"
          variant="standard"
          onChange={handleSearch}
        />
        <TextField
          value={searched.company}
          label="company"
          name="company"
          variant="standard"
          onChange={handleSearch}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={column} align={index ? "right" : "left"}>
                  {column}
                </TableCell>
              ))}
              {/* <TableCell>Name</TableCell>
               <TableCell align="right">Company</TableCell>
              <TableCell align="right">Post Link</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.company.name}</TableCell>
                <TableCell align="right">
                  <Link to={`/posts/${row.id}`}>View User Posts</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}