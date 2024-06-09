import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const JobPostTable = ({ jobPosts, onEdit, handleDuplicate }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobPosts.map((jobPost, index) => (
            <TableRow key={index}>
              <TableCell>{jobPost.title}</TableCell>
              <TableCell>{jobPost.company}</TableCell>
              <TableCell>{jobPost.location}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onEdit(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDuplicate(index)}
                  sx={{ ml: "1rem" }}
                >
                  Duplicate
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobPostTable;
