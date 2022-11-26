import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FieldValues, useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { signInUser } from "./accountSlice";
import { useAppDispatch } from "../../app/redux/configureStore";
import { toast } from "react-toastify";

const theme = createTheme();

export default function Register() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { isSubmitting, errors, isValid },
      } = useForm<{ username: "", email: "", password: "" }>({ mode: "all" });
    
        //setError ระบุค่าผิดพลาดให้แสดงใหม่ ที่ส่งมาจาก API
      function handleApiErrors(errors: any) {
        if (errors) {
          errors.forEach((error: string) => {
            if (error.includes("Password")) {
              setError("password", { message: error });
            } else if (error.includes("Email")) {
              setError("email", { message: error });
            } else if (error.includes("Username")) {
              setError("username", { message: error });
            }
          });
        }
      }
    

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ height: "100vh" ,mb:5}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 5,
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{borderRadius: 5}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Login
            </Typography>
            <Box
          component="form"
          onSubmit={handleSubmit((data) =>
            agent.Account.register(data)
              .then(() => {
                toast.success("Registration successful - you can now login");
                // history.push("/login");
              })
              .catch((error) => handleApiErrors(error))
          )}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="User name"
            autoFocus
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors?.username?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+[\w-.]*@\w+((-\w+)|(\w*)).[a-z]{2,3}$/,
                message: "Not a valid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                message: "Password is not complex enough",
              },
            })}
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
          <LoadingButton
            disabled={!isValid}
            loading={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </LoadingButton>
          <Grid container>
            <Grid item>
              {/* <Link to="/login">{"Already have an account? Sign in"}</Link> */}
            </Grid>
          </Grid>
        </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
