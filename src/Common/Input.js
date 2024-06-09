import React from "react";
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const Input = ({
  type,
  label,
  name,
  value,
  onChange,
  disabled,
  options = [],
  multiple = false,
  ...rest
}) => {
  if (type === "text") {
    return (
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        fullWidth
        {...rest}
      />
    );
  } else if (type === "checkbox") {
    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Checkbox checked={value} onChange={onChange} name={name} />
      </FormControl>
    );
  } else if (type === "select") {
    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          multiple={multiple}
          {...rest}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  return null;
};

export default Input;
