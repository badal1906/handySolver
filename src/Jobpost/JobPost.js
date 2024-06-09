import React, { useState } from "react";
import { Grid, Button, Modal, Box } from "@mui/material";
import ManageJobPost from "./Create/ManageJobPost";
import JobPostTable from "./JobPostTable";
import CustomModal from "../Common/CustomModal";
import Input from "../Common/Input";

const JobPostManager = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [currentJobPost, setCurrentJobPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [jobToDuplicate, setJobToDuplicate] = useState(null);
  const [newJobName, setNewJobName] = useState("");

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

  const handleDuplicate = (index) => {
    setJobToDuplicate(jobPosts[index]);
    setIsDuplicateModalOpen(true);
  };

  const handleSaveDuplicate = () => {
    if (newJobName.trim()) {
      const newJob = { ...jobToDuplicate, title: newJobName };
      setJobPosts((prev) => [...prev, newJob]);
      setIsDuplicateModalOpen(false);
      setNewJobName("");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create Job Post
        </Button>
      </Grid>
      <Grid item xs={12}>
        <JobPostTable
          jobPosts={jobPosts}
          onEdit={handleEdit}
          handleDuplicate={handleDuplicate}
        />
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

      <Modal
        open={isDuplicateModalOpen}
        onClose={() => setIsDuplicateModalOpen(false)}
        aria-labelledby="duplicate-job-modal"
        aria-describedby="duplicate-job-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <h2 id="duplicate-job-modal">Duplicate Job Post</h2>
            </Grid>
            <Grid item>
              <Input
                type="text"
                label="New Job Name"
                fullWidth
                value={newJobName}
                onChange={(e) => setNewJobName(e.target.value)}
              />
            </Grid>
            <Grid item container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveDuplicate}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => setIsDuplicateModalOpen(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
};

export default JobPostManager;
