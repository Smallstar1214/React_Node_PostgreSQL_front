// src/components/filter.
import React, { Fragment, useMemo, useState } from "react";

//import components
import Breadcrumbs from '../components/Common/Breadcrumb';
import { Button, Input, InputGroup, Progress, Table } from "reactstrap";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

const data = [
  {
    id: 1,
    lock: "",
    brand: "BRAND NAME",
    compaign: "CAMPAIGN NAME",
    source: "Vast 48sn",
    completion: 85,
    type: "video",
    planned: 277778,
    delivered: 305974,
    required: 277778,
    differance: 28196,
    remain: -28196,
    start: "2022-12-22",
    finish: "2023-02-02",
    status: "Tamamlandı",
    responsible: "",
    lastModified: "",
    notes: ""
  },
  {
    id: 2,
    lock: "",
    brand: "BRAND NAME",
    compaign: "CAMPAIGN NAME",
    source: "Vast 48sn",
    completion: 85,
    type: "video",
    planned: 277778,
    delivered: 305974,
    required: 277778,
    differance: 28196,
    remain: -28196,
    start: "2022-12-22",
    finish: "2023-02-02",
    status: "Tamamlandı",
    responsible: "",
    lastModified: "",
    notes: ""
  },
  {
    id: 3,
    lock: "",
    brand: "BRAND NAME",
    compaign: "CAMPAIGN NAME",
    source: "Vast 48sn",
    completion: 85,
    type: "video",
    planned: 277778,
    delivered: 305974,
    required: 277778,
    differance: 28196,
    remain: -28196,
    start: "2022-12-22",
    finish: "2023-02-02",
    status: "Tamamlandı",
    responsible: "",
    lastModified: "",
    notes: ""
  },
  {
    id: 4,
    lock: "",
    brand: "BRAND NAME",
    compaign: "CAMPAIGN NAME",
    source: "Vast 48sn",
    completion: 85,
    type: "video",
    planned: 277778,
    delivered: 305974,
    required: 277778,
    differance: 28196,
    remain: -28196,
    start: "2022-12-22",
    finish: "2023-02-02",
    status: "Tamamlandı",
    responsible: "",
    lastModified: "",
    notes: ""
  },
  {
    id: 5,
    lock: "",
    brand: "BRAND NAME",
    compaign: "CAMPAIGN NAME",
    source: "Vast 48sn",
    completion: 85,
    type: "video",
    planned: 277778,
    delivered: 305974,
    required: 277778,
    differance: 28196,
    remain: -28196,
    start: "2022-12-22",
    finish: "2023-02-02",
    status: "Tamamlandı",
    responsible: "",
    lastModified: "",
    notes: ""
  },
];

function CalculatePage() {
  const [selectRow, setSelectRow] = useState([]);
  const [showAddFlag, setShowAddFlag] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    compaign: "",
    source: "",
    completion: 0,
    type: "",
    planned: 0,
    delivered: 0,
    required: 0,
    differance: 0,
    remain: "",
    start: "",
    finish: "",
    status: "",
    responsible: "",
    lastModified: "",
    notes: ""
  });

  const [list, setList] = useState(data);
  const columns = useMemo(
    () => [
      {
        header: '',
        accessor: 'lock',
      },
      {
        header: 'Brand',
        accessor: 'brand',
      },
      {
        header: 'Campaign',
        accessor: 'campaign'
      },
      {
        header: 'Source',
        accessor: 'source'
      },
      {
        header: 'Completion',
        accessor: 'completion'
      },
      {
        header: 'Type',
        accessor: 'type'
      },
      {
        header: 'Planned',
        accessor: 'planned'
      },
      {
        header: 'Delivered',
        accessor: 'delivered'
      },
      {
        header: 'Required',
        accessor: 'required'
      },
      {
        header: 'Differance',
        accessor: 'differance'
      },
      {
        header: 'Remain',
        accessor: 'remain'
      },
      {
        header: 'Start',
        accessor: 'start'
      },
      {
        header: 'Finish',
        accessor: 'finish'
      },
      {
        header: 'Status',
        accessor: 'status'
      },
      {
        header: 'Responsible',
        accessor: 'responsible'
      },
      {
        header: 'Last Modified',
        accessor: 'lastModified'
      },
      {
        header: 'Notes',
        accessor: 'notes'
      },
      {
        header: "Action",
        accessor: "action"
      }
    ],
    []
  );

  const handleLock = (id) => {
    var list = selectRow;
    if (selectRow.includes(id)) {
      var index = list.indexOf(id);
      list.splice(index, 1);
    } else {
      list.push(id);
    }
    setSelectRow(list);
  }

  const saveRecord = (id) => {
    var delivered = parseInt(formData.delivered);
    var planned = parseInt(formData.planned);
    var required = parseInt(formData.required);
    var completion = ((delivered / planned) * 100).toFixed(0);
    var differance = delivered - required;
    var remain = planned - delivered;
    var tempData = {
      lock: "",
      brand: formData.brand,
      compaign: formData.compaign,
      source: formData.source,
      completion: completion,
      type: formData.type,
      planned: planned,
      delivered: delivered,
      required: required,
      differance: differance,
      remain: remain,
      start: formData.start,
      finish: formData.finish,
      status: formData.status,
      responsible: formData.responsible,
      lastModified: formData.lastModified,
      notes: formData.notes
    }
    setShowAddFlag(false);
    const tempList = list;
    tempList.push(tempData);
    setList(tempList);
    setFormData({
      lock: "",
      brand: "",
      compaign: "",
      source: "",
      completion: 0,
      type: "",
      planned: 0,
      delivered: 0,
      required: 0,
      differance: 0,
      remain: 0,
      start: "",
      finish: "",
      status: "",
      responsible: "",
      lastModified: "",
      notes: ""
    });
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  //meta title
  document.title = "Data Tables | Skote - React Admin & Dashboard Template";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Dashboard" breadcrumbItem="Calculate Page" />
        <div className="text-sm-end">
          <Button
            type="button"
            color="success"
            className="btn-rounded mb-2 me-2"
            onClick={() => { setShowAddFlag(true); }}
          >
            <i className="mdi mdi-plus me-1" />
            Add
          </Button>
        </div>
        <div className="table-responsive">
          <Table className="table mb-0 w-auto mw-100">
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
            <tbody className="text-center">
              {showAddFlag &&
                <tr>
                  <td></td>
                  <td>
                    <Input type="text"
                      name="brand" value={formData.brand} onChange={(e) => handleChange(e)} />
                  </td>
                  <td>
                    <Input type="text"
                      name="compaign" value={formData.compaign} onChange={(e) => handleChange(e)} />
                  </td>
                  <td>
                    <Input type="text"
                      name="source" value={formData.source} onChange={(e) => handleChange(e)} />
                  </td>
                  <td>
                  </td>
                  <td>
                    <select className="form-select" aria-label="Type select"
                      name="type" value={formData.type} onChange={(e) => handleChange(e)}>
                      <option value="">Select...</option>
                      <option value="video">Video</option>
                      <option value="clickpush">ClickPush</option>
                    </select>
                  </td>
                  <td>
                    <Input type="number"
                      name="planned" value={formData.planned} onChange={(e) => handleChange(e)} />
                  </td>
                  <td>
                    <Input type="number"
                      name="delivered" value={formData.delivered} onChange={(e) => handleChange(e)} />
                  </td>
                  <td>
                    <Input type="number"
                      name="required" value={formData.required} onChange={(e) => handleChange(e)} />
                  </td>
                  <td>
                  </td>
                  <td>
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="start"
                      type="datetime-local"
                      id="example-datetime-local-input"
                      value={formData.start}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="finish"
                      type="datetime-local"
                      id="example-datetime-local-input"
                      value={formData.finish}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                  <td>
                    <select className="form-select" aria-label="Status select"
                      name="status" value={formData.status} onChange={(e) => handleChange(e)}>
                      <option value="">Select...</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <Input type="text"
                      name="responsible" value={formData.responsible} onChange={(e) => handleChange(e)} />
                  </td>
                  <td>
                    <Input type="text"
                      name="lastModified" value={formData.lastModified} onChange={(e) => handleChange(e)} />
                  </td>
                  <td>
                    <Input type="text"
                      name="notes" value={formData.notes} onChange={(e) => handleChange(e)} />
                  </td>
                  <td>
                    <Button
                      type="button"
                      color="primary"
                      className="btn-rounded mb-2 me-2"
                      onClick={() => saveRecord("")}
                    >
                      Save
                    </Button>
                  </td>
                </tr>
              }
              {list.map((item, index) => {
                return (
                  <tr key={index} className="align-middle">
                    <td onClick={() => handleLock(item.id)}>
                      {selectRow.includes(item.id) ?
                        <i className="bx bxs-lock-open h2"></i> :
                        <i className="bx bxs-lock h2"></i>
                      }
                    </td>
                    <td>{item.brand}</td>
                    <td>{item.compaign}</td>
                    <td>{item.source}</td>
                    <td>
                      <div>
                        <Progress color="success" value={item.completion}
                          className="progress-xl"
                          animated>
                          <span className="font-size-13">{item.completion}%</span>
                        </Progress>
                      </div>
                    </td>
                    <td>{item.type}</td>
                    <td>{item.planned}</td>
                    <td>{item.delivered}</td>
                    <td>{item.required}</td>
                    <td>{item.differance}</td>
                    <td>{item.remain}</td>
                    <td>{item.start.replace("T", " ")}</td>
                    <td>{item.finish.replace("T", " ")}</td>
                    <td>{item.status}</td>
                    <td>{item.responsible}</td>
                    <td>{item.lastModified}</td>
                    <td>{item.notes}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default CalculatePage;