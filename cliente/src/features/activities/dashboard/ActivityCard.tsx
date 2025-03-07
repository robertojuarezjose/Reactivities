import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

type Props = {
    activity: Activity;
    handleActivitySelect: (id: string) => void;
    handleDelete: (id: string)=> void; 
    
}   

export default function ActivityCard({activity, handleActivitySelect,handleDelete}: Props) {
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
                <Button size="medium" variant="contained" onClick={() => handleActivitySelect(activity.id)}>View</Button>
                <Button size="medium" variant="contained" color='error' onClick={() => handleDelete(activity.id)}>Delete</Button>
            </Box>
            
        </CardActions>
    </Card>
   
  )
}
