// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  GetEmailData,
  GetEmailDataQuery,
  GetEmailDataQueryVariables,
  SendEmail,
  SendEmailMutation,
  SendEmailMutationVariables,
} from "../../generated/graphql";
import { client } from "../../utils/client";

type Data = {
  message?: string;
  name?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug, id } = req.body;

  const emailData = await client
    .query<GetEmailDataQuery, GetEmailDataQueryVariables>(GetEmailData, {
      id,
    })
    .toPromise()
    .then((d) => {
      if (d.error) {
        console.log(d.error.graphQLErrors);
        res.status(400).json({ message: "broken fetching user data" });
      }

      if (d.data) {
        return d.data.login_request_by_pk;
      }
    });

  const data = await client
    .mutation<SendEmailMutation, SendEmailMutationVariables>(SendEmail, {
      from: "jesse@hasura.io",
      name: emailData?.user.name!,
      slug: emailData?.slug!,
      to: emailData?.user.email!,
    })
    .toPromise()
    .then((d) => {
      if (d.error) {
        console.log(d.error.graphQLErrors);
        res.status(400).json({ message: "broken sending email" });
      }

      if (d.data) {
        res.status(200).json({ message: "ok" });
      }
    });
}
