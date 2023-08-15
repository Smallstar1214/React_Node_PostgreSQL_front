
import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from 'react-paginate';


import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Button, Progress, Table } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { ApiService } from "services/api.service";
import { useSelector } from "react-redux";
import TableContainer from "../../components/Common/TableContainer";

function CampaignList() {

  const {
    search,
    status
  } = useSelector(state => ({
    search: state.Layout.search,
    status: state.Layout.status,
  }));

  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("authUser")));

  const [list, setList] = useState([]);
  const columns = useMemo(
    () => [
      {
        Header: 'Campaign & Brand',
        accessor: 'brand',
        disableFilters: true,
      },
      {
        Header: 'Completion',
        accessor: 'completion',
        disableFilters: true,
      },
      {
        Header: 'Planned',
        accessor: 'planned',
        disableFilters: true,
      },
      {
        Header: 'delivered',
        accessor: 'delivered',
        disableFilters: true,
      },
      {
        Header: 'status',
        accessor: 'status',
        disableFilters: true,
      },
      {
        Header: 'notes',
        accessor: 'notes',
        disableFilters: true,
      },
      {
        Header: 'Start - Finish',
        accessor: 'period',
        disableFilters: true,
      }
    ],
    []
  );

  useEffect(() => {
    getAllCampaigns();
  }, []);

  const getAllCampaigns = () => {
    const page = 0;
    const pageSize = 20;
    ApiService.getAllCampaigns(search, status, page, pageSize).then(res => {
      if (res.status === 200) {
        setList(res.data);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  useEffect(() => {
    getAllCampaigns();
  }, [search, status]);

  document.title = "Campaign List Page";

  return (
    <div className="page-content">
      <div className="container-fluid" style={{overflowX:'hidden'}}>
        <Breadcrumbs title="Campaign" breadcrumbItem="List" />
        <div className="text-sm-end">
          {authUser.role !== "3" &&
            <Link to="/campaign/save/0">
              <Button
                type="button"
                color="success"
                className="btn-rounded mb-2 me-2"
              >
                <i className="mdi mdi-plus me-1" />
                Add
              </Button>
            </Link>
          }
        </div>
        <div className="table-responsive" style={{overflowX:'hidden'}}>          
          <TableContainer
            columns={columns}
            data={list}
            customPageSize={'10'}
            pageSizes={['5', '10', '25', '50', 'All']}
            className="custom-header-css"
          />
        </div>
      </div>
    </div>
  );
}

export default CampaignList;