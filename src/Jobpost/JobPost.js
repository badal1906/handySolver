import React, { useState } from "react";
import { Grid, Button, Modal, Box } from "@mui/material";
import ManageJobPost from "./Create/ManageJobPost";
import JobPostTable from "./JobPostTable";
import CustomModal from "../Common/CustomModal";

const JobPostManager = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [currentJobPost, setCurrentJobPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = () => {
    setCurrentJobPost(null);
    setIsModalOpen(true);
  };

  const handleEdit = (index) => {
    setCurrentJobPost(jobPosts[index]);
    setIsModalOpen(true);
  };

  const handleSave = (jobPost) => {
    setJobPosts((prev) => {
      if (currentJobPost) {
        return prev.map((post, idx) =>
          idx === prev.indexOf(currentJobPost) ? jobPost : post
        );
      } else {
        return [...prev, jobPost];
      }
    });
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create Job Post
        </Button>
      </Grid>
      <Grid item xs={12}>
        <JobPostTable jobPosts={jobPosts} onEdit={handleEdit} />
      </Grid>
      <CustomModal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{ overflow: "auto" }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Grid sx={{ fontSize: "16px" }}>Job Post</Grid>
          <Grid onClick={handleCloseModal} sx={{ cursor: "pointer" }}>
            Close
          </Grid>
        </Grid>

        <ManageJobPost jobPost={currentJobPost} onSave={handleSave} />
      </CustomModal>
    </Grid>
  );
};

export default JobPostManager;
