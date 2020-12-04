import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import {useState,useEffect} from 'react';

import Button from '@material-ui/core/Button';
import axios from 'axios';


import {useContext } from 'react';

import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ReactDOM from 'react-dom';
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import IconButton from '@material-ui/core/IconButton';


import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';









const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  {id:'2',name:'imad'},
  {id:'4',name:'alomda'},
  
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddProject() {
  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] =  'Bearer '+token;
  const classes = useStyles();
  const[team_created_id,setTeam_Created_Id]=useState('');

const[members_basic,setMembers_Basic]=useState(names);//will get it by filtering our main members to role basic
const[members_moderator,setMembers_Moderator]=useState(names);//will get it by filtering our main members to role moderator
  const [team_name, setTeam_Name] = useState('');
  const [team_admin_id, setTeam_Admin_Id] = useState('');
const[team_members_to_add,setTeam_Members_To_Add]=useState('');//for storing members to add to a team
const [age, setAge] = React.useState('');
const [members, setMembers] = useState(null);//initial members by axios getAllMembers
 
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

const handleChange_select_team_admin = (event) => {
  console.log('we are in team_admin_id');
  var temp=event.target.value;
  setTeam_Admin_Id(event.target.value);
  var value = members_moderator.filter(function(item) {
    return item.name == temp
  })
  //Object.values(listItems[0]).forEach(val => console.log(val));
  console.log("slectedvalue is",value[0].id);
  setTeam_Admin_Id(value[0].id);
};

  

  const handleChange = (event) => {
    setPersonName(event.target.value);
    personName.forEach(element => {
      var temp=event.target.value;
    console.log(event.target.value);
     var value = members_basic.filter(function(item) {
      return item.name == element
    })
    AddTeamMembersRequest(value[0].id);
    console.log(personName);
    console.log("ss",value[0].id);
    });
}
   


 


//fetch All Members of this organization signed In
  const fetchMembers = () => {
        var send_url_index="http://localhost:8000/api/getAllMembers";
        axios.get(send_url_index).then(res => {
              const result = res.data.data;
              console.log("members data ", result);
              setMembers(res.data.data);
              //filter_moderate();
            //  setMembers_Basic(res.data.data);
          }).catch(error => console.log(error));
      }


      const fetchBasic = () => {
        var send_url_index="http://localhost:8000/api/getAllBasic";
        axios.get(send_url_index).then(res => {
              const result = res.data.data;
              console.log("members data ", result);
              setMembers_Basic(res.data.data);
              //filter_moderate();
            //  setMembers_Basic(res.data.data);
          }).catch(error => console.log(error));
      }
      

      const fetchModerator = () => {
        var send_url_index="http://localhost:8000/api/getAllModerators";
        axios.get(send_url_index).then(res => {
              const result = res.data.data;
              console.log("members data ", result);
              setMembers_Moderator(res.data.data);
              //filter_moderate();
            //  setMembers_Basic(res.data.data);
          }).catch(error => console.log(error));
      }
      









      
      const filter_basic = () => {
      const temp=[];
      //setMembers_Basic([...members_basic, ...members.filter((r) => r.role =="basic")]);
      members.forEach(element => {
        if(element.role=="basic"){
          console.log("Member basic is ",element);
          temp.push(element);
        }

  });
        setMembers_Basic(temp);
        console.log("members-basic",members_basic);
      };

    
      const filter_moderate = () => {
        const temp2=[];
      //setMembers_Basic([...members_basic, ...members.filter((r) => r.role =="basic")]);
      members.forEach(element => {
        if(element.role=="moderator"){
          console.log("Member basic is ",element);
          temp2.push(element);
        }
  });
        setMembers_Moderator(temp2);
        console.log("Moderator",members_moderator);
      };

     
//

  async function AddTeamRequest() {
    console.log("entssssered makesignrequest");
        const Datato_Send2 = {
            name: team_name,
            team_admin_id:team_admin_id
          }
        let res = await axios.post('http://localhost:8000/api/team', Datato_Send2).catch(error => console.log(error));
    if(res.data.message=="Team created successfully."){
      setTeam_Created_Id(res.data.data.id);
      alert('hahaha');
    }else{
      alert('repeat');
    }
    }


//send member of a team
    async function AddTeamMembersRequest(member_id) {
      console.log("entssssered makesignrequest");
          const Datato_Send22 = {
              member_id: member_id,
              team_id:team_created_id
            }
          let res = await axios.post('http://localhost:8000/api/teamMember', Datato_Send22).catch(error => console.log(error));
      }




      async function registerMembers() {
        console.log(" makeregisterequest");
            const Datato_Send = {
              }
            let res = await axios.post('http://localhost:8000/api/user', Datato_Send).catch(error => console.log(error));
        }




useEffect(() => {
  fetchMembers();
 fetchBasic();
 fetchModerator();
}, []);




       if(members==null){
         return <div>waiting ....</div>
       }else{

      
      
  return (
    <div>
    {fetchMembers}
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">ADD TEAM MEMBERS</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
         
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {members_basic.map((name) => (
            <MenuItem key={name.id} value={name.name} style={getStyles(name.name, personName, theme)}>
              {name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
      <br/>
      <Button variant="contained" color="secondary"  startIcon={<AddCircleOutlineIcon />} onClick={AddTeamMembersRequest} >ADD TEAM MEMBERS</Button>
      </div>
      
      
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
        Add Team
        </Typography>
        
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            id="email"
            label="team_name"
            name="email"
            autoComplete="email"
            autoFocus
            value={team_name}
            onChange={event => setTeam_Name(event.target.value)}
          />
           <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">team_admin_id</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          
          onChange={handleChange_select_team_admin}
        
        >{

      
          members_moderator.map((pie_data1) =>(
           <option key={pie_data1.id} value={pie_data1.name}>
          {pie_data1.name}
          </option> ))

}


        </NativeSelect>
      </FormControl>

          <Button

            fullWidth
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={AddTeamRequest}
          >
            Add Team
          </Button>
          
        

          <Grid container>


<Grid item>

</Grid>

          </Grid>
        </form>
      </div>

    </Container>

   

    <Button
          color="inherit"
          variant="contained"
          component={Link} to={'/addProject_Project'}>
              Add Project
              </Button>





    </div>
  );
}//end of else
}
