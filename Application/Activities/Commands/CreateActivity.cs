
using MediatR;
using Persistence;
using Domain;
using Application.Activities.DTOs;
using AutoMapper;
using FluentValidation;
using System.ComponentModel.DataAnnotations;
using Application.Core; // Assuming 'Activity' is in the 'Domain' namespace
namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {

            var Activity = mapper.Map<Activity>(request.ActivityDto);

            context.Activities.Add(Activity);


            var result  = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<string>.Failure("Failed to update activity", 500);
            return Result<string>.Success(Activity.Id);

        }
    }

}
