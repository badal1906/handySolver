import { Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

const LivePreview = ({ jobPost }) => {
  return (
    <>
      <Grid
        item
        xs={12}
        sx={{
          border: "2px solid lightgray",
          borderRadius: "12px",
          p: 2,
          height: "30%",
          wordBreak: "break-all",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>
          {jobPost.title || "Job Title"}
        </Typography>
        <Typography
          sx={{ fontSize: "small", color: "gray", fontWeight: "bold" }}
        >
          {jobPost.company || "Company"}
        </Typography>
        <Grid sx={{ display: "flex", alignItems: "center" }}>
          <WorkOutlineIcon sx={{ mr: "1rem" }} /> {jobPost.min || "Min Exp."}-
          {jobPost.max || " Max Exp "}
          Years
        </Grid>
        <Grid sx={{ display: "flex", alignItems: "center" }}>
          <LocationOnOutlinedIcon sx={{ mr: "1rem" }} /> {jobPost.location}
        </Grid>
        <Grid sx={{ display: "flex", alignItems: "center" }}>
          <SchoolOutlinedIcon sx={{ mr: "1rem" }} /> {jobPost.qualification}{" "}
          <CurrencyRupeeOutlinedIcon sx={{ ml: "1rem" }} /> {jobPost.salary}
        </Grid>

        <Divider sx={{ m: "8px 0" }} orientation="horizontal" />
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Type - {jobPost?.type}</Typography>
          <Typography>
            Labels - {jobPost.labels && jobPost.labels.join(" , ")}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        xs={12}
        sx={{
          height: "65%",
          p: 2,
          borderRadius: "12px",
          border: "2px solid lightgray",
          wordBreak: "break-all",
        }}
      >
        <Typography>{jobPost.intro || "Introduction"}</Typography>
        <Typography> {jobPost.roles || "Roles and Responsibility"}</Typography>
        <Typography>{jobPost.desc} </Typography>
      </Grid>
    </>
  );
};

export default LivePreview;
