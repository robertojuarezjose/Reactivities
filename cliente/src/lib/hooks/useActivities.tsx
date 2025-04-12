import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { Activity } from "../types";
import { useAccount } from "./useAccount";

export const useActivities = (id?: string) => {

    const queryClient =  useQueryClient();
    const location  = useLocation();
    const {currentUser} = useAccount();


    const {data: activities, isLoading}= useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
          const {data} = await agent.get<Activity[]>('/activities');
          return data;
        },
        enabled: !id && location.pathname === '/activities' && !!currentUser,  
        //staleTime: 1000 * 60 * 5
      });

    const {data: activity, isLoading: isLoadingActivity}= useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
          const {data} = await agent.get<Activity>(`/activities/${id}`);
          return data;
        },
        enabled: !!id && !!currentUser
      });


    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
          await agent.put('/activities/', activity);
        },
        onSuccess: async () =>{
          await queryClient.invalidateQueries({
            queryKey: ['activities']
          });

          

        }
        
      });


      const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
          const {data} = await agent.post('/activities/', activity);
          return data;
        },
        onSuccess: async () =>{
          await queryClient.invalidateQueries({
            queryKey: ['activities']
          });

        }
      });

      const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
          await agent.delete(`/activities/${id}`);
        },
        onSuccess: async () =>{
          await queryClient.invalidateQueries({
            queryKey: ['activities']
          });

        }
      });

      return {
        activities, 
        isLoading, 
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity
      };

}