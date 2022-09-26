import React from "react";
import ICalendarLink from "react-icalendar-link";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  IconButton,
  Box,
  useTheme,
  TableFooter,
  TablePagination,
} from "@mui/material";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  makeStyles,
  Avatar,
  Grid,
  Typography,
} from "@material-ui/core";

//initialize the style of the Table
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 850,
    maxWidth: 1280
  },
  tableContainer: {
    borderRadius: 15,
    margin: "5px 5px",
    maxWidth: 1280
  },
  tableHeaderCell: {
    fontSize: 18,
    fontFamily: "'Source Sans Pro', sans-serif",
    fontWeight: "bold",
    width: 140,
    textAlign: "center",
    backgroundColor: "#EFA332",
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  tableCell: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "'Source Sans Pro', sans-serif"
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.warning.main
  },
  link: {
    textDecoration: "none",
    color: theme.palette.info.dark
  },
  tableCellPeriod: {
    paddingRight: 5,
    paddingLeft: 5
  },
  tableCellTotalPeriod: {
    fontWeight: "bold",
    paddingTop: 5,
    color: "#004263"
  },
}));

//pagination component with the handle functions
const PaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageBtn = (event) => {
    onPageChange(event, 0);
  };

  const handleBackBtn = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextBtn = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageBtn = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 5 }}>
      <IconButton
        onClick={handleFirstPageBtn}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackBtn}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextBtn}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageBtn}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

//AbsenceTable component 
export const AbsenceTable = ({
  rowsPerPage,
  absenceList,
  page,
  memberName,
  period,
  totalPeriod,
  status,
  imageSrc,
  errorState,
  changePage,
  changeRowsPerPage
}) => {
  const classes = useStyles();

  //initialize the header of the table
  const columns = [
    { id: "name", label: "Member Name" },
    { id: "type", label: "Type of Absence" },
    { id: "period", label: "Period" },
    { id: "memberNote", label: "Member Note" },
    { id: "status", label: "Status" },
    { id: "admitterNote", label: "Admitter Note" },
    { id: "exportICal", label: "Export iCal" }
  ];

  //Ical function 
  const getIcalFormat = (values) => {
    return {
      title: values["memberNote"] || "No note available",
      description: values["type"],
      startTime: values["startDate"],
      endTime: values["endDate"],
      location: values["type"] === "vacation" ? "other" : "sickness"
    };
  };

  return (
    <div className="table">
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className={classes.tableHeaderCell}
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? absenceList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : absenceList
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell className={classes.tableCell}>
                  <Grid container>
                    <Grid item lg={6}>
                      <Avatar src={imageSrc(row.userId)} alt={"..."} />
                    </Grid>
                    <Grid item lg={4}>
                      <Typography className={classes.name}>
                        {memberName(row.userId)}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell className={classes.tablePeriod}>
                  {row.type}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography className={classes.tableCellPeriod}>
                    {period(row.startDate, row.endDate)}
                  </Typography>
                  <Typography
                    className={`${classes.tableCellPeriod} ${classes.tableCellTotalPeriod}`}
                  >
                    Totlal:{totalPeriod(row.startDate, row.endDate)}
                  </Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.memberNote || "No note available"}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {status(row.confirmedAt, row.createdAt, row.rejectedAt)}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.admitterNote || "No note available"}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <ICalendarLink
                    event={getIcalFormat(row)}
                    className={classes.link}
                  >
                    Download iCal
                  </ICalendarLink>
                </TableCell>
              </TableRow>
            ))}
            {errorState()}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={7}
                count={absenceList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={changePage}
                onRowsPerPageChange={changeRowsPerPage}
                ActionsComponent={PaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};
