import { Link as RouterLink } from "react-router-dom";
// sections
import React from "react";
import { Stack, Typography, Link } from "@mui/material";
import VerifyForm from "../../Sections/auth/VerifyForm";
// import AuthSocial from "../../sections/auth/AuthSocial";
// import Login from "../../sections/auth/LoginForm";
// import VerifyForm from "../../sections/auth/VerifyForm";

// ----------------------------------------------------------------------

const Verify = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Please Verify OTP</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">
            Sent to email (avanigupta2003@gmail.com)
          </Typography>
        </Stack>
      </Stack>
      {/* Form */}
      <VerifyForm />
    </>
  );
}

export default Verify;