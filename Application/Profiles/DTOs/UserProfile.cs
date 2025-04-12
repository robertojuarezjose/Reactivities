using System;

namespace Application.Profiles.DTOs;

public class UserProfile
{
    public required string Id {get; set;} 
    public required string DisplayName { get; set; } = string.Empty;
    public string? Bio { get; set; } = string.Empty;
    public string? ImageUrl { get; set; } = string.Empty;



}
