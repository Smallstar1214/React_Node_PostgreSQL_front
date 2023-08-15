import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input, Progress } from "reactstrap";
import { Filter} from "./filters";
import { useNavigate } from "react-router-dom";


const CollapsibleRow = ({ item, selectedRow, handleLock, hiddenColumns }) => {
  return (
    <>
      <tr onClick={() => handleLock(item.original.id)} className="align-middle text-center">
        <td>
          <b>{item.original.campaign}</b>
          <p>{item.original.brand}</p>
        </td>
        <td>
          <div>
            {item.original.difference > 0 ?
              <Progress color="success" value={item.original.completion}
                className="progress-xl"
                animated>
                <span className="font-size-13" style={{ color: "#333" }}>{item.original.completion}%</span>
              </Progress> :
              <Progress color="danger" value={item.original.completion}
                className="progress-xl"
                animated>
                <span className="font-size-13" style={{ color: "#333" }}>{item.original.completion}%</span>
              </Progress>
            }
          </div>
        </td>
        <td>{item.original.planned?.toLocaleString()}</td>
        <td>{item.original.delivered?.toLocaleString()}</td>
        <td>{item.original.status}</td>
        <td>
          <label title={item.original.notes}>
            <i className="bx bxs-note h4"></i>
          </label>
        </td>
        <td className="text-center">
          <div>{new Date(item.original.start)?.toLocaleDateString('en-GB')}</div>
          <div>{new Date(item.original.finish)?.toLocaleDateString('en-GB')}</div>
        </td>
      </tr>
    </>
  )
};
const TableContainer = ({
  columns,
  data,
  customPageSize,
  className,
  customPageSizeOptions,
  pageSizes
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const [selectPageSize, setSelectPageSize] = useState(customPageSize);
  const [selectedRow, setSelectedRow] = useState("");
  const navigate = useNavigate();

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = event => {
     if(event.target.value === 'All') setPageSize(data.length.toString());
     
    // else setPageSize(Number(event.target.value));
    // console.log(pageSizes);
    else setPageSize(event.target.value);
    console.log(event.target.value);
    setSelectPageSize(event.target.value);
  }
  const onChangeInInput = event => {
    console.log(event.target.value);
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  const handleLock = (id) => {
    if (selectedRow !== id) {
      setSelectedRow(id);
      navigate("/campaign/detail/" + id, {state:{data: id} } );
    } else {
      setSelectedRow("");
    }
  }

  return (
    <Fragment>
      <Row className="mb-2">
        <Col md={customPageSizeOptions ? 2 : 1}>
          <select
            className="form-select"
            value={selectPageSize}
            onChange={onChangeInSelect}
          >
            {pageSizes.map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col>
      </Row>

      <div className="table-responsive react-table" style={{overflowX:'hidden'}}>
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap">
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th key={column.id}>
                    <div className="mb-2" {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    {column.filterable && 
                      <Filter column={column} />
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <CollapsibleRow key={row.id} item={row} selectedRow={selectedRow} handleLock={handleLock} />
              )
            })}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
