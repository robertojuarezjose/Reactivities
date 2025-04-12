
using MediatR;
using Persistence;
using Domain;
using Application.Activities.DTOs;
using AutoMapper;
using FluentValidation;
using System.ComponentModel.DataAnnotations;
using Application.Core;
using Application.Interfaces; // Assuming 'Activity' is in the 'Domain' namespace
namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) 
    : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();




            var Activity = mapper.Map<Activity>(request.ActivityDto);

            context.Activities.Add(Activity);

            var attendee = new ActivityAttendee
            {
                Activity = Activity,
                UserId = user.Id,
                IsHost = true
            };

            Activity.Attendees.Add(attendee);


            var result  = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to update activity", 500);
            return Result<string>.Success(Activity.Id);

        }
    }

}
