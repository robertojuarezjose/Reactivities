import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate, Link, useParams } from 'react-router';
import { useActivities } from '../../../lib/hooks/useActivities'; // Adjust the import path as necessary



export default function ActivityDetails() {

  const navigate = useNavigate();
  const {id} = useParams();
  const {activity, isLoadingActivity} = useActivities(id);


  if (isLoadingActivity)return <Typography variant='h4'>Loading...</Typography>
  if (!activity)return <Typography variant='h4'>Activity not found.</Typography>
  

  return (
    <Card sx={{borderRadius: 3}}>

        <CardMedia component='img' src={`/images/categoryImages/${activity.category}.jpg`} >

        </CardMedia>

        <CardContent>
            <Typography variant="h5">{activity.title}</Typography>
            <Typography variant='subtitle1' fontWeight='light'>{activity.date}</Typography>
            <Typography variant='body1'>{activity.description}</Typography>  
            
        </CardContent>   
        <CardActions >
            <Button component={Link} to={`/manage/${activity.id}`} color="primary" >Edit</Button>
            <Button color="inherit" onClick={() => navigate('/activities')}>Cancel</Button>

        </CardActions>   

    </Card>
  )
}
