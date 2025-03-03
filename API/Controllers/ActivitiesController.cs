using System;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseApiController
{
   [HttpGet]
   public async Task<ActionResult<List<Activity>>> GetActivities()
   {
       return await context.Activities.ToListAsync();
   }  

   [HttpGet("{id}")]
   public async Task<ActionResult<Activity>> GetActivityDetail(string id)
   {

        var activity = await context.Activities.FindAsync(id);

        if(activity == null)
        {
            return NotFound("Activity not found");
        }   
       return activity;
   }      
}