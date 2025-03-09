import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import {FormEvent} from 'react';
import { useNavigate, useParams } from 'react-router';
import { useActivities } from "../../../lib/hooks/useActivities";


export default function ActivityForm() {

    const {id} = useParams();
    const {updateActivity,createActivity, activity, isLoadingActivity} = useActivities(id)
    const navigate = useNavigate();

    let dateString = '';
    if (activity?.date) {
        const date = new Date(activity.date);
        if (!isNaN(date.getTime())) {
            dateString = date.toISOString().split('T')[0];
        }
    }



   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: {[key: string]: FormDataEntryValue} = {}

        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log(data);

        if(activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
            navigate(`/activities/${activity.id}`);
        }else{
            createActivity.mutate(data as unknown as Activity, {

                onSuccess: (id) => {
                    navigate(`/activities/${id}`);
                }
            } );
            
        }


   } 

  if( isLoadingActivity) return <Typography variant='h4'>Loading...</Typography>




  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography  variant="h5" gutterBottom color="primary">{activity? "Edit activity": "Create activity"}</Typography>
        <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
            <TextField name='title' label="Title" defaultValue={activity?.title} />
            <TextField name='description' label="Description" multiline rows={3} defaultValue={activity?.description}/>
            <TextField name='category' label="Category" defaultValue={activity?.category}/>
            <TextField name='date'  type="date" defaultValue={dateString}/>
            <TextField name="city" label="City"  defaultValue={activity?.city}/>
            <TextField name='venue' label="Venue" defaultValue={activity?.venue}/>
            <Box display='flex' justifyContent='end' gap={3}>
                <Button color="inherit" onClick={() =>{}}>Cancel</Button>
                <Button 
                    type='submit' 
                    variant="contained" 
                    color="success"
                    disabled={updateActivity.isPending || createActivity.isPending}

                >Submit</Button>
                
            </Box>

        </Box>

    </Paper>
  )
}
