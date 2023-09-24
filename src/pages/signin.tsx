import GoogleButton from "@/components/GoogleButton";
import Layout from "@/components/Layout/Layout";
import AuthRegButton from "@/components/ui/auth-reg-button/AuthRegButton";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Typography } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { signUp } from "next-auth-sanity/client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import router from "next/router";

export default function Signin() {
  function validateName(value: any) {
    let error;
    if (!value) {
      error = "Field is required";
    }
    return error;
  }

  return (
    <Layout title="Shop" description="Russian Foodies, Panama">
      <div className="text-center">
        <Typography variant="h3" textAlign="center">
          SignIn
        </Typography>
        <GoogleButton />

        <Formik
          initialValues={{ email: "", password: "", username: "" }}
          onSubmit={async (values, actions) => {
            //   debugger;
            //   try {
            //     const { data } = await axios.post("/api/users/register", {
            //       name: values.username,
            //       email: values.email,
            //       password: values.password,
            //     });
            //     console.log("data", data);
            //     router.push("/");
            //   } catch (err) {}
            // }

            await signUp({
              email: values.email,
              password: values.password,
              name: values.username,
            });
          }}
        >
          {(props) => (
            <Form>
              <Field name="username" validate={validateName}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel className="!mb-0">Username</FormLabel>
                    <Input {...field} placeholder="username" type="text" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email" validate={validateName}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel className="!mb-0 !mt-1">Email</FormLabel>
                    <Input {...field} placeholder="email" type="email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password" validate={validateName}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel className="!mb-0 !mt-1">Password</FormLabel>
                    <Input {...field} placeholder="password" type="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <AuthRegButton type="submit">Registration</AuthRegButton>
            </Form>
          )}
        </Formik>

        <Formik
          initialValues={{ email: "", password: "", username: "" }}
          onSubmit={async (values, actions) => {
            //   debugger;
            //   try {
            //     const { data } = await axios.post("/api/users/register", {
            //       name: values.username,
            //       email: values.email,
            //       password: values.password,
            //     });
            //     console.log("data", data);
            //     router.push("/");
            //   } catch (err) {}
            // }
            await signIn("sanity-login", {
              redirect: false,
              email: values.email,
              password: values.password,
            });
          }}
        >
          {(props) => (
            <Form>
              <Field name="email" validate={validateName}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel className="!mb-0 !mt-1">Email</FormLabel>
                    <Input {...field} placeholder="email" type="email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password" validate={validateName}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel className="!mb-0 !mt-1">Password</FormLabel>
                    <Input {...field} placeholder="password" type="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <AuthRegButton type="submit">Login</AuthRegButton>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}
