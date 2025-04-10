import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from 'react-router';
import { useActivities } from "../../../lib/hooks/useActivities";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, ActivitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./CategoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {

    const navigate = useNavigate();
    const { control, reset, handleSubmit} = useForm<ActivitySchema>(
        {
            mode: 'onTouched',
            resolver: zodResolver(activitySchema),
            
        }
    );

    const {id} = useParams();
    const {updateActivity,createActivity, activity, isLoadingActivity} = useActivities(id)
    //const navigate = useNavigate();


    useEffect(() => {
        if (activity) {
            reset({
                ...activity,
                
                location: {
                    venue: activity.venue,
                    city: activity.city,
                    latitude: activity.latitude,
                    longitude: activity.longitude,
                }
            });
        }
    }, [activity, reset]);
    

   const onSubmit = async (data: ActivitySchema) => {
        
        const {location, ...activityData} = data;
        const flattendData = {...activityData, ...location};


        console.log('saving');
        console.log(activityData);
        console.log(location);
        console.log(flattendData);

        try{

            if(activity){
                await updateActivity.mutate({...activity, ...flattendData},
                    {
                        onSuccess: () => {
                            console.log("Activity updated successfully");
                            navigate(`/activities/${activity.id}`);
                        },
                        onError: (error) => {
                            console.log(error);
                        }
                    }
                );
            }else{
                console.log("creating activity");
                console.log(flattendData);


                await createActivity.mutate(flattendData,
                    {
                        onSuccess: (id) => {
                            console.log("Activity created successfully");
                            navigate(`/activities/${id}`);
                        },
                        onError: (error) => {
                            console.log(error);
                        }
                    }
                );

                
            }
        }catch(error){
            console.log(error);
        }finally{
            console.log(flattendData);
        }

   } 

  if( isLoadingActivity) return <Typography variant='h4'>Loading...</Typography>




  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography  variant="h5" gutterBottom color="primary">{activity? "Edit activity": "Create activity"}</Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
            <TextInput label="Title" name="title" control={control} />
            <TextInput label="Description" name="description" control={control} multiline rows={3}/>
            <Box display='flex' gap={3}>
                <SelectInput items={categoryOptions} label="Category" name="category" control={control} />
                <DateTimeInput label="Date" name="date" control={control} />
            </Box>
            <LocationInput control={control} label='Enter the location' name="location" ></LocationInput>

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
