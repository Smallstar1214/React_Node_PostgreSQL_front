import React, { useEffect, useMemo, useRef, useState } from "react";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import logoImage from './vidout_logo.png';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import Breadcrumbs from '../../components/Common/Breadcrumb';
import { Table } from "reactstrap";
import { useNavigate, useParams} from "react-router-dom";
import { ApiService } from "services/api.service";

function CampaignDetail() {

  const {id} = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: 'Brand',
        accessor: 'brand',
      },
      {
        header: 'Campaign',
        accessor: 'campaign',
      },
      {
        header: 'Last Modified',
        accessor: 'lastModified'
      }
    ],[]
  );

  const detaildata = useMemo(() => [
      {
        header: 'PLANNED',
        accessor: 'planned'
      },
      {
        header: 'DELIVERED',
        accessor: 'delivered'
      },
      {
        header: 'REMAIN',
        accessor: 'remain'
      },
      {
        header: 'CLICK',
        accessor: 'clicked'
      },
      {
        header: 'CTR',
        accessor: 'ctr'
      },
      {
        header: '25%',
        accessor: 'sequare'
      },
      {
        header: '50%',
        accessor: 'fivezero'
      },
      {
        header: '75%',
        accessor: 'sevenfive'
      },
      {
        header: '100%',
        accessor: 'hundred'
      },
      {
        header: 'VIEWABILITY',
        accessor: 'viewability'
      },
    ],[]);

  const detaildata_cpm = useMemo(() => [
    {
      header: 'PLANNED',
      accessor: 'planned'
    },
    {
      header: 'DELIVERED',
      accessor: 'delivered'
    },
    {
      header: 'REMAIN',
      accessor: 'remain'
    },
    {
      header: 'CLICK',
      accessor: 'clicked'
    },
    {
      header: 'CTR',
      accessor: 'ctr'
    },
    {
      header: 'VIEWABILITY',
      accessor: 'viewability'
    },
  ],[]);

  const detaildata_cpc = useMemo(() => [
    {
      header: 'PLANNED',
      accessor: 'planned'
    },
    {
      header: 'DELIVERED',
      accessor: 'delivered'
    },
    {
      header: 'REMAIN',
      accessor: 'remain'
    },
    {
      header: 'CLICK',
      accessor: 'clicked'
    },
    {
      header: 'CTR',
      accessor: 'ctr'
    },
    {
      header: 'VIEWABILITY',
      accessor: 'viewability'
    },
  ],[]);

  const detaildata_cpi = useMemo(() => [
    {
      header: 'PLANNED',
      accessor: 'planned'
    },
    {
      header: 'DELIVERED',
      accessor: 'delivered'
    },
    {
      header: 'REMAIN',
      accessor: 'remain'
    },
    {
      header: 'CLICK',
      accessor: 'clicked'
    },
    {
      header: 'CTR',
      accessor: 'ctr'
    },
    {
      header: 'VIEWABILITY',
      accessor: 'viewability'
    },
  ],[]);

  useEffect(() => {
    getExportDataById();
  }, []);

  const getExportDataById= () => {
    ApiService.getCampaignById(id).then(res => {
      if (res.status === 200) {
        setList(res.data);
         console.log("--------------------------",res.data);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  function exportToCSV() {
    let csvData = "";

    if(list[0].type === "CPM") {
    csvData = Papa.unparse({
      fields: ['PLANNED', 'DELIVERED', 'REMAIN', 'CLICK', 'CTR', 'VIEWABILITY'],
      data: [
              parseInt(list[0].planned).toLocaleString('en-US') + " view",
              parseInt(list[0].delivered).toLocaleString('en-US') + " view", 
              parseInt(list[0].remain).toLocaleString('en-US') + "view",
              parseInt(list[0].clicked).toLocaleString('en-US') + " click",
              parseFloat(list[0].ctr).toFixed(2).toString() + '%',
              parseFloat(list[0].viewability).toFixed(2).toString() + '%',
            ]
    });
  } else if(list[0].type === "CPI") {
    csvData = Papa.unparse({
      fields: ['PLANNED', 'DELIVERED', 'REMAIN', 'CLICK', 'CTR', 'VIEWABILITY'],
      data: [
              parseInt(list[0].planned).toLocaleString('en-US') + " view",
              parseInt(list[0].delivered).toLocaleString('en-US') + " view", 
              parseInt(list[0].remain).toLocaleString('en-US') + "view",
              parseInt(list[0].clicked).toLocaleString('en-US') + " click",
              parseFloat(list[0].ctr).toFixed(2).toString() + '%',
              parseFloat(list[0].viewability).toFixed(2).toString() + '%',
            ]
    });
  } else if(list[0].type === "CPC") {
    csvData = Papa.unparse({
      fields: ['PLANNED', 'DELIVERED', 'REMAIN', 'CLICK', 'CTR', 'VIEWABILITY'],
      data: [
              parseInt(list[0].planned).toLocaleString('en-US') + " view",
              parseInt(list[0].delivered).toLocaleString('en-US') + " view", 
              parseInt(list[0].remain).toLocaleString('en-US') + "view",
              parseInt(list[0].clicked).toLocaleString('en-US') + " click",
              parseFloat(list[0].ctr).toFixed(2).toString() + '%',
              parseFloat(list[0].viewability).toFixed(2).toString() + '%',
            ]
    });
  } else if(list[0].type === "CPV") {
    csvData = Papa.unparse({
      fields: ['PLANNED', 'DELIVERED', 'REMAIN', 'CLICK', 'CTR', '25%', '50%', '75%', '100%', 'VIEWABILITY'],
      data: [
              parseInt(list[0].planned).toLocaleString('en-US') + " view",
              parseInt(list[0].delivered).toLocaleString('en-US') + " view", 
              parseInt(list[0].remain).toLocaleString('en-US') + "view",
              parseInt(list[0].clicked).toLocaleString('en-US') + " click",
              parseFloat(list[0].ctr).toFixed(2).toString() + '%',
              parseFloat(list[0].sequare).toFixed(2).toString() + '%',
              parseFloat(list[0].fivezero).toFixed(2).toString() + '%',
              parseFloat(list[0].sevenfive).toFixed(2).toString() + '%',
              parseFloat(list[0].hundred).toFixed(2).toString() + '%',
              parseFloat(list[0].viewability).toFixed(2).toString() + '%',
            ]
    });
  }
    const date = new Date().toISOString().slice(0, 10); 
    const filename = list[0].brand + "_" + list[0].campaign + "_" + date + ".csv";
    const blobData = new Blob([`"BRAND", ${list[0].brand}, \n"CAMPAIGN", ${list[0].campaign}, \n"REPORT DATE", ${new Date(list[0].lastmodified).toISOString().slice(0, 10)}, \n\n${csvData}`], { type: 'text/csv;charset=utf-8;' });
    saveAs(blobData, filename);
  }

  const back = () => {
    navigate('/campaign/detail/' + id,{state: {data:id}});
  }

  function handleExportPDF() {

    const labeldata1 = "Brand: " + list[0].brand + "\nCampaign: " + list[0].campaign 
                       + "\nLast Modified: " + new Date(list[0].lastmodified).toISOString().slice(0, 10) + "\n";
    let table2 = "";
    if(list[0].type === "CPV")  table2 = document.getElementById("export_data_cpv");
    else if(list[0].type === "CPI") table2 = document.getElementById("export_data_cpi");
    else if(list[0].type === "CPM") table2 = document.getElementById("export_data_cpm");
    else if(list[0].type === "CPC") table2 = document.getElementById("export_data_cpc");
    

    const data2 = [];

    const headers2 = [];
    const headerCells2 = table2.querySelectorAll("thead th");
    headerCells2.forEach((cell) => headers2.push(cell.textContent.trim()));

    const rows2 = [];
    const rowCells2 = table2.querySelectorAll("tbody tr");

    rowCells2.forEach((row) => {
      const rowData = [];
      const cells = row.querySelectorAll("td");
      cells.forEach((cell) => rowData.push(cell.textContent.trim()));
      rows2.push(rowData);
    });

    data2.push(headers2);
    data2.push(...rows2);

    const docDefinition = {
      content: [
        {
          image:  'data:image/png;base64,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', width: 130, height: 40,
        },
        {
          text: labeldata1,
          style: "label",
        },
        {
          table: {
            headerRows: 1,
            body: data2,
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#00B0F0' : null;
            },
          },
          style: 'tableStyle',
        },
      ],
      styles : {
        label: {
          fontsize: 18,
          bold: true,
          margin: [0,0,0,10],
        },
        tableStyle: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    const date = new Date().toISOString().slice(0, 10); 
    const filename = list[0].brand + "_" + list[0].campaign + "_" + date + ".pdf";

    pdfDoc.download(filename);
  };  

  // function handleExportPDF() {
  //   const logoImage = logoRef.current;
  //   const table = tableRef.current;

  //   html2canvas(table).then((canvas) => {
  //     const imgData = logoImage.src;
  //     const pdf = new jsPDF();
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     pdf.addImage(imgData, 'PNG', 10, 10, 20, 20);
  //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 70, pdfWidth - 20, pdfHeight - 20);
  //     const date = new Date().toISOString().slice(0, 10); 
  //     const filename = list[0].brand + "_" + list[0].campaign + "_" + date + ".pdf";
  //     pdf.save(filename);
  //   });
  // }

  document.title = "Export Page";
  // console.log(list[0]);

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Campaign" breadcrumbItem="Export Page" />
        <div className="table-responsive">
          <Table className="table mb-0 mw-100" id="export_data1">
            <thead className="table-light table-nowrap">
              <tr>
                {columns.map((column, index) => {
                  return (
                    <th key={index} className="text-uppercase text-center">
                      {column.header}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => {
                return (
                  <>
                    <tr className="align-middle text-center">
                      <td><b>{item.brand}</b></td>
                      <td><b>{item.campaign}</b></td>
                      <td><div>{new Date(item.lastmodified).toISOString().slice(0, 10)}</div></td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </Table>
          {/* <img src={logoImage} alt="Logo" style={{ display: 'none' }} /> */}
          {
            (list[0]?.type === "CPV") && (
            <Table className="table mb-0 mw-100" id="export_data_cpv">
              <thead className="table-light table-nowrap">
                <tr >
                  {detaildata.map((column, index) => {
                    return (
                      <th key={index} className="text-uppercase text-center" style={{backgroundColor:'#00B0F0', maxWidth:'10px'}}>
                        {column.header}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => {
                  return (
                    <>
                      <tr className="align-middle text-center">
                        <td>{parseInt(item.planned).toLocaleString('en-US') + " view"}</td>
                        <td>{parseInt(item.delivered).toLocaleString('en-US') + " view"}</td>
                        <td>{parseInt(item.remain).toLocaleString('en-US') + " view"}</td>
                        <td>{parseInt(item.clicked).toLocaleString('en-US') + " click"}</td>
                        <td>{parseFloat(item.ctr).toFixed(2).toString() + '%'}</td>
                        <td>{parseFloat(item.sequare).toFixed(2).toString() + '%'}</td>
                        <td>{parseFloat(item.fivezero).toFixed(2).toString() + '%'}</td>
                        <td>{parseFloat(item.sevenfive).toFixed(2).toString() + '%'}</  td>
                        <td>{parseFloat(item.hundred).toFixed(2).toString() + '%'}</td>
                        <td>{parseFloat(item.viewability).toFixed(2).toString() + '%'}</td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </Table>)
          }

          {
            (list[0]?.type === "CPI") && (
            <Table className="table mb-0 mw-100" id="export_data_cpi">
              <thead className="table-light table-nowrap">
                <tr >
                  {detaildata_cpi.map((column, index) => {
                    return (
                      <th key={index} className="text-uppercase text-center" style={{backgroundColor:'#00B0F0', maxWidth:'10px'}}>
                        {column.header}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => {
                  return (
                    <>
                      <tr className="align-middle text-center">
                        <td>{parseInt(item.planned).toLocaleString('en-US') + " view"}</td>
                        <td>{parseInt(item.delivered).toLocaleString('en-US') + " view"}</td>
                        <td>{parseInt(item.remain).toLocaleString('en-US') + " view"}</td>
                        <td>{parseInt(item.clicked).toLocaleString('en-US') + " click"}</td>
                        <td>{parseFloat(item.ctr).toFixed(2).toString() + '%'}</td>
                        <td>{parseFloat(item.viewability).toFixed(2).toString() + '%'}</td>
                      </tr>
                    </>
                  )
                })}
              </tbody>
            </Table>)
          }
          {
            (list[0]?.type === "CPC") && (
              <Table className="table mb-0 mw-100" id="export_data_cpc">
                <thead className="table-light table-nowrap">
                  <tr >
                    {detaildata_cpc.map((column, index) => {
                      return (
                        <th key={index} className="text-uppercase text-center" style={{backgroundColor:'#00B0F0', maxWidth:'10px'}}>
                          {column.header}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, index) => {
                    return (
                      <>
                        <tr className="align-middle text-center">
                          <td>{parseInt(item.planned).toLocaleString('en-US') + " view"}</td>
                          <td>{parseInt(item.delivered).toLocaleString('en-US') + " view"}</td>
                          <td>{parseInt(item.remain).toLocaleString('en-US') + " view"}</td>
                          <td>{parseInt(item.clicked).toLocaleString('en-US') + " click"}</td>
                          <td>{parseFloat(item.ctr).toFixed(2).toString() + '%'}</td>
                          <td>{parseFloat(item.viewability).toFixed(2).toString() + '%'}</td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </Table>
            )
          }
          {
            (list[0]?.type === "CPM") && (
              <Table className="table mb-0 mw-100" id="export_data_cpm">
                <thead className="table-light table-nowrap">
                  <tr >
                    {detaildata_cpm.map((column, index) => {
                      return (
                        <th key={index} className="text-uppercase text-center" style={{backgroundColor:'#00B0F0', maxWidth:'10px'}}>
                          {column.header}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, index) => {
                    return (
                      <>
                        <tr className="align-middle text-center">
                          <td>{parseInt(item.planned).toLocaleString('en-US') + " view"}</td>
                          <td>{parseInt(item.delivered).toLocaleString('en-US') + " view"}</td>
                          <td>{parseInt(item.remain).toLocaleString('en-US') + " view"}</td>
                          <td>{parseInt(item.clicked).toLocaleString('en-US') + " click"}</td>
                          <td>{parseFloat(item.ctr).toFixed(2).toString() + '%'}</td>
                          <td>{parseFloat(item.viewability).toFixed(2).toString() + '%'}</td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </Table>
            )
          }
          {/* <Table className="table mb-0 mw-100" id="export_data2">
            <thead className="table-light table-nowrap">
              <tr >
                {detaildata.map((column, index) => {
                  return (
                    <th key={index} className="text-uppercase text-center" style={{backgroundColor:'#00B0F0', maxWidth:'10px'}}>
                      {column.header}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => {
                return (
                  <>
                    <tr className="align-middle text-center">
                      <td>{parseInt(item.planned).toLocaleString('en-US') + " view"}</td>
                      <td>{parseInt(item.delivered).toLocaleString('en-US') + " view"}</td>
                      <td>{parseInt(item.remain).toLocaleString('en-US') + " view"}</td>
                      <td>{parseInt(item.clicked).toLocaleString('en-US') + " click"}</td>
                      <td>{parseFloat(item.ctr).toFixed(2).toString() + '%'}</td>
                      <td>{parseFloat(item.sequare).toFixed(2).toString() + '%'}</td>
                      <td>{parseFloat(item.fivezero).toFixed(2).toString() + '%'}</td>
                      <td>{parseFloat(item.sevenfive).toFixed(2).toString() + '%'}</  td>
                      <td>{parseFloat(item.hundred).toFixed(2).toString() + '%'}</td>
                      <td>{parseFloat(item.viewability).toFixed(2).toString() + '%'}</td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </Table> */}
        </div>
        <div className="mt-3 d-flex justify-content-end">
          <button type="button" className="btn btn-primary" onClick={handleExportPDF} style={{marginRight:'30px'}}>
            <i className="fas fa-file-export px-1 align-middle"></i>
            Export PDF
          </button>
          <button type="button" className="btn btn-primary" onClick={() => exportToCSV()} style={{marginRight:'30px'}}>
            <i className="fas fa-file-export px-1 align-middle"></i>
            Export CSV
          </button>
          <button type="button" className="btn btn-primary" onClick={back}>
            <i className="bx bx-save px-1 align-middle"></i>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetail;