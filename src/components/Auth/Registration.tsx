import { FC } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import AuthRegButton from "../ui/auth-reg-button/AuthRegButton";

function validateName(value: any) {
  let error;
  if (!value) {
    error = "Field is required";
  }
  return error;
}

const Registration: FC = () => {
  const router = useRouter();
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={async (values, actions) => {
          try {
            const responseData = await axios.post(
              `${process.env.API_URL}/api/auth/local/register`,
              {
                email: values.email,
                password: values.password,
                username: values.username,
              }
            );
            debugger;
            console.log("responseData", responseData);
            if (responseData.status == 200) {
              const result = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
              });
              if (result?.ok) {
                router.replace("/profile");
                return;
              }
              alert("email/password is not valid");
              actions.setSubmitting(false);
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {(props) => (
          <Form>
            <Field name="username" validate={validateName}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel className="mb-0">Username</FormLabel>
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
                  <FormLabel className="mb-0 mt-1">Email</FormLabel>
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
                  <FormLabel className="mb-0 mt-1">Password</FormLabel>
                  <Input {...field} placeholder="password" type="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <AuthRegButton type="submit">Registration</AuthRegButton>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Registration;