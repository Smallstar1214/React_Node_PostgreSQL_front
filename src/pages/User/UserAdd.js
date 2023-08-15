// src/components/filter.
import React, { Fragment, useMemo, useState } from "react";
import { Form, Link, useNavigate } from 'react-router-dom';

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Button, Card, CardBody, Col, FormFeedback, Input, Row, Toast, ToastBody, ToastHeader } from "reactstrap";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { useParams } from "react-router-dom";
import { ApiService } from "services/api.service";
import { useEffect } from "react";
import { Constant } from "common/contant";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

function UserAdd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    avatar: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });
  const [authUser, setAuthUser] = useState(null);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [file, setFile] = useState("/images/avatar_default.png");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: formData || {
      avatar: "/images/avatar_default.png",
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmPassword: '',
      role: 'operation'
    },
    validate: (values) => {
      const errors = {};
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      return errors;
    },
    // validationSchema: Yup.object({
    //   email: Yup.string().required("Please Enter Your Email"),
    //   firstname: Yup.string().required("Please Enter Your Firstname"),
    //   lastname: Yup.string().required("Please Enter Your Lastname"),
    //   password: Yup.string().required("Please Enter Your Password"),
    //   confirmPassword: Yup.string().required("Please Enter Your Confirm Password"),
    //   role: Yup.string().required('Please select a role'),
    // }),
    onSubmit: (values) => {
      console.log(id);
      const formData = {
        avatar: file,
        email: email,
        firstname: firstName,
        lastname: lastName,
        password: password,
        role: values.role
      }

      ApiService.createUser(formData).then(res => {
        if (res.status === 200) {
          setMessage(res.data.message);
          setToast(true);
          setTimeout(function () {
            navigate('/users/list');
          }, 3000);
        }
      }).catch(err => {
        setToast(!toast);
        setMessage(err.response?.data.message);
      });
      
    }
  });

  const toggleToast = () => {
    setToast(!toast);
  };

  // const getUser = () => {
  //   if (id !== "0") {
  //     ApiService.getUserById(id).then(res => {
  //       if (res.status === 200) {
  //         var data = res.data;
  //         setFile(data.avatar)
  //         setFormData({
  //           avatar: data.avatar,
  //           firstname: data.firstname,
  //           lastname: data.lastname,
  //           email: data.email,
  //           password: data.password,
  //           confirmPassword: data.password,
  //           department: data.department,
  //           role: data.role
  //         })
  //       }
  //     }).catch(e => {
  //       console.log(e);
  //     });
  //   }
  // }

  useEffect(() => {
    
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validation.setFieldValue(name,value);
    validation.validateField(name);
    if(name === 'firstname') setFirstName(value);
    if(name === 'lastname') setLastName(value);
    if(name === 'password') setPassword(value);
    if(name === 'confirmPassword') setConfirmPassword(value);
    if(name === 'email') setEmail(value);
    console.log(name,validation.values.firstname);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;    
    validation.setFieldValue(name, value);
    validation.validateField(name);
    validation.setFieldValue('firstname',value);
    validation.validateField('firstname');
    validation.setFieldValue('lastname',value);
    validation.validateField('lastname');
    validation.setFieldValue('password',value);
    validation.validateField('password');
    validation.setFieldValue('confirmPassword',value);
    validation.validateField('confirmPassword');
    validation.setFieldValue('email',value);
    validation.validateField('email');
    setFormData({
      ...formData,
      [name]: value,
    })
    // if(name === 'role') {
    //   validation.setFieldValue('email','victory@gmail.com');
    //   validation.validateField('email');
    // }
  }

  const changeAvatar = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    ApiService.uploadFile(formData).then((res) => {
      if (res.status === 200) {
        let result = res?.data?.file;
        let fileUrl = "/images/" + result.filename;
        setFile(fileUrl);
      }
    })
  }

  //meta title
  document.title = "User Add";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="User" breadcrumbItem={"Add"} />

        <Row>
          <Col>
            <Card>
              <CardBody>
                <form
                  className="form-horizontal"
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                >
                  <Row className="mb-3">
                    <Col>
                      <Row>
                        <label className="col-md-3 col-form-label text-capitalize">
                          avatar:
                        </label>
                        <div className="col-md-9">
                          <div className="mt-3">
                            <img
                              className="rounded-full bg-light mb-3 border"
                              width={"150px"} height={"150px"} style={{ objectFit: "cover" }}
                              alt="avatar"
                              src={Constant.serverUrl + file}
                            />
                            <Input className="form-control" type="file" id="formFile" onChange={(e) => changeAvatar(e.target.files[0])} />
                          </div>
                        </div>
                      </Row>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Row>
                        <label className="col-md-3 col-form-label text-capitalize">
                          firstname:
                        </label>
                        <div className="col-md-9">
                          <Input
                            id="firstname"
                            name="firstname"
                            className="form-control"
                            placeholder="Enter firstname"
                            type="text"
                            onChange={handleInputChange}
                            onBlur={validation.handleBlur}
                            value={firstName || ""}
                            invalid={
                              validation.touched.firstname && validation.errors.firstname ? true : false
                            }
                          />
                          {validation.touched.firstname && validation.errors.firstname ? (
                            <FormFeedback type="invalid">{validation.errors.firstname}</FormFeedback>
                          ) : null}
                        </div>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <label className="col-md-3 col-form-label text-capitalize">
                          lastname:
                        </label>
                        <div className="col-md-9">
                          <Input
                            id="lastname"
                            name="lastname"
                            className="form-control"
                            placeholder="Enter lastname"
                            type="text"
                            onChange={handleInputChange}
                            onBlur={validation.handleBlur}
                            value={lastName|| ""}
                            invalid={
                              validation.touched.lastname && validation.errors.lastname ? true : false
                            }
                          />
                          {validation.touched.lastname && validation.errors.lastname ? (
                            <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback>
                          ) : null}
                        </div>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Row>
                        <label className="col-md-3 col-form-label text-capitalize">
                          Password:
                        </label>
                        <div className="col-md-9">
                          <Input
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            onChange={handleInputChange}
                            onBlur={validation.handleBlur}
                            value={password || ""}
                            invalid={
                              validation.touched.password && validation.errors.password ? true : false
                            }
                          />
                          {validation.touched.password && validation.errors.password ? (
                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                          ) : null}
                        </div>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <label className="col-md-3 col-form-label text-capitalize">
                          Confirm Password:
                        </label>
                        <div className="col-md-9">
                          <Input
                            name="confirmPassword"
                            type="password"
                            placeholder="Enter Confirm Password"
                            onChange={handleInputChange}
                            onBlur={validation.handleBlur}
                            value={confirmPassword || ""}
                            invalid={
                              validation.touched.confirmPassword && validation.errors.confirmPassword ? true : false
                            }
                          />
                          {validation.touched.confirmPassword && validation.errors.confirmPassword ? (
                            <FormFeedback type="invalid">{validation.errors.confirmPassword}</FormFeedback>
                          ) : null}
                        </div>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Row>
                        <label className="col-md-3 col-form-label text-capitalize">
                          email:
                        </label>
                        <div className="col-md-9">
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={handleInputChange}
                            onBlur={validation.handleBlur}
                            value={email || ""}
                            invalid={
                              validation.touched.email && validation.errors.email ? true : false
                            }
                          />
                          {validation.touched.email && validation.errors.email ? (
                            <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                          ) : null}
                        </div>
                      </Row>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Row>
                        <label className="col-md-3 col-form-label text-capitalize">role</label>
                        <div className="col-md-9">
                          <select className="form-control" name="role"
                            value={formData.role} onChange={(e) => handleChange(e)}>
                            <option value=""></option>
                            <option value="1">Super User</option>
                            <option value="2">Operation</option>
                            <option value="3">Sales</option>
                          </select>
                        </div>
                      </Row>
                    </Col>
                    <Col></Col>
                  </Row>
                  <div className="mt-3 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                      <i className="bx bx-save px-1 align-middle"></i>
                      Save
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <div className="toast-container position-absolute top-0 end-0 p-2 p-lg-3">
          <Toast isOpen={toast}
            className="align-items-center text-white bg-primary border-0 fade show"
            role="alert" onClick={() => setToast(false)}>
            <ToastBody>
              {message}
            </ToastBody>
          </Toast>
        </div>
      </div>
    </div >
  );
}

export default UserAdd;