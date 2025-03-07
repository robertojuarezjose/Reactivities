import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
    activity: Activity;
    handleCancelActivitySelect: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails({activity, handleCancelActivitySelect, openForm}: Props) {
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
            <Button color="primary" onClick={() => openForm(activity.id)}>Edit</Button>
            <Button color="inherit" onClick={handleCancelActivitySelect}>Cancel</Button>

        </CardActions>   

    </Card>
  )
}
