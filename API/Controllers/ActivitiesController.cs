using System;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using System;
using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities.Queries;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

public class ActivitiesController: BaseApiController
{
    [AllowAnonymous]
   [HttpGet]
   public async Task<ActionResult<List<ActivityDto>>> GetActivities()
   {
    return await Mediator.Send(new GetActivityList.Query());
   }  

   [HttpGet("{id}")]
   public async Task<ActionResult<ActivityDto>> GetActivityDetail(string id)
   {

        
        return HandleResult( await Mediator.Send(new GetActivityDetails.Query { Id = id }));

        
   }      

   [HttpPost]
   public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
   {
       return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto}));
   }

    
    [HttpPut("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult<Unit>> EditActivity(string id, EditActivityDto activity)
    {
        activity.Id = id;
        return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));
    }


    [HttpDelete("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult( await Mediator.Send(new DeleteActivity.Command { Id = id }));

        
    }

    [HttpPost("{id}/attend")]
    public async Task<ActionResult> Attend(string id)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
    }
}