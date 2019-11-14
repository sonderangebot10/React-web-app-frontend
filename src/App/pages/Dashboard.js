import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

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

  render() {
    const { list } = this.state;          
    return (
        <div className="dash">
          <h3>Dashboard</h3>
          <hr />
          {list.loading && <div>Loading</div>}
          {list.length && (
            <div>
            {/* printing rooms */}
            {list.map((item) => {
              return(
                <div>
                <h4 style={{paddingBottom: 20}}>{item.room}</h4>
                {/* printing devices */}
                {item.devices.map((device) => {
                    if(device.type == 'heater') return Heater(device);
                    if(device.type == 'light') return Light(device);
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

function Heater(device) {
    return (
    <div>
      <PopupState variant="popover" popupId="demo-popup-popover">
       {popupState => (
         <div>
         <Typography id="discrete-slider" {...bindTrigger(popupState)} gutterBottom>
          Temperature {device.data.temperature}°C
        </Typography>
         <Popover
           {...bindPopover(popupState)}>
           <Typography style={{margin: 10}}>Device: {device.name} <br/>
                       Type: {device.type} <img src="https://img.icons8.com/windows/32/000000/air-conditioner.png" style={{marginLeft:5, width:30, height:30}}/><br/> 
            </Typography>
         </Popover>
        </div>
         )}
       </PopupState>
      <Slider style={{width: 200}}
        defaultValue={device.data.temperature}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={10}
        max={30}/>
    </div>
    );
  }  

  function Light(device) {
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
           <Typography style={{margin: 10}}>Device: {device.name} <br/>
                       Type: {device.type} <img src="https://img.icons8.com/pastel-glyph/50/000000/light.png" style={{width:30, height:30}}/> <br/> 
            </Typography>
         </Popover>
        </div>
         )}
       </PopupState>
    <Button variant="contained" color="secondary" >
      {(device.data.state) ? 'Turn off' : 'Turn on'}
    </Button>
    </div>
    );
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