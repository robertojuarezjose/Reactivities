import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";


export default function NotFound() {
  return (

    <Paper
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 400,
            p: 6
        }}
    >
        <SearchOff sx={{fontSize: 100}} color="primary"></SearchOff>
        <Typography gutterBottom variant="h3"></Typography>
        <Button fullWidth component={Link} to='/activities'>Return to the activities page</Button>

    </Paper>
  )
}