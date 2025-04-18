import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { LoginSchema } from "../schemas/loginSchema";
import agent from "../api/agent";
import { useNavigate } from "react-router";
import { User } from "../types";
import { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";



export const useAccount = () => {  
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    


    const loginUser = useMutation({
        mutationFn: async (credentials: LoginSchema) => {     
            await agent.post('/login?useCookies=true', credentials);

        },
        onSuccess: async () => {

            await queryClient.invalidateQueries({
                queryKey: ['user'],
            });
            

        }


    });

    const registerUser = useMutation({
        mutationFn: async (credentials: RegisterSchema) => {
            await agent.post('/account/register', credentials);
        },
        onSuccess: async () => {
            toast.success('Registration successful');
            navigate('/login');
        }
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: async () => {
            queryClient.removeQueries({queryKey: ['user']});
            queryClient.removeQueries({queryKey: ['activities']});
            navigate('/');
        }
    });

    const {data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']) 
       
        

    })
    

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser
    }


}