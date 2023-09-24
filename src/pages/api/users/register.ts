import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import bcrypt from "bcryptjs";
import axios from "axios";
import { config } from "../../../../sanity.config";
import { signToken } from "../../../../utils/auth";
import { client } from "../../../../utils/sanity.client";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  debugger;
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  const createMutations = [
    {
      create: {
        _type: "user",
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        // isAdmin: false,
      },
    },
  ];
  const existUser = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    {
      email: req.body.email,
    }
  );
  if (existUser) {
    return res.status(401).send({ message: "Email aleardy exists" });
  }

  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutations },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );
  console.log(data);
  const userId = data.results[0].id;
  const user = {
    _id: userId,
    name: req.body.name,
    email: req.body.email,
    // isAdmin: false,
  };
  console.log(user);
  const token = signToken(user);
  res.send({ ...user, token });
});

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
