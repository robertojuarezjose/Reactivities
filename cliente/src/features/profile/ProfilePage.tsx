import { Grid2, Typography } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";

export default function ProfilePage() {
  const {id} = useParams();

  const {profile, loadingProfile} = useProfile(id);

  if(loadingProfile) return <Typography>Loading profile...</Typography>

  if(!profile) return <Typography>Profile not found</Typography>

  return (
    <Grid2 container>
        <Grid2 size={12}>
            <ProfileHeader/>
            <ProfileContent></ProfileContent>

        </Grid2>

    </Grid2>

  )
}