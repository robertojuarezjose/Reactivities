import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Props = {
    activities: Activity[];
    handleActivitySelect: (id: string) => void;
    handleDelete: (id: string) => void;
  
}
export default function ActivityList({activities, handleActivitySelect, handleDelete}: Props) {
  return (
    <Box sx={{display:'flex', flexDirection: 'column', gap: 3}}>
        {activities.map(activity => (
             <ActivityCard key={activity.id} activity={activity} 
             handleActivitySelect={handleActivitySelect} 
             handleDelete={handleDelete}
             />
        ))}


    </Box>
  )
}
