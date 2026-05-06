import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as Yup from "yup";

import AuthLayout from "@/components/layouts/AuthLayout";
import TextField from "@/components/ui/Forms/TextField";
import Dialog from "@/components/ui/Dialog";
import services from "@/services";

const signUpFormSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: "",
    message: "",
  });
  const [dialogActions, setDialogActions] = useState([]);

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const onSubmit = async (formValues) => {
    setLoading(true);
    try {
      await services.auth.signUp(formValues);
      navigate("/login");
    } catch (error) {
      setOpenDialog(true);
      setDialogMessage({
        title: "Oops...",
        message: error?.response?.data?.message ?? "Silahkan coba lagi.",
      });
      setDialogActions([
        {
          label: "Okay",
          onClick() {
            setOpenDialog(false);
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper
          sx={{
            padding: 2,
            width: 500,
          }}
        >
          <Typography
            variant="h5"
            component={"h1"}
            align="center"
            marginBottom={2}
          >
            Daftar Baru
          </Typography>
          <Stack
            flexDirection={"column"}
            gap={1}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField id="name" label={"Name"} control={control} name="name" />
            <TextField
              id="email"
              label={"Email"}
              control={control}
              name="email"
            />
            <TextField
              id="password"
              label={"Password"}
              control={control}
              name="password"
              secureText
            />
            <TextField
              id="confirmPassword"
              label={"Confirm Password"}
              control={control}
              name="confirmPassword"
              secureText
            />
            <Button
              type="submit"
              variant="contained"
              loading={loading}
              fullWidth
            >
              Buat akun baru
            </Button>
            <Button
              type="button"
              variant="text"
              onClick={() => navigate("/login")}
              fullWidth
            >
              Sudah punya akun? Masuk
            </Button>
          </Stack>
        </Paper>
        <Dialog open={openDialog} actions={dialogActions} {...dialogMessage} />
      </Box>
    </AuthLayout>
  );
};

export default SignUp;
