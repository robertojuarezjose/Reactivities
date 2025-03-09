import { Box, Paper, Typography, ListItemText, MenuList, MenuItem } from '@mui/material';
import Event from '@mui/icons-material/Event';
import FilterList from '@mui/icons-material/FilterList';
import 'react-calendar/dist/calendar.css'
import Calendar from 'react-calendar';

export default function ActivityFilters() {
  return (
    <Box sx={{display:'flex', flexDirection:'column', gap: 3, borderRadius: 3}}>
        <Paper sx={{p:3, borderRadius: 3}}>
            <Box sx={{width: '100%' }}>
                <Typography variant='h6' sx={{display:'flex', alignItems: 'center', mb:1, color: 'primary.main'}} >
                    <FilterList sx={{mr:1}}/>
                </Typography>
                <MenuList>
                    <MenuItem>
                        <ListItemText primary='All events'/>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText primary="I'm going"/>
                    </MenuItem>
                    <MenuItem>
                        <ListItemText primary='All hosting'/>
                    </MenuItem>

                </MenuList>
 
            </Box>

        </Paper>
        <Box component={Paper} sx={{width:'100%', p: 3, borderRaduis: 3}}>
            <Typography variant='h6' 
            sx={{display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main'}}>
                <Event sx={{mr:1}}/>
                Select date
                
            </Typography>
            <Calendar/>
        </Box>
        

    </Box>
  )
}