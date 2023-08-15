import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUserSuccessful, apiError, registerUser } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import avatar from "../../assets/images/avatar_default.png";
import { ApiService } from "services/api.service";

const Register = props => {

  //meta title
  document.title = "Register | Vidout";

  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmPassword: '',
      department: 'operation'
    },
    validate: (values) => {
      const errors = {};
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      return errors;
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      firstname: Yup.string().required("Please Enter Your Firstname"),
      lastname: Yup.string().required("Please Enter Your Lastname"),
      password: Yup.string().required("Please Enter Your Password"),
      confirmPassword: Yup.string().required("Please Enter Your Confirm Password"),
    }),
    onSubmit: (values) => {
      const formData = {
        avatar: "/images/avatar_default.png",
        email: values.email,
        firstname: values.firstname,
        lastname: values.lastname,
        password: values.password,
        department: values.department,
        role: 3
      }
      ApiService.signup(formData).then((res) => {
        if (res.status === 200) {
          setShowAlert(true);
          setMessage(res.data.message);
          dispatch(registerUser(res.data.user, res.data.token));
          setTimeout(function () {
            dispatch(registerUserSuccessful(res.data.user));
            navigate('/login');
          }, 3000);
        } else {
        }
      }).catch(err => {
        setErrorAlert(true);
        setMessage(err.response?.data.message);
      })
    }
  });

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }));

  useEffect(() => {
    dispatch(apiError(""));
  }, []);

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-3">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free Vidout account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end pb-3">
                      <img src={profileImg} alt="" className="img-fluid my-4" width={"90%"} />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2 mt-3">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {showAlert &&
                        <Alert color="success">
                          {message}
                        </Alert>
                      }

                      {errorAlert &&
                        <Alert color="danger">
                          {message}
                        </Alert>
                      }

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label text-capitalize">firstname</Label>
                        <Input
                          name="firstname"
                          type="text"
                          placeholder="Enter firstname"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstname || ""}
                          invalid={
                            validation.touched.firstname && validation.errors.firstname ? true : false
                          }
                        />
                        {validation.touched.firstname && validation.errors.firstname ? (
                          <FormFeedback type="invalid">{validation.errors.firstname}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label text-capitalize">lastname</Label>
                        <Input
                          name="lastname"
                          type="text"
                          placeholder="Enter lastname"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastname || ""}
                          invalid={
                            validation.touched.lastname && validation.errors.lastname ? true : false
                          }
                        />
                        {validation.touched.lastname && validation.errors.lastname ? (
                          <FormFeedback type="invalid">{validation.errors.lastname}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Confirm Password</Label>
                        <Input
                          name="confirmPassword"
                          type="password"
                          placeholder="Enter confirmPassword"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.confirmPassword || ""}
                          invalid={
                            validation.touched.confirmPassword && validation.errors.confirmPassword ? true : false
                          }
                        />
                        {validation.touched.confirmPassword && validation.errors.confirmPassword ? (
                          <FormFeedback type="invalid">{validation.errors.confirmPassword}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Department</Label>
                        <select className="form-control" name="department"
                          onChange={validation.handleChange} onBlur={validation.handleBlur}
                          value={validation.values.department || ""}>
                          <option value="operation">Operation</option>
                          <option value="sales">Sales</option>
                        </select>
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-3 text-center">
                <p className="mb-2">
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Vidout Ad Tech
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
