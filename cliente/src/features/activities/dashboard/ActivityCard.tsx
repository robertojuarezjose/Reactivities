import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import { Link } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    activity: Activity;
    
}   

export default function ActivityCard({activity}: Props) {
    const {deleteActivity} = useActivities()


  return (

    <Card sx={{borderRadius: 3}}>
        <CardContent>
            <Typography variant="h5">{activity.title}</Typography>
            <Typography sx={{color: 'text.secondary', mb:1}}>{activity.date}</Typography>
            <Typography variant='body2'>{activity.description}</Typography>
            <Typography variant='subtitle1'>{activity.city} / {activity.venue}</Typography>

        </CardContent>
        <CardActions sx={{display:'flex', justifyContent:'space-between'}}>
            <Chip label={activity.category} variant="outlined"/>
            <Box display='flex' gap={3}>
                <Button component={Link} to={`/activities/${activity.id}`} size="medium" variant="contained" >View</Button>
                <Button 
                    size="medium" 
                    variant="contained" 
                    color='error' 
                    disabled={deleteActivity.isPending}
                    onClick={() => deleteActivity.mutate(activity.id)}>Delete</Button>
            </Box>
            
        </CardActions>
    </Card>
   
  )
}
