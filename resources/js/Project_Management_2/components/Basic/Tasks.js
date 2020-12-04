

import Button from '@material-ui/core/Button';
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {useEffect, useState} from 'react';
import axios from 'axios';
const columns = [
  { field: 'id', headerName: 'id', width: 70 },

  { field: 'project_id', headerName: 'project_id', width: 130 },
  {
    field: 'name',
    headerName: 'name',
    type: 'number',
    width: 160,
  },
  {
    field: 'member_id',
    headerName: 'member_id ',
    description: 'This column has a value getter and is not sortable.',

    width: 160,

  },
  {
    field: 'member_name',
    headerName: 'member_name',

    width: 130,
  },
  

];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];





export default function Tasks() {

    const [members, setMembers] = useState(null);
    const [deletedRows, setDeletedRows] = useState([]);

    const handleRowSelection = (e) => {

     setDeletedRows([...deletedRows, ...members.filter((r) => r.id === e.data.id)]);
   };
   const handlePurge = () => {
       deletedRows.forEach(element => {
        deleteTask(element.id);
       });
    setMembers(
      members.filter((r) => deletedRows.filter((sr) => sr.id === r.id).length < 1)
    );
  };

  function deleteTask(id){
    console.log("id is ",id);
    var send_url="http://localhost:8000/api/task/"+id;
  axios.delete(send_url).then(res => {
      const result = res.data;
      console.log("RESULT:from home ", result);
   //   fetchPosts();
     // history.push('/login');//this will redirect you to home page ;
      alert('post deleted');
  }).catch(error => console.log(error));

}
    const fetchMembers = () => {
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] =  'Bearer '+token;

            var send_url_index="http://localhost:8000/api/tasks";
            axios.get(send_url_index).then(res => {
                  const result = res.data;
                  console.log("members data ", result);
                  setMembers(res.data.data);
              }).catch(error => console.log(error));
          }


          useEffect(() => {
            fetchMembers();

          }, []);





function returnmembers_data(){



}







if(members!=null){
    return (
        <div>
        <div style={{ height: 400, width: '100%' }}>

          <DataGrid rows={members}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onRowSelected={handleRowSelection}
          />

        </div>
         <Button variant="contained" color="secondary" onClick={handlePurge} >DELETE</Button>
        </div>
      );
}else{
    return <div>loading members</div>
}


}








