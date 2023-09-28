import { Link as RouterLink } from "react-router-dom";
// sections
import { Stack, Typography, Link } from "@mui/material";
import AuthSocial from "../../Sections/auth/AuthSocial";

import LoginForm from "../../Sections/auth/LoginForm";


// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Login to Connect</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link
            to={"/auth/register"}
            component={RouterLink}
            variant="subtitle2"
          >
            Create an account
          </Link>
        </Stack>
        <Stack>
        {/* Form */}
      <LoginForm/>
      {/* Auth Social*/}
      <AuthSocial/>
      </Stack>
      </Stack>
      

   
    </>
  );
}