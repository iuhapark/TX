"use client";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

function DropdownMenu() {
  const [name, setName] = useState("");

  const handleChange = (event: any) => {
    setName(event.target.value);
  };

  return (
    <FormControl className="w-full rounded-2xl">
      <InputLabel id="name-label">변호사 이름</InputLabel>
      <Select
        labelId="name-label"
        id="name-select"
        value={name}
        label="name"
        onChange={handleChange}
        className="dark:text-white"
      >
        <MenuItem value="김시온">김시온</MenuItem>
        <MenuItem value="김호주">김호주</MenuItem>
        <MenuItem value="김호현">김호현</MenuItem>
        <MenuItem value="박주하">박주하</MenuItem>
        <MenuItem value="양동규">양동규</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DropdownMenu;
