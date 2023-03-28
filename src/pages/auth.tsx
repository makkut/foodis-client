import Layout from "@/components/Layout/Layout";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const AuthPage: NextPage = () => {
  const router = useRouter();
  function validateName(value: any) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    // else if (value.toLowerCase() !== "naruto") {
    //   error = "Jeez! You're not a fan 😱";
    // }
    return error;
  }
  return (
    <Layout title="Auth" description="Russian Foodies, Panama">
      <div className="flex justify-center items-center mt-10">
        <div className="w-[300px] ">
          <Formik
            initialValues={{ name: "", password: "" }}
            onSubmit={async (values, actions) => {
              const result = await signIn("credentials", {
                redirect: false,
                email: values.name,
                password: values.password,
              });
              if (result?.ok) {
                router.replace("/profile");
                return;
              }
              alert("Credential is not valid");
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form>
                <Field name="name" validate={validateName}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel>First name</FormLabel>
                      <Input {...field} placeholder="name" type="email" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password" validate={validateName}>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel>Password</FormLabel>
                      <Input
                        {...field}
                        placeholder="password"
                        type="password"
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};
export default AuthPage;

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (session == null) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: true,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };
