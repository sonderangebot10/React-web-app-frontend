import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { throws } from 'assert';

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.setState({list: {loading: true}});
    this.getItems();
  }

  getItems = () => {
    fetch('/api/getDevices/')
    .then(res => res.json())
    .then(res => {
        this.setState({list : res.data});
    })
    .catch(error => {
        this.setState({list : {error: true}});
    });
  }

  componentDidUnmount() {
    //fetch('/api/changeTemp/?value=' + 20);
  }

  render() {
    const { list } = this.state;  
    let room_num = -1; 

    return (
        <div className="dash">
          <h3>Dashboard</h3>
          <hr />
          {list.loading && <div>Loading</div>}
          {list.length && (
            <div>
            {/* printing rooms */}
            {list.map((item) => {
              room_num++;
              let device_num = -1;
              return(
                <div>
                <h4 style={{paddingBottom: 20}}>{item.room}</h4>
                {/* printing devices */}
                {item.devices.map((device) => {
                    device_num++;
                    if(device.type == 'heater') return <Heater device={{device}} device_num={{device_num}} room={{room_num}}/>;
                    if(device.type == 'light') return <Light device={{device}} device_num={{device_num}} room={{room_num}}/>;
                    return(DeviceError(device));
                })}
                <hr />
                </div>
              );
            })}
            </div>
            ) 
          }
          {list.error && <div>No devices found</div>}
        </div>
      );
  }
}

class Heater extends Component {
  constructor(props){
    super(props);
    this.state = {
      temperature: this.props.device.device.data.temperature
    }
  }

  componentDidMount() {
    this.setState({temperature: this.props.device.device.data.temperature});
  }

  changeTemp = (event, newValue) => {
    fetch('/api/changeTemp/?room=' + this.props.room.room_num + '&device=' + this.props.device_num.device_num + '&value=' + newValue)
    .then(res => res.json())
    .then(res=> {
      this.setState({temperature: res.temperature});
    });
  };

  render(){
    return (
    <div>
      <PopupState variant="popover" popupId="demo-popup-popover">
       {popupState => (
         <div>
         <Typography id="discrete-slider" {...bindTrigger(popupState)} gutterBottom>
          Temperature {this.state.temperature}°C
        </Typography>
         <Popover
           {...bindPopover(popupState)}>
           <Typography style={{margin: 10}}>Device: {this.props.device.name} <br/>
                       Type: {this.props.device.type} <img src="https://img.icons8.com/windows/32/000000/air-conditioner.png" style={{marginLeft:5, width:30, height:30}}/><br/> 
            </Typography>
         </Popover>
        </div>
         )}
       </PopupState>
      <Slider style={{width: 200}}
        defaultValue={this.props.device.device.data.temperature}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={10}
        max={30}
        onChange={this.changeTemp}/>
    </div>
    );
       }
  }  

 class Light extends Component {
  constructor(props){
    super(props);
    this.state = {
      state: this.props.device.device.data.state
    }
  }

  changeLight = () => {
    
    fetch('/api/changeLight/?room=' + this.props.room.room_num + '&device=' + this.props.device_num.device_num)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({state: res.state});
    });
  };

  render() {
  return (
  <div>
      <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <div>
        <Typography id="discrete-slider" {...bindTrigger(popupState)} gutterBottom>
        Light
        </Typography>
        <Popover
          {...bindPopover(popupState)}>
          <Typography style={{margin: 10}}>Device: {this.props.device.device.name} <br/>
                      Type: {this.props.device.device.type} <img src="https://img.icons8.com/pastel-glyph/50/000000/light.png" style={{width:30, height:30}}/> <br/> 
          </Typography>
        </Popover>
      </div>
        )}
      </PopupState>
  <Button variant="contained" color="secondary" onClick={this.changeLight}>
    {(this.state.state) ? 'Turn off' : 'Turn on'}
  </Button>
  </div>
  );
      }
  }

  function DeviceError(device) {
    return (
    <div>
    <Typography id="discrete-slider" gutterBottom>
        Device: {device.name} <br/>
        Device not configured
    </Typography>
    </div>
    );
  }

export default Dashboard;