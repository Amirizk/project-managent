import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {useHistory} from 'react-router-dom';
import SignIn from '../Sign_In';
import {useEffect, useState} from 'react';
import axios from 'axios';
import firebase from 'firebase';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function InteractiveList() {
  const classes = useStyles();
  const history=useHistory();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
const AllowedRole="admin";
var isloggedin=localStorage.getItem('isloggedin');
var current_role=localStorage.getItem('role');
const [projects, setProjects] = useState(null);

const fetchProjects = () => {

    let user_id=localStorage.getItem("user_id");
        var send_url_index="http://localhost:8000/api/getProjects";
        axios.get(send_url_index).then(res => {
              const result = res.data;
              console.log("RESULT:from home ", result);
              setProjects(res.data);
          }).catch(error => console.log(error));
      }


      useEffect(() => {
        fetchProjects();

      }, []);



if(AllowedRole==current_role && isloggedin=="true"){


  return (
    <div className={classes.root}>




       

    </div>
  );
              }else{
               return  (



               <SignIn></SignIn>


               );
              }





}
