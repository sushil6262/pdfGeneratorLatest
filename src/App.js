import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';

class App extends Component {
  state = {
    name: 'Sushil',
    receiptId: 0,
    price1: 0,
    price2: 0,
}


  handleChange=({target:{value,name}})=>this.setState({[name]:value})
  createAndDownloadPdf=()=>{
    axios.post('/create-pdf',this.state)
    .then(()=>axios.get('/fetch-pdf',{responseType:"blob"}))
    .then((res)=>{
      const pdfBlob = new Blob([res.data],{type:'application/pdf'})


      saveAs(pdfBlob, 'cashmemo.pdf')
    })
  }
  
  render() {
    return (
      <div className="p">
      <input className="form-control m-3" type="text" placeholder="Name" name="name" onChange= {this.handleChange}/>
      <input className="form-control m-3" type="number" placeholder="Receipt ID" name="receiptId"    onChange={this.handleChange}/>
      <input className="form-control m-3" type="number" placeholder="Price 1" name="price1" onChange={this.handleChange}/>
      <input className="form-control m-3" type="number" placeholder="Price 2" name="price2" onChange={this.handleChange}/>
      <button className="btn btn-primary m-3" onClick={this.createAndDownloadPdf}>Download PDF</button></div>
    );
  }
}

export default App;
