import React, { useEffect, useState } from "react";
import CommonInput from "../../Common/Input";
import { Grid, Button } from "@mui/material";
import LivePreview from "./LivePreview";

const flex = { display: "flex", alignItems: "center" };

const initialJobPost = {
  title: "",
  intro: "",
  roles: "",
  min: "",
  max: "",
  qualification: "",
  salary: "",
  desc: "",
  company: "",
  location: "",
  type: "",
  labels: [],
};

const ManageJobPost = ({ jobPost, onSave }) => {
  const [errors, setErrors] = useState({
    title: "",
    company: "",
    location: "",
  });
  const [jobPostData, setJobPostData] = useState(jobPost || initialJobPost);
  const [preview, setPreview] = useState({});
  const [fieldSelections, setFieldSelections] = useState(
    !jobPost
      ? {
          title: false,
          intro: false,
          roles: false,
          min: false,
          max: false,
          qualification: false,
          salary: false,
          desc: false,
          company: false,
          location: false,
          type: false,
          labels: false,
        }
      : {
          title: !!jobPost.title,
          intro: !!jobPost.intro,
          roles: !!jobPost.roles,
          min: !!jobPost.min,
          max: !!jobPost.max,
          qualification: !!jobPost.qualification,
          salary: !!jobPost.salary,
          desc: !!jobPost.desc,
          company: !!jobPost.company,
          location: !!jobPost.location,
          type: !!jobPost.type,
          labels: !!jobPost.labels.length,
        }
  );

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setJobPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (event) => {
    const { name, value } = event.target;
    setJobPostData((prev) => ({
      ...prev,
      [name]: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleFieldSelectChange = (event) => {
    const { name, checked } = event.target;
    setFieldSelections((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    let newErrors = {};
    if (!jobPostData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!jobPostData.company.trim()) {
      newErrors.company = "Company is required";
    }
    if (!jobPostData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSave(jobPostData);
    }
  };

  const fieldType = [
    {
      name: "title",
      type: "text",
      checkboxValue: fieldSelections.title,
      label: "Job Post Title",
      fieldValue: jobPostData.title,
      disabled: !fieldSelections.title,
      error: !!errors.title,
      helperText: errors.title,
    },
    {
      name: "company",
      type: "text",
      checkboxValue: fieldSelections.company,
      label: "Company",
      fieldValue: jobPostData.company,
      disabled: !fieldSelections.company,
      error: !!errors.company,
      helperText: errors.company,
    },
    {
      name: "min",
      name2: "max",
      type: "select",
      checkboxValue: fieldSelections.min,
      label: "Min. Experience",
      label2: "Max Experience",
      fieldValue: jobPostData.min,
      fieldValue2: jobPostData.max,
      disabled: !fieldSelections.min,
      options1: [
        { value: "0", label: "0 years" },
        { value: "1", label: "1 year" },
        { value: "2", label: "2 years" },
      ],
      options2: [
        { value: "0", label: "0 years" },
        { value: "1", label: "1 year" },
        { value: "2", label: "2 years" },
      ],
      select: true,
    },
    {
      name: "location",
      type: "text",
      checkboxValue: fieldSelections.location,
      label: "Location",
      fieldValue: jobPostData.location,
      disabled: !fieldSelections.location,
      error: !!errors.location,
      helperText: errors.location,
    },
    {
      name: "qualification",
      type: "text",
      checkboxValue: fieldSelections.qualification,
      label: "Qualification",
      fieldValue: jobPostData.qualification,
      disabled: !fieldSelections.qualification,
    },
    {
      name: "salary",
      type: "text",
      checkboxValue: fieldSelections.salary,
      label: "Salary Range",
      fieldValue: jobPostData.salary,
      disabled: !fieldSelections.salary,
    },
    {
      name: "intro",
      type: "text",
      checkboxValue: fieldSelections.intro,
      label: "Introduction",
      fieldValue: jobPostData.intro,
      disabled: !fieldSelections.intro,
      multiline: true,
      maxRows: 3,
    },
    {
      name: "roles",
      type: "text",
      checkboxValue: fieldSelections.roles,
      label: "Roles & Responsibility",
      fieldValue: jobPostData.roles,
      disabled: !fieldSelections.roles,
    },

    {
      name: "desc",
      type: "text",
      checkboxValue: fieldSelections.desc,
      label: "Description",
      fieldValue: jobPostData.desc,
      disabled: !fieldSelections.desc,
    },

    {
      name: "type",
      name2: "labels",
      type: "select",
      type2: "multiple",
      checkboxValue: fieldSelections.type,
      checkboxValue2: fieldSelections.labels,
      label: "Job Type",
      label2: "Labels",
      fieldValue: jobPostData.type,
      fieldValue2: jobPostData.labels,
      disabled: !fieldSelections.type,
      multiple: true,
      options1: [
        { value: "full-time", label: "Full-time" },
        { value: "part-time", label: "Part-time" },
        { value: "contract", label: "Contract" },
      ],
      options2: [
        { value: "urgent", label: "Urgent" },
        { value: "remote", label: "Remote" },
      ],
    },
  ];

  useEffect(() => {
    const updatedPreview = {};
    for (const key in fieldSelections) {
      if (fieldSelections[key]) {
        updatedPreview[key] = jobPostData[key];
      }
    }
    setPreview(updatedPreview);
  }, [jobPostData, fieldSelections]);

  return (
    <Grid sx={{ display: "flex" }}>
      <Grid container sx={{ p: 2 }}>
        {fieldType.map((d, i) => (
          <Grid item xs={12} sx={{ ...flex, mb: "1rem" }} key={i}>
            <Grid>
              <CommonInput
                type="checkbox"
                name={d.name}
                value={d.checkboxValue}
                onChange={handleFieldSelectChange}
              />
            </Grid>
            <CommonInput
              type={d.type}
              label={d.label}
              name={d.name}
              value={d.fieldValue}
              onChange={handleTextChange}
              disabled={d.disabled}
              options={d.options1}
              multiline={d.multiline}
              maxRows={d.maxRows}
              error={d.error}
              helperText={d.helperText}
            />
            {d.select && (
              <CommonInput
                type="select"
                label={d.label2}
                name={d.name2}
                value={d.fieldValue2}
                onChange={handleTextChange}
                disabled={d.disabled}
                options={d.options2}
              />
            )}
            {d.multiple && (
              <CommonInput
                type="select"
                label={d.label2}
                name={d.name2}
                value={d.fieldValue2}
                onChange={handleMultiSelectChange}
                disabled={d.disabled}
                multiple={true}
                options={d.options2}
              />
            )}
          </Grid>
        ))}
        <Grid container sx={{ mt: 2, justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <LivePreview jobPost={preview} />
      </Grid>
    </Grid>
  );
};

export default ManageJobPost;
