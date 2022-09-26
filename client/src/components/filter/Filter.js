import React from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  filtersContainer: {
    display: "flex",
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 5,
    justifyContent: "space-between",
  },
  filters: {
    display: "flex",
    alignItems: "center",
    marginRight: 25,
    paddingLeft: 6
  },
  filterType: {
    paddingRight: 25,
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  statusFilter: {
    fontSize: 14,
    width: 220,
    fontFamily: "'Source Sans Pro', sans-serif",
    textAlign: "center",
  },
  dateFilter: {
    fontSize: 14,
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  totalAbsences: {
    fontSize: 18,
    color: "#004263",
    fontFamily: "'Source Sans Pro', sans-serif",
  },
}));

export const Filter = ({
  filterType,
  startDate,
  endDate,
  setFilterType,
  setStartDate,
  setEndDate,
  totalOfAbsence,
}) => {
  const classes = useStyles();
  /*
    - this component contains type filter, calendar from - to, and the Total number of Absences
    - handle functions to change the startDate and the endDate by the user
  */
  const handleDateToChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleDateFromChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div className={classes.filtersContainer}>
      <div className={classes.filters}>
        <div className={classes.filterType}>
          <FormControl className={classes.statusFilter} name="select-type">
            <InputLabel id="demo-simple-select-label">
              Select Type
            </InputLabel>
            <Select
              id="dropdown"
              name="select-type"
              label="select type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"vacation"}>Vacation</MenuItem>
              <MenuItem value={"sickness"}>Sickness</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="date">
          <TextField
            className={classes.dateFilter}
            id="dateFrom"
            onChange={handleDateToChange}
            onInput={handleDateToChange}
            value={startDate}
            label="From:"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className={classes.dateFilter}
            id="dateTo"
            onChange={handleDateFromChange}
            onInput={handleDateFromChange}
            value={endDate}
            label="To:"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </div>
      </div>
      <div className={classes.totalAbsences}>
        <strong>Total Absences: {totalOfAbsence}</strong>
      </div>
    </div>
  );
};
