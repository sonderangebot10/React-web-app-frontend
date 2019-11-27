import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class Edit extends Component {
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

  addRoom = () => {
    fetch('/api/addRoom/?room_name=' + this.state.room_name)
    .then(res => this.getItems());
  }

  render() {
    const { list } = this.state;    
    let room = -1;      
    return (
        <div className="edit">
          <h3>Edit Devices</h3>
          <hr />
          {list.loading && <div>Loading</div>}
          {list.length &&(
            <div>
            {/* printing rooms */}
            {list.map((item) => {
              room++;
              return(
                <div style={{paddingBottom: 20}}>
                <h4 >{item.room}</h4>
                {/* printing devices */}
                {item.devices.map((device) => {
                    if(device.type == 'heater' || 'light') return OldDevice(device);
                    return(DeviceError(device));
                })}
                <NewDevice room={{room}} refresh={this.getItems}/>
                </div>
              );
            })}
            <div>
            <TextField style={{marginBottom: 10}}
              id="standard-basic"
              label="Add room"
              value={this.state.room_name}
              onChange={e => this.setState({ room_name: e.target.value })}/>
            </div>
            <Button variant="contained" color="secondary" onClick={this.addRoom} >
              Add
            </Button>
            </div>
          )
          }
          {list.error && <div>No devices found</div>}
        </div>
      );
  }
}

function NewDevice(props) {
  const [device_type, setDevice_type] = React.useState('');
  const [device_name, setDevice_name] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setDevice_type(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const addDevice = () => {
    fetch('/api/addDevice/?room=' + props.room.room + '&type=' + device_type + '&name=' + device_name)
    .then(res => props.refresh());
  }

  return (
  <ExpansionPanel style={{marginBottom: 10}}>
  <ExpansionPanelSummary
    aria-controls="panel1a-content"
    id="panel1a-header">
    <Typography><b>New Device <img src="https://img.icons8.com/material-outlined/24/000000/add-book.png" style={{marginLeft:5, width:20, height:20}}/></b></Typography>
  </ExpansionPanelSummary>
  <ExpansionPanelDetails>
    <Typography>
    <FormControl>
    <InputLabel id="demo-controlled-open-select-label">Type</InputLabel>
    <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={device_type}
        onChange={handleChange}>
        <MenuItem value={10}>Heater</MenuItem>
        <MenuItem value={20}>Light</MenuItem>
      </Select>
      </FormControl>
      <div></div>
      <TextField style={{marginBottom: 10}}
        id="standard-basic"
        label="Device name"
        onChange={e => setDevice_name(e.target.value)}/>
        <div></div>
      <TextField style={{marginBottom: 10}}
        id="standard-basic"
        label="Endpoint url"/>
      <div>
      <Button variant="contained" color="secondary" onClick={addDevice}>
        Save
      </Button>
      </div>
    </Typography>
  </ExpansionPanelDetails>
</ExpansionPanel>
  );
}

function OldDevice(device) {
    return (
      <ExpansionPanel style={{marginBottom: 10}}>
      <ExpansionPanelSummary
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography><b>{device.name}</b></Typography>
        {(device.type == 'light') ? 
        <img src="https://img.icons8.com/pastel-glyph/50/000000/light.png" style={{marginLeft:5, width:30, height:30}}/> : 
        <img src="https://img.icons8.com/windows/32/000000/air-conditioner.png" style={{marginLeft:10, width:30, height:30}}/>}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          <TextField style={{marginBottom: 10}}
            id="standard-basic"
            label="Device name"/>
          <div></div>
          <TextField style={{marginBottom: 10}}
            id="standard-basic"
            label="Endpoint url"/>
          <div>
          <Button variant="contained" color="secondary" >
            Save
          </Button>
          </div>
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    );
  }

  function DeviceError(device) {
    return (
    <Collapsible trigger={device.name}>
        <p>This is the collapsible content.</p>
        </Collapsible>
    );
  }

export default Edit;