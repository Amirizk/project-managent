import {React,useContext } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactDOM from 'react-dom';
import  {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {UserContext} from '../UserContext';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import MoodIcon from '@material-ui/icons/Mood';





const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddProject_Project() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [team_id, setTeamId] = useState('');
  const { user, setUser } = useContext(UserContext);
const[teams,setTeams]=useState("");





  async function CreateProject() {
console.log("entssssered makesignrequest");
    const Datato_Send = {
        name: email,
        team_id:team_id
      }
    let res = await axios.post('http://localhost:8000/api/project', Datato_Send).catch(error => console.log(error));
}





const fetchTeams = () => {
    var send_url_index="http://localhost:8000/api/getAllMembers";
    axios.get(send_url_index).then(res => {
          const result = res.data.data;
          console.log("members data ", result);
         
          //filter_moderate();
        //  setMembers_Basic(res.data.data);
      }).catch(error => console.log(error));
  }



  


















  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <MoodIcon/>
        <Typography component="h1" variant="h5">
         Insert Project Name
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email" 
            label="Project Name"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <InputLabel htmlFor="demo-customized-select-native">team_id</InputLabel>
        
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={CreateProject}
          >
            Add Project
          </Button>
          <Grid container>
<Grid item>
</Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}




