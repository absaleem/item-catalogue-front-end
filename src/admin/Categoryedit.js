import React,{useState,useEffect} from "react";
import Footeradmin from "../frontend/Components/Footeradmin";
import Navbaradmin from "../frontend/Components/Navbaradmin";
import axios from "axios";
import { useNavigate,useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Categoryedit(){
  const params = useParams();
  const navigate = useNavigate();
  const admin_token = localStorage.getItem("admin_token");
 
  if(!admin_token){
      navigate('/admin');
  }
  
   let formValues={
    id:"",
    category_name: "",
    error:{
      category_name: "",
    }
  }
  const handleChange =(e)=>{
    let error= { ...formValues.error };
    if(e.target.value === ""){
      error[e.target.name]=`${e.target.placeholder} is required`;
    }else{
      error[e.target.name]=""; 
    }
    setFormdata({...formData, [e.target.name]:e.target.value, error});
  }
  const [formData,setFormdata]=useState(formValues); 
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
  
    const errorkeys=Object.keys(formData).filter((key)=>{
      if(formData[key] === "" && key!=='error'){
        return key;
      }
        return false;
    });

    if(errorkeys.length>0){
      alert('pls fill all the fields');
    }else{
      try {
        const response=await axios.put(`http://localhost:3001/Catalog/updateCategory/${formData.id}`,{
        category_details:{
            category_name:formData.category_name,
        }
        });
      
      setFormdata(formValues);
      toast(response.data.msg);   
      setTimeout(() => {
      navigate('/admin/Category');
      }, 2000); 
          
    }catch(error){
  
    }
    } 
  }

  useEffect(() => {
    try{
  async function getData(rowId){
      const response = await axios.get(`http://localhost:3001/Catalog/getCategory/${rowId}`);
      const response1 = response.data.category_details;
      setFormdata({...formData,
              id:response1._id,
              category_name:response1.category_name,
      }); 
      }     
      getData(params.id);//call user data when loading the file
  
    }catch(error){
  
    }
    
  },[]);
       
        
    return (
        <>
        <Navbaradmin/>
        <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Create category</span></h2>
        <div className="row px-xl-5">
            <div className="col-lg-7 mb-5">
                <div className="contact-form bg-light p-30">
                    <div><ToastContainer /></div>
                                               
                    <form  onSubmit={(e)=>handleSubmit(e)}>
                        <div className="control-group">
                        <label for="product_name">Category name:</label>
                            <input className="form-control" id="category_name" name="category_name" type="text" value={formData.category_name}  onChange={(e) => handleChange(e)}  placeholder="catalog name" required/>
                            <span style={{color:"red"}}> {formData.error.category_name}</span>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div>
                        <button className="btn btn-primary btn-lg" type="submit">Save</button>
                            
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-5 mb-5">
             
            </div>
        </div>
    </div>
       <Footeradmin/>
    </>
    );
}

export default Categoryedit;