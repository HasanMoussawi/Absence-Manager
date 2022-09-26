import React from "react";
import { useEffect, useState } from "react";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { Filter } from "../filter/Filter.js";
import { AbsenceTable } from "../absenceTable/AbsenceTable.js";
import { Loader } from "../loader/Loader.js";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function Employees() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [absenceData, setAbsenceData] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [absenceList, setAbsenceList] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const moment = extendMoment(Moment);

  //this function change the page number
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //inside this function, the number of rows, the default value of the displayed rows is 10
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* 
    - declare the async data fetching functions
    - setting the value of loading state to true
    - get the data from the api http://localhost:5000/....
    - convert data to json
    - catch any error 
*/
  async function fetchAbsence() {
    setLoading(true);
    await fetch("http://localhost:5000/absences")
      .then((response) => response.json())
      .then((data) => {
        setError(!data.payload);
        setAbsenceData(data.payload ? data.payload : []);
        setAbsenceList(data.payload ? data.payload : []);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function fetchMembers() {
    setLoading(true);
    await fetch("http://localhost:5000/members")
      .then((response) => response.json())
      .then((response) => {
        setError(!response.payload);
        setMemberData(response.payload ? response.payload : []);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //return the name for each member
  const getMemberName = (userId) => {
    let user = memberData.find((row) => row.userId === userId);
    return user?.name;
  };

  //return the url image for each member
  const getImage = (userId) => {
    let url = memberData.find((row) => row.userId === userId);
    return url?.image;
  };

  //return the startDate & the endDate of the period
  const getPeriod = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    return (
      `${
        month[start.getUTCMonth()]
      }/${start.getUTCDate()}/${start.getUTCFullYear()} ` +
      `${month[end.getUTCMonth()]}/${end.getUTCDate()}/${end.getUTCFullYear()} `
    );
  };

  //calculate the total days of the absence period
  const getTotalPeriod = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const range = moment.range(start, end);
    return range.diff("days") + 1;
  };

  // retun the satus if is it confirmed, rejected or still requested
  const getStatus = (confirmedAt, rejectedAt, createdAt) => {
    if (!!confirmedAt) {
      return "Confirmed";
    }
    if (!!rejectedAt) {
      return "Rejected";
    }
    return "Requested";
  };

  /*
    - This function check if there a problem to connect with the server, it returns Failed error,
    - Also, if no data returned from the fetching functions, an error appear to tell us no data found! 
  */
  function handleErrorState() {
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={7} style={{ textAlign: "center" }}>
            Failed to load resources.
          </TableCell>
        </TableRow>
      );
    } else if (absenceList.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} style={{ textAlign: "center" }}>
            No Data Found!
          </TableCell>
        </TableRow>
      );
    }
  }
  //useEffect function to invoke fetching functions
  useEffect(() => {
    fetchAbsence();
    fetchMembers();
  }, []);

  useEffect(() => {
    //check if the user change the filtertype and select a start date and finally an end date
    if (filterType !== "" && startDate && endDate) {
      setAbsenceList(
        absenceData.filter(
          (row) =>
            row.type.includes(filterType) &&
            new Date(startDate) <= new Date(row.startDate) &&
            new Date(endDate) >= new Date(row.endDate)
        )
      ); //only if the startDate and the endDate changed/selected
    } else if (startDate && endDate) {
      setAbsenceList(
        absenceData.filter(
          (row) =>
            new Date(startDate) <= new Date(row.startDate) &&
            new Date(endDate) >= new Date(row.endDate)
        )
      ); //the filterType and the startDate changed
    } else if (filterType !== "" && startDate) {
      setAbsenceList(
        absenceData.filter(
          (row) =>
            row.type.includes(filterType) &&
            new Date(startDate) <= new Date(row.startDate)
        )
      ); //the filterType and the endDate changed
    } else if (filterType !== "" && endDate) {
      setAbsenceList(
        absenceData.filter(
          (row) =>
            row.type.includes(filterType) &&
            new Date(endDate) >= new Date(row.endDate)
        )
      ); //value returned only based on the filter type
    } else if (filterType !== "") {
      setAbsenceList(
        absenceData.filter((row) => row.type.includes(filterType))
      ); // on the startDate
    } else if (startDate) {
      setAbsenceList(
        absenceData.filter((row) => {
          return new Date(startDate) <= new Date(row.startDate);
        })
      ); // the endDate changed
    } else if (endDate) {
      setAbsenceList(
        absenceData.filter((row) => {
          return new Date(endDate) >= new Date(row.endDate);
        })
      );
    } else {
      setAbsenceList(absenceData);
    }
  }, [filterType, startDate, endDate, absenceData]);

  return (
    <div className="header-top">
      <Filter
        filterType={filterType}
        startDate={startDate}
        endDate={endDate}
        setFilterType={setFilterType}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        totalOfAbsence={absenceList.length}
      />
      {loading ? (
        <Loader />
      ) : (
        <AbsenceTable
          rowsPerPage={rowsPerPage}
          absenceList={absenceList}
          page={page}
          memberName={getMemberName}
          period={getPeriod}
          totalPeriod={getTotalPeriod}
          status={getStatus}
          imageSrc={getImage}
          errorState={handleErrorState}
          changePage={handleChangePage}
          changeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
}
