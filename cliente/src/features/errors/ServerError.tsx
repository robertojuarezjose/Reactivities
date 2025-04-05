import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {

    const {state} = useLocation();


  return (
    <Paper>
        {state?.error ? (
            <>
                <Typography variant='h3' gutterBottom color='secondary'>
                    {state.error?.message || 'There has been an error'}
                </Typography>
                <Divider/>
                <Typography variant='body1' sx={{p:4}} >
                    {state.error?.details || 'Internal server error'}
                </Typography>
                
            
            </>
        ):(
            <Typography variant='h5' >
                Server Error
            </Typography>
        )}
    </Paper>
  )
}