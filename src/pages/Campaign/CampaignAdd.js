// src/components/filter.
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Button, Card, CardBody, CardTitle, Col, Input, InputGroup, Progress, Row, Table, Toast, ToastBody, ToastHeader } from "reactstrap";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import { useParams } from "react-router-dom";
import { ApiService } from "services/api.service";
import { useEffect } from "react";

function CampaignAdd() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: "",
    campaign: "",
    source: "",
    completion: 0,
    type: "",
    planned: 0,
    delivered: 0,
    required: 0,
    difference: 0,
    remain: 0,
    start: "",
    finish: "",
    status: "",
    responsible: "",
    lastModified: "",
    notes: ""
  });
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);

  const toggleToast = () => {
    setToast(!toast);
  };

  const saveRecord = () => {
    var planned = parseInt(formData.planned);
    var delivered = parseInt(formData.delivered);
    var start = new Date(formData.start);
    var finish = new Date(formData.finish);
    var diffTimeFS = finish.getTime() - start.getTime();
    var diffDayFS = diffTimeFS / (1000 * 3600 * 24);
    var diffTimeTS = new Date().getTime() - start.getTime();
    var diffDayTS = diffTimeTS / (1000 * 3600 * 24);

    var required = Math.ceil((planned / diffDayFS) * diffDayTS);
    var completion = ((delivered / planned) * 100).toFixed(0);
    var difference = delivered - required;
    var remain = planned - delivered;
    var tempData = {
      brand: formData.brand,
      campaign: formData.campaign,
      source: formData.source,
      completion: completion >= 100 ? 100 : completion < 0 ? 0 : completion,
      type: formData.type,
      planned: planned,
      delivered: delivered,
      required: required,
      difference: difference,
      remain: remain,
      start: formData.start,
      finish: formData.finish,
      status: formData.status,
      responsible: formData.responsible,
      lastmodified: new Date().toISOString(),
      notes: formData.notes
    }

    if (id === "0") {
      ApiService.createCampaign(tempData).then(res => {
        if (res.status === 200) {
          setMessage(res.data.message);
          setToast(true);
          navigate('/campaigns/list');
        }
      }).catch(err => {
        console.log(err);
      });
    } else {
      ApiService.updateCampaign(id, tempData).then(res => {
        if (res.status === 200) {
          setMessage(res.data.message);
          setToast(true);
          setTimeout(function () {
            navigate('/campaign/detail/' + id, {state:{data:id}} );
          }, 1000);
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  const getCampaign = () => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (id !== "0") {
      ApiService.getCampaignById(id).then(res => {
        if (res.status === 200) {
          setFormData({
            ...res.data[0],
            start: new Date(res.data[0].start).toISOString().substring(0, 10),
            finish: new Date(res.data[0].finish).toISOString().substring(0, 10),
          })
        }
      }).catch(e => {
        console.log(e);
      });
    } else {
      setFormData({
        ...formData,
        responsible: authUser.firstname + " " + authUser.lastname,
      })
    }
  }

  useEffect(() => {
    getCampaign();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  //meta title
  document.title = id === 0 ? "Campaign Add" : "Campaign Edit";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Campaign" breadcrumbItem={id === 0 ? "Add" : "Edit"} />

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row className="mb-3">
                  <label className="col-md-2 col-form-label text-uppercase">
                    Brand
                  </label>
                  <div className="col-md-10">
                    <input className="form-control" type="text" name="brand"
                      value={formData.brand} onChange={(e) => handleChange(e)} />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label className="col-md-2 col-form-label text-uppercase">
                    Campaign
                  </label>
                  <div className="col-md-10">
                    <input className="form-control" type="text"
                      name="campaign" value={formData.campaign} onChange={(e) => handleChange(e)} />
                  </div>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Row>
                      <label className="col-md-4 col-form-label text-uppercase">
                        Source
                      </label>
                      <div className="col-md-8">
                        <input className="form-control" type="text"
                          name="source" value={formData.source} onChange={(e) => handleChange(e)} />
                      </div>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <div className="col-md-3 text-right">
                        <label className="col-form-label text-uppercase text-right">
                          Type
                        </label>
                      </div>
                      <div className="col-md-9">
                        <select className="form-select" aria-label="Type select"
                          name="type" value={formData.type} onChange={(e) => handleChange(e)}>
                          <option value=""></option>
                          <option value="CPV">CPV</option>
                          <option value="CPM">CPM</option>
                          <option value="CPC">CPC</option>
                          <option value="CPI">CPI</option>
                        </select>
                      </div>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <label className="col-md-2 col-form-label">
                    Planned
                  </label>
                  <div className="col-md-10">
                    <input className="form-control" type="number"
                      name="planned" value={formData.planned} onChange={(e) => handleChange(e)} />
                  </div>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <Row>
                      <label className="col-md-4 col-form-label">
                        Start
                      </label>
                      <div className="col-md-8">
                        <input className="form-control" type="date" name="start"
                          value={formData.start}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <label className="col-md-3 col-form-label">
                        Finish
                      </label>
                      <div className="col-md-9">
                        <input className="form-control" type="date" name="finish"
                          value={formData.finish}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </Row>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <label className="col-md-2 col-form-label">Status</label>
                  <div className="col-md-10">
                    <select className="form-control" name="status"
                      value={formData.status} onChange={(e) => handleChange(e)}>
                      <option value=""></option>
                      <option value="completed">Completed</option>
                      <option value="hold">Hold</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                </Row>
                <Row className="mb-3">
                  <label className="col-md-2 col-form-label">
                    Responsible
                  </label>
                  <div className="col-md-10">
                    <input className="form-control" type="text" disabled
                      name="responsible" value={formData.responsible} onChange={(e) => handleChange(e)} />
                  </div>
                </Row>
                <div className="mt-3 d-flex justify-content-end">
                  <button type="button" className="btn btn-primary"
                    onClick={saveRecord}>
                    <i className="bx bx-save px-1 align-middle"></i>
                    Save
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "1005" }}>
          <Toast isOpen={toast}
            className="align-items-center text-white bg-primary border-0"
            role="alert" onClick={() => setToast(false)}>
            <ToastBody>
              {message}
            </ToastBody>
          </Toast>
        </div>
      </div>
    </div>
  );
}

export default CampaignAdd;