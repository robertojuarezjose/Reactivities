using System;
using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try{

            await next(context);


        }
        catch(ValidationException ex)
        {
            await HandleValidationException(context, ex);
            



        }
        catch(Exception ex){


            await HandleException(context, ex);

        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = env.IsDevelopment()
            ? new AppException(StatusCodes.Status500InternalServerError, ex.Message, ex.StackTrace?.ToString())
            : new AppException(StatusCodes.Status500InternalServerError, "Internal Server Error", null);

        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            
        };

        var json = JsonSerializer.Serialize(response, options);
        await context.Response.WriteAsync(json);

        

    }


    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>(); 

        if(ex.Errors is not null){
            
            foreach(var error in ex.Errors){
                if(validationErrors.TryGetValue(error.PropertyName, out var existingErrors )){

                    validationErrors[error.PropertyName] = [.. existingErrors, error.ErrorMessage];

                }else{
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                }
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest; 

        var validationProbvlemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "Vailidation Fauilure",
            Title = "Validation Error",
            Detail = "One or more validation errors occurred.",
            Instance = context.Request.Path
        };

        await context.Response.WriteAsJsonAsync(validationProbvlemDetails);

    }
}
