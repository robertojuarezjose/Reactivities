using System;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{

    public class Command : IRequest
    {
        public string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(request.Id, cancellationToken);
            if(activity == null) throw new Exception("Activity not found");


            context.Activities.Remove(activity);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}

