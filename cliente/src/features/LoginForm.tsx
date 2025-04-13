
import {useForm} from 'react-hook-form';
import { useAccount } from '../lib/hooks/useAccount';   
import { LoginSchema,loginSchema } from '../lib/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Typography } from '@mui/material';
import LockOpen from '@mui/icons-material/LockOpen';
import TextInput from '../app/shared/components/TextInput';
import { Link, useLocation, useNavigate } from 'react-router';

export default function LoginForm() {
    const {loginUser} = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const {control, handleSubmit, formState: {isValid, isSubmitting}} = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema),
    });

    const onSubmit =  (data: LoginSchema) => {
        console.log(data);
        loginUser.mutateAsync(data, {
            onSuccess: async () => {
                console.log('Login successful');
                
                navigate(location.state?.from || '/activities');
            },
            onError: (error) => {
                console.log(error);
            }
        });

    }



  return (
    <Paper 
        component='form' 
        onSubmit={handleSubmit(onSubmit)} 
        sx={{
            p: 3, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2, 
            maxWidth: 'md' , 
            mx:'auto' , 
            borderRadius: 3
        }} 
    >
        <Box display="flex" alignItems='center' justifyContent='center'
            gap={3} color='secondary.main'
        >
            <LockOpen fontSize='large' />
            <Typography variant='h4'>Sign in</Typography>


        </Box>
        <TextInput label='Email' control={control} name='email'/>
        <TextInput label='Password' type='password' control={control} name='password'/>
        <Button
            type='submit' 
            disabled={!isValid || isSubmitting}
            variant='contained'
            size='large'
            
        >
            Login
        </Button>
        <Typography sx={{textAlign: 'center'}}>
            Don't have an account? <Typography sx={{ml:2}} component={Link} to='/register' color='primary'>Sign up</Typography>
        </Typography>
   
    </Paper>
  )
}