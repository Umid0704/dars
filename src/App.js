import { click } from "@testing-library/user-event/dist/click";
import React, { Component } from "react";

export default class App extends Component {
  state = {
   hour:0,
   minut:0,
   second:0,
   zero: "0",
   disabled:false,
   intervals:"",
   saveInterval:[]
  };
  dis1 =()=>{
    const {hour} = this.state
    
    this.setState({
      hour: hour - 1
    })
  }
  dis2 = () => {
    this.setState({
      minut: this.state.minut - 1
    })
  }
  dis3 =()=>{
    const {second} = this.state
    this.setState({
      second: second - 1
    })
  }
  increase1=()=>{
    const {hour} = this.state
    
    this.setState({
      hour: hour + 1
    })
  }
  increase2=()=>{
    const {minut} = this.state
    this.setState({
      minut: minut + 1
    })
  }
  increase3=()=>{
    const {second} = this.state
    this.setState({
      second: second + 1
    })
  }
 
 start=()=>{
  this.setState({
    disabled:true
  })
  let interval = setInterval(() => {
    const {second, minut, hour, zero} = this.state
   if(hour === 0 && minut === 0 && second === 0){
    const {hour, minut, second,disabled} = this.state
    clearInterval(this.state.intervals)
    
      this.setState({
    hour:0,
    minut:0,
    second:0,
    disabled:false,
      })
   }else if(second === 0){
      if(minut === 0){
        if(hour === 0){
          this.setState({
            second:59,
            minut:59,
            hour:23,
          })
        }else{ this.setState({
          minut:59,
            hour: hour - 1
          })}
       
      }else{
        this.setState({
          second:59,
            minut:minut - 1
          })
      }
      
    }else{
      
      if(second < 10){
        this.setState({
        second: second - 1
        })
      }else{
        this.setState({
          second: zero + second,
        
          second: second - 1
        })
      }
      
    }
    
  }, 100);
  this.setState({
    intervals:interval
  })
  
}
stop = ()=>{
clearInterval(this.state.intervals)
this.setState({
  disabled:false
})
}
interval =()=>{
const {minut,hour,second,saveInterval} = this.state
let result = saveInterval
result.push(hour + ":" + minut +":"+second)
console.log(result);
this.setState({
  saveInterval:result
})
}

clear = ()=>{
  const {hour, minut, second,disabled} = this.state
clearInterval(this.state.intervals)

  this.setState({
hour:0,
minut:0,
second:0,
disabled:false,
  })
}
  render() {
    const {minut,hour,second,disabled, saveInterval} =this.state
    return (
      <div>
        <div className="px-[80px] py-[15p] ">
          <h1 className="text-[50px] text-center">Timer</h1>
        </div>
        <div className="timer ">
          
              <div className=" flex gap-[5px] justify-center">
                <span className="flex" onClick={this.increase1}><button className="border px-[10px] py-[5px] bg-red-500">+</button><h2>{hour}</h2><button   onClick={this.dis1} className="border bg-yellow-300 px-[10px] py-[5px] ">-</button></span> <h2>:</h2>
                <span className="flex" onClick={this.increase2}><button className="border px-[10px] py-[5px] bg-red-500">+</button><h2>{minut}</h2><button  onClick={this.dis2} className="border px-[10px] bg-yellow-300 py-[5px] ">-</button></span> <h2>:</h2>
                <span className="flex" onClick={this.increase3}><button className="border px-[10px] py-[5px] bg-red-500">+</button><h2>{second}</h2><button onClick={this.dis3} className="border px-[10px] bg-yellow-300 py-[5px] ">-</button></span>
              </div>
              <div className="flex justify-center mt-[20px] ">
              <div className="flex w-[500px] justify-around">
              <button className="border rounded-[5px] text-[20px] font-semibold px-[10px] py-[5px] bg-blue-300" onClick={this.start} disabled={disabled}>start</button>
              <button className="border rounded-[5px] text-[20px] font-semibold px-[10px] py-[5px] bg-blue-500" onClick={this.stop}>stop</button>
              <button className="border rounded-[5px] text-[20px] font-semibold px-[10px] py-[5px] bg-yellow-400" onClick={this.interval}>interval</button>
              <button className="border rounded-[5px] text-[20px] font-semibold px-[10px] py-[5px] bg-red-500" onClick={this.clear}>clear</button>
              </div>
              </div>
        </div>
        <div >
                {
                  saveInterval.map((item)=> <p className="text-center text-[24px]">{item}</p>)
                }
              </div>
      </div>
    );
  }
}
