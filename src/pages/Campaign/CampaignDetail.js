// src/components/filter.
import React, {useEffect, useMemo, useState } from "react";

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {Progress, Table } from "reactstrap";
import { Link, useLocation} from "react-router-dom";
import { ApiService } from "services/api.service";
import { Constant } from "common/contant";

const CollapsibleRow = ({ item, detaildata}) => {

  return (
    <>
      <tr className="align-middle text-center">
        <td>
          <b>{item.campaign}</b>
          <p>{item.brand}</p>
        </td>
        <td>
          <div>
            {item.difference > 0 ?
              <Progress color="success" value={item.completion}
                className="progress-xl"
                animated>
                <span className="font-size-13" style={{ color: "#333" }}>{item.completion}%</span>
              </Progress> :
              <Progress color="danger" value={item.completion}
                className="progress-xl"
                animated>
                <span className="font-size-13" style={{ color: "#333" }}>{item.completion}%</span>
              </Progress>
            }
          </div>
        </td>
        <td>{item.planned?.toLocaleString()}</td>
        <td>{item.delivered?.toLocaleString()}</td>
        <td>{item.status}</td>
        <td>
          <label title={item.notes}>
            <i className="bx bxs-note h4"></i>
          </label>
        </td>
        <td className="text-center">
          <div>{new Date(item.start).toLocaleDateString('en-GB')}</div>
          <div>{new Date(item.finish).toLocaleDateString('en-GB')}</div>
        </td>
      </tr>
      <tr className="bg-light">
        {
          detaildata.map((column, index) => {
            return (
              <th key={index} className="text-uppercase text-center text-dark">
                {column.header}
              </th>
            )
          })
        }
      </tr>
      <tr className="text-center" style={{ borderBottom: "1px solid #aaa" }}>
        <td>{item.type}</td>
        <td>{item.source}</td>
        <td>{item.required?.toLocaleString()}</td>
        <td>{item.difference?.toLocaleString()}</td>
        <td>{item.remain?.toLocaleString()}</td>
        <td>{item.responsible}</td>
        <td className="text-center">
          <div>{new Date(item.lastmodified).toISOString().slice(0, 10)}</div>
          <div>{new Date(item.lastmodified).toISOString().slice(11, 16)}</div>
        </td>
      </tr>
    </>
  )
};

function CampaignDetail() {

  const location = useLocation();
  const id = location.state?.data;
  const [list, setList] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: 'Campaign & Brand',
        accessor: 'brand',
      },
      {
        header: 'Completion',
        accessor: 'completion'
      },
      {
        header: 'Planned',
        accessor: 'planned'
      },
      {
        header: 'delivered',
        accessor: 'delivered'
      },
      {
        header: 'status',
        accessor: 'status'
      },
      {
        header: 'notes',
        accessor: 'notes'
      },
      {
        header: 'Start - Finish',
        accessor: 'period'
      }
    ],
    []
  );

  const detaildata = useMemo(() => [
      {
        header: 'Type',
        accessor: 'type',
      },
      {
        header: 'source',
        accessor: 'source'
      },
      {
        header: 'required',
        accessor: 'required'
      },
      {
        header: 'difference',
        accessor: 'difference'
      },
      {
        header: 'Remain',
        accessor: 'remain'
      },
      {
        header: 'responsible',
        accessor: 'responsible'
      },
      {
        header: 'Last Modified',
        accessor: 'lastModified'
      }
    ],[]);

  const [selectedImage, setSelectedImage] = useState(['first']);

  const getCampaignById = () => {
    // const page = 0;
    // const pageSize = 20;
    ApiService.getCampaignById(id).then(res => {
      if (res.status === 200) {
        setList(res.data);
        if(res.data[0].image){
          let fileURL = "/images/" + res.data[0].image;
          setSelectedImage([...selectedImage,fileURL]);
        }
      }
    }).catch(e => {
      console.log(e);
    });
  }

  

  useEffect(() => {
    getCampaignById();
  },[]);

  function handleFileInputClick() {
    const fileInput = document.getElementById('file-input');
    fileInput.click();
  }

  const uploadScreen = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("-------Campaign FORMDATA-------",formData);
    ApiService.uploadPortfolio(id, formData).then((res) => {
      console.log("--------------Campaign---------------",res);
      let result = res?.data?.file;
      let fileUrl = "/images/" + result.filename;
      setSelectedImage([...selectedImage, fileUrl]);
      // if (res.status === 200) {
      //   let result = res?.data?.file;
      //   let fileUrl = "/images/" + result.filename;
      //   setFile(fileUrl);
      // }
    })
  }


  document.title = "Campaign Detail Page";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Campaign" breadcrumbItem="Detail Page" />
        <div className="text-sm-end">
          <Link to={"/campaign/save/" + id}><i className="bx bxs-edit h4" ></i></Link>
          <Link to={"/campaign/insert/" + id}><i className="fas fa-plus h4" style={{marginLeft: "20px"}}></i></Link>
          <Link to={"/campaign/export/" + id}><i className="fas fa-file-export h4" style={{marginLeft:"20px"}}></i></Link>
        </div>
        <div className="table-responsive">
          <Table className="table mb-0 mw-100">
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
                  <CollapsibleRow key={index} item={item} detaildata={detaildata}/>
                )
              })}
            </tbody>
          </Table>
        </div>
        

        <div>
          <label style={{fontSize:"16px"}}><b>Screenshot</b></label>
          <div className="img-gallery">
            {selectedImage?.map((image, i )=>{
              if(image !== 'first')
              return (
                  <img key={i} src={Constant.serverUrl + image} alt="uploaded image" style={{width:'100px', height: '100px', margin: '10px'}} />
              )
            })}
            {/* <img src={Constant.serverUrl + selectedImage} alt="uploaded image" style={{width:'100px', height: '100px', margin: '10px'}} /> */}
          </div>
          <div className="d-flex justify-content-center align-items-center" style={{height:'50vh'}}>
            <button className="file-input-button" onClick={() => handleFileInputClick()}>
              <i className="fa fa-upload h2"></i>
            </button>
            <input type="file" accept="image/*" id="file-input" style={{display: 'none'}} 
            // onChange={(e) => 
            //   {
            //     var file = e.target.files[0];
            //     var reader = new FileReader();
            //     reader.readAsDataURL(file);
            //     reader.onload = (e) => {
            //       setSelectedImage([...selectedImage, e.target.result])
            //       var temp = {
            //         image: [...selectedImage,e.target.result]
            //       }
            //       ApiService.updateCampaignPortfolio(id, temp).then(res => {
            //         if (res.status === 200) {
            //           console.log(res.data.message);
            //         }
            //       }).catch(e => {
            //         console.log(e);
            //       });
            //     }
            //     console.log(selectedImage);
            // }} 
            onChange={(e) => uploadScreen(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetail;