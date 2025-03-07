import { Grid2} from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type Props = {
    activities: Activity[];
    ActivitySelected: Activity | undefined;
    handleActivitySelect: (id: string) => void;
    handleCancelActivitySelect: () => void;
    editMode: boolean;
    openForm: (id?: string) => void;
    closeForm: () => void;
    submitForm: (activity: Activity) => void;
    handleDelete: (id: string)=> void;

}

export default function ActivityDashboard({activities, ActivitySelected, 
    handleActivitySelect, handleCancelActivitySelect, editMode, openForm, closeForm, submitForm, handleDelete }: Props) {
    



  return (
    <Grid2 container spacing={3}>
        <Grid2 size={7}>
           <ActivityList activities={activities} 
           handleActivitySelect={handleActivitySelect} 
           handleDelete={handleDelete}
           
           ></ActivityList>
        </Grid2>
        <Grid2 size={5}>
            { ActivitySelected && !editMode &&
                <ActivityDetails activity={ActivitySelected} 
                handleCancelActivitySelect={handleCancelActivitySelect}
                openForm={openForm}
                
                ></ActivityDetails>}
           
           
            { editMode && <ActivityForm activity={ActivitySelected} closeForm={closeForm} submitForm={submitForm}/>}
            
        </Grid2>
            
    
    </Grid2>
  )
}
