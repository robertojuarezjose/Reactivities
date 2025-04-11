using System;
using Microsoft.AspNetCore.Identity;
namespace Domain;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }
    public string? bio { get; set; }
    public string? ImageUrl { get; set; }



}
