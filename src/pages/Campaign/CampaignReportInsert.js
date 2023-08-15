import React, {useState } from "react";
import { useNavigate } from 'react-router-dom';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Card, CardBody, Col, Input, Row, Toast, ToastBody} from "reactstrap";

import "flatpickr/dist/themes/material_blue.css";
import { useParams } from "react-router-dom";
import { ApiService } from "services/api.service";
import { useEffect } from "react";

const CampaignReportInsert = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    
    delivered: 0,
    clicked:0,
    viewability:0,
    sequare:0,
    fivezero:0,
    sevenfive:0,
    hundred:0,
    notes: ""
  });
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);

  const toggleToast = () => {
    setToast(!toast);
  };

  

  const saveRecord = () => {
    
    var delivered = parseInt(formData.delivered);
    var clicked = parseInt(formData.clicked);
    var ctr = (clicked / delivered).toFixed(2);
    var tempData = {
      delivered: delivered,
      clicked:formData.clicked,
      viewability:formData.viewability,
      sequare:formData.sequare,
      fivezero:formData.fivezero,
      sevenfive:formData.sevenfive,
      hundred:formData.hundred,
      ctr: ctr,
      notes: formData.notes
    }

    ApiService.addReport(id, tempData).then(res => {
      if (res.status === 200) {
        setMessage(res.data.message);
        setToast(true);
        setTimeout(function () {
          navigate('/campaign/detail/' + id,{state: {data:id}});
        }, 1000);
        
      }
    }).catch(err => {
      console.log(err);
    });
  }

  const getReport = () => {
    ApiService.getReportById(id).then(res => {
      if (res.status === 200) {
        setFormData({
          ...res.data[0],
        })
      }
    }).catch(e => {
      console.log(e);
    });
  }

  useEffect(() => {
    getReport();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  //meta title
  document.title = "Report Insert";
  return(
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Campaign" breadcrumbItem={"Report Insert"} />

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row className="mb-3">
                  <label className="col-md-2 col-form-label">
                    DELIVERED
                  </label>
                  <div className="col-md-1">
                    <input className="form-control" type="number"
                      name="delivered" value={formData.delivered} onChange={(e) => handleChange(e)} />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label className="col-md-2 col-form-label text-uppercase">
                    Click
                  </label>
                  <div className="col-md-1">
                    <input className="form-control" type="number"
                      name="clicked" value={formData.clicked} onChange={(e) => handleChange(e)} />
                  </div>
                </Row>
                <Row className="mb-3">
                  <label className="col-md-2 col-form-label text-uppercase">
                    VIEWABILITY
                  </label>
                  <div className="col-md-1">
                    <input className="form-control" type="number"
                      name="viewability" value={formData.viewability} onChange={(e) => handleChange(e)} />
                  </div>
                  <label className="col-md-1 col-form-label text-uppercase">%</label>
                </Row>

                <Row className="mb-3">
                  <label className="col-md-2 col-form-label text-uppercase">
                    %25
                  </label>
                  <div className="col-md-1">
                    <input className="form-control" type="number"
                      name="sequare" value={formData.sequare} onChange={(e) => handleChange(e)} />
                  </div>
                  <label className="col-md-1 col-form-label text-uppercase">%</label>
                </Row>

                <Row className="mb-3">
                  <label className="col-md-2 col-form-label text-uppercase">
                    %50
                  </label>
                  <div className="col-md-1">
                    <input className="form-control" type="number"
                      name="fivezero" value={formData.fivezero} onChange={(e) => handleChange(e)} />
                  </div>
                  <label className="col-md-1 col-form-label text-uppercase">%</label>
                </Row>

                <Row className="mb-3">
                  <label className="col-md-2 col-form-label text-uppercase">
                    %75
                  </label>
                  <div className="col-md-1">
                    <input className="form-control" type="number"
                      name="sevenfive" value={formData.sevenfive} onChange={(e) => handleChange(e)} />
                  </div>
                  <label className="col-md-1 col-form-label text-uppercase">%</label>
                </Row>

                <Row className="mb-3">
                  <label className="col-md-2 col-form-label text-uppercase">
                    %100
                  </label>
                  <div className="col-md-1">
                    <input className="form-control" type="number"
                      name="hundred" value={formData.hundred} onChange={(e) => handleChange(e)} />
                  </div>
                  <label className="col-md-1 col-form-label text-uppercase">%</label>
                </Row>

                <Row className="mb-3">
                  <label className="col-md-2 col-form-label">
                    Notes
                  </label>
                  <div className="col-md-2">
                    <Input type="textarea" onChange={(e) => handleChange(e)}
                      maxLength="1000" rows="3" name="notes"
                      value={formData.notes}
                      placeholder="This textarea has a limit of 1000 chars."
                    />
                  </div>
                </Row>

                <div className="mt-3 d-flex justify-content-start">
                  <button type="button" className="btn btn-primary"
                    onClick={saveRecord}>
                    <i className="bx bx-save px-1 align-middle"></i>
                    Report
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
  )
}

export default CampaignReportInsert;