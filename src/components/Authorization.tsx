import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { fetcher } from "../pages/lib/api";
import { setToken, unsetToken } from "../pages/lib/auth";
import { useUser } from "../pages/lib/authContext";

const Authorization = () => {
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const { user, loading } = useUser();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const responseData = await fetcher(`http://127.0.0.1:1337/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: data.identifier,
        password: data.password,
      }),
    });
    console.log(responseData);
    setToken(responseData);
  };

  const logout = () => {
    unsetToken();
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
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
    <div className="flex justify-center">
      {/* <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          name="identifier"
          onChange={handleChange}
          placeholder="Username"
          className="md:p-2 form-input py-2 rounded mx-2"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          className="md:p-2 form-input py-2 rounded mx-2"
          required
        />

        <button
          className="md:p-2 rounded py-2 text-black bg-purple-200 p-2"
          type="submit"
        >
          Login
        </button>
      </form> */}
      <div className="w-[60%]">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Field name="email" validate={validateName}>
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>E-mail</FormLabel>
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
                    <FormLabel>Password</FormLabel>
                    <Input {...field} placeholder="password" type="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
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
  );
};

export default Authorization;
