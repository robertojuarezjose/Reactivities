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
        select: data => {
          return data.map(activity => {
            return {
              ...activity,
              isHost: currentUser?.id === activity.hostId,
              isGoing: Array.isArray(activity.attendees) 
                && activity.attendees.some(a => a.id === currentUser?.id),
            }
          })
          
        }
        //staleTime: 1000 * 60 * 5
      });

    const {data: activity, isLoading: isLoadingActivity}= useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
          const {data} = await agent.get<Activity>(`/activities/${id}`);
          return data;
        },
        enabled: !!id && !!currentUser, 
        select: data => {
          return {
            ...data,
            isHost: currentUser?.id === data.hostId,
            isGoing: Array.isArray(data.attendees) 
                && data.attendees.some(a => a.id === currentUser?.id),
          }
        }
      });


      const updateAttendance = useMutation({
        mutationFn: async (id: string) => {
          await agent.post(`/activities/${id}/attend`);
        },
        onMutate: async (activityId: string) => {
          // Cancel any outgoing refetches for this query so they don't overwrite our optimistic update
          await queryClient.cancelQueries({ queryKey: ['activities', activityId] });
      
          // Get the current activity data from the query cache
          const prevActivity = queryClient.getQueryData<Activity>(['activities', activityId]);
      
          // Optimistically update the activity data in the cache
          queryClient.setQueryData<Activity>(
            ['activities', activityId],
            (oldActivity) => {
              if (!oldActivity || !currentUser) return oldActivity;
      
              const isHost = oldActivity.hostId === currentUser.id;
              const isAttending = oldActivity.attendees?.some(a => a.id === currentUser.id);
      
              return {
                ...oldActivity,
                isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled,
                attendees: isAttending
                  ? isHost
                    ? oldActivity.attendees
                    : oldActivity.attendees?.filter(a => a.id !== currentUser.id)
                  : [
                      ...(oldActivity.attendees ?? []),
                      {
                        id: currentUser.id,
                        displayName: currentUser.displayName,
                        imageUrl: currentUser.imageUrl,
                      },
                    ],
              };
            }
          );
      
          // Return context with previous activity data for potential rollback in case of error
          return { prevActivity };
        },
        onError: (error, activityId, context) => {
          console.log(error);
          // Roll back the optimistic update if something went wrong
          if (context?.prevActivity) {
            queryClient.setQueryData<Activity>(
              ['activities', activityId],
              context.prevActivity
            );
          }
        },
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
        isLoadingActivity,
        updateAttendance
      };

}