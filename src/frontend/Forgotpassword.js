import React,{useState} from "react";
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar";
import Topbar from "./Components/Topbar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Forgotpassword(){
    let formValues={
        email:"",
        error:{
            email:"",
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
     });
 
     if(errorkeys.length>0){
       toast('pls fill all the fields');  
     }else{
       try {
       const response=await axios.post("http://localhost:3001/Catalog/user/checkUser", {
        email:formData.email,
       }); 
       setFormdata(formValues);
       toast(response.data.msg);    
     }catch(error){
        toast(error.response.data.msg);  
     }
     } 
   }
 
        
    return (
        <>
         <Topbar/>
         <Navbar/>
         <div className="container-fluid">
         <div><ToastContainer /></div>
        <div className="row px-xl-5">
            <div className="col-lg-12">
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Forgot Password</span></h5>
                <div className="bg-light p-30 mb-5">
                    <form onSubmit={(e)=>handleSubmit(e)}>
                         
                        <div className="row">
                           <div className="col-md-8 form-group">
                            <label for="product_name">Email</label>
                            <input className="form-control" id="email" name="email" type="email" value={formData.email}  onChange={(e) => handleChange(e)}  placeholder="email" required/>
                            <span style={{color:"red"}}> {formData.error.email}</span>
                            <p className="help-block text-danger"></p>
                            </div>
                        </div>
                        
                        <div>
                        <button className="btn btn-primary btn-lg" type="submit">Submit</button>
                        </div>
                     </form>
                </div>
            </div>
            <div className="col-lg-5 mb-5">
             
            </div>
        </div>
    </div>
       <Footer/>
   
    </>
    );
}

export default Forgotpassword;