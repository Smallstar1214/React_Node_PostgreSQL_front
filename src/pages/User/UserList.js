// src/components/filter.
import React, { Fragment, useEffect, useMemo, useState } from "react";

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Button, Input, InputGroup, Progress, Row, Table, Toast, ToastBody } from "reactstrap";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import { ApiService } from "services/api.service";
import avatar from "../../assets/images/profile-img.png"
import { Constant } from "common/contant";
import { useSelector } from "react-redux";

function UserList() {

  const {
    search
  } = useSelector(state => ({
    search: state.Layout.search
  }));

  const [selectedRow, setSelectedRow] = useState("");
  const [showAddFlag, setShowAddFlag] = useState(false);

  const [list, setList] = useState([]);
  const columns = useMemo(
    () => [
      {
        header: '#',
        accessor: '',
      },
      {
        header: 'Avatar',
        accessor: 'avatar',
      },
      {
        header: 'Name',
        accessor: 'name'
      },
      {
        header: 'Email',
        accessor: 'email'
      },
      {
        header: 'Role',
        accessor: 'role'
      },
      {
        header: 'Last Login Date',
        accessor: 'lastLoginDate'
      },
      {
        header: 'Action',
        accessor: 'action'
      }
    ],
    []
  );

  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);

  const toggleToast = () => {
    setToast(!toast);
  };

  useEffect(() => {
    getAllUsers();
  }, [search]);

  const getAllUsers = () => {
    ApiService.getAllUsers(search).then(res => {
      if (res.status === 200) {
        setList(res.data);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  const handleLock = (id) => {
    if (selectedRow !== id) {
      setSelectedRow(id);
    } else {
      setSelectedRow("");
    }
  }

  const handleDelete = (id) => {
    ApiService.deleteUser(id).then(res => {
      if (res.status === 200) {
        setMessage(res.data.message);
        setToast(true);
        setTimeout(function () {
          setToast(false);
        }, 3000);
        getAllUsers();
      }
    }).catch(err => {
      console.log(err);
    });
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  //meta title
  document.title = "Users";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Users" breadcrumbItem="List" />
        <div className="text-sm-end">
          <Link to="/user/add">
            <Button
              type="button"
              color="success"
              className="btn-rounded mb-2 me-2"
            >
              <i className="mdi mdi-plus me-1" />
              Add
            </Button>
          </Link>
        </div>
        <div className="table-responsive">
          <Table className="table mb-0 mw-100">
            <thead className="table-light table-nowrap">
              <tr>
                {columns.map((column, index) => {
                  return (
                    <th key={index} className="text-uppercase">
                      {column.header}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => {
                return (
                  <tr key={index} onClick={() => handleLock(item.id)}
                    className={selectedRow === item.id ? "align-middle bg-light" : "align-middle"}>
                    <td>{index + 1}</td>
                    <td>
                      <img alt="avatar"
                        src={Constant.serverUrl + item.avatar}
                        className="avatar-sm"
                        style={{ objectFit: "cover" }} />
                    </td>
                    <td>{item.firstname} {item.lastname}</td>
                    <td>{item.email}</td>
                    {/* <td>
                      
                    </td> */}
                    {
                      (item?.role === '1') && (
                        <td>Superuser</td>
                      )
                    }
                    {
                      (item?.role === '2') && (
                        <td>operation</td>
                      )
                    }
                    {
                      (item?.role === '3') && (
                        <td>sales</td>
                      )
                    }
                    <td>
                      {new Date(item.lastlogindate).toISOString().replace(/T/, ' ').replace(/\..+/, '')}
                    </td>
                    <td className="text-center text-primary">
                      <Link to={"/user/Edit/" + item.id}>
                        <i className="bx bxs-edit h4"></i>
                      </Link>
                      <i className="bx bxs-trash h4" onClick={() => handleDelete(item.id)}></i>
                    </td>
                  </tr>
                )
              })}

              {list.length === 0 &&
                <tr>
                  <td colSpan={7} className="text-center"> No Datas </td>
                </tr>
              }
            </tbody>
          </Table>
        </div>
      </div>

      <div className="toast-container position-absolute top-0 end-0 p-2 p-lg-3">
        <Toast isOpen={toast}
          className="align-items-center text-white bg-primary border-0 fadeIn"
          role="alert" onClick={() => setToast(false)}>
          <ToastBody>
            {message}
          </ToastBody>
        </Toast>
      </div>
    </div>
  );
}

export default UserList;