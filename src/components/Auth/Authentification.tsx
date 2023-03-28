import { FC } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import AuthRegButton from "../ui/auth-reg-button/AuthRegButton";

function validateName(value: any) {
  let error;
  if (!value) {
    error = "Field is required";
  }
  return error;
}

const Authentification: FC = () => {
  const router = useRouter();
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, actions) => {
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
        }}
      >
        {(props) => (
          <Form>
            <Field name="email" validate={validateName}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel className="mb-0">Email</FormLabel>
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
            <AuthRegButton type="submit">Log In</AuthRegButton>
            {/* <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button> */}
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Authentification;
