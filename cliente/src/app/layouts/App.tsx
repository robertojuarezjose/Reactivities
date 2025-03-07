import { Box, Container, CssBaseline} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [ActivitySelected, setActivitySelected] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

    

  useEffect(() => {

    axios<Activity[]>('https://localhost:5001/api/activities')
    .then(response=>{
      console.log(response);
      setActivities(response.data);
    })


  },[])

  function handleActivitySelect(id: string){
    setActivitySelected(activities.find(x=>x.id === id));
  }   

  function handleCancelActivitySelect(){
    setActivitySelected(undefined);
  } 
  
  const handleOpenForm = (id?: string) => {

    
    if(id){
      
      handleActivitySelect(id)
    }else 
      handleCancelActivitySelect();
      
      setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    setActivities(prev => {
      const exists = prev.some(x => x.id === activity.id);
  
      if (exists) {
        console.log("Updating existing activity");
        setActivitySelected(undefined);
        return prev.map(x => x.id === activity.id ? activity : x);
      } else {
        console.log("Adding new activity");
        const newActivity = {...activity, id: activities.length.toString()}
        setActivitySelected(newActivity);
        return [...prev, newActivity];
      }
    });
  
    
    setEditMode(false);
  };

  const handleDelete =(id: string)=>{
    setActivities(activities.filter(x => x.id !== id));
  }
  

 
    

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
    <CssBaseline/>
    <NavBar openForm={handleOpenForm}></NavBar>
    <Container maxWidth="xl" sx={{mt:3}}>
      <ActivityDashboard activities={activities} 
      handleActivitySelect={handleActivitySelect} 
      handleCancelActivitySelect={handleCancelActivitySelect}
      ActivitySelected={ActivitySelected}
      editMode={editMode}
      openForm={handleOpenForm}
      closeForm={handleCloseForm}
      submitForm={handleSubmitForm}
      handleDelete={handleDelete}
      />


    </Container>
    
     
    </Box>
      
     )
}

export default App
