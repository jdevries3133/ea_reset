import { redirect } from "remix";
import { authenticator } from "./auth.server";
import { getClient } from "./gmail.service";

export const requestHelp = async (
  request: Request,
  {
    homeroom,
    roomNumber,
    description,
  }: {
    homeroom: string;
    roomNumber: string;
    description: string;
  }
) => {
  const user = <GmailUser>await authenticator.isAuthenticated(request);

  let client;
  if (user) {
    client = getClient(user);
  } else {
    throw redirect("/login");
  }

  const email = `Content-Type: text/plain; charset="UTF-8"
"MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
To: jdevries3133@gmail.com
From: me
Subject: Reset in ${homeroom}, room ${roomNumber}

${description}
Automated reset request created by https://reset.empacadmusic.org:
`;

  const res = await client.users.messages.send({
    userId: user.googleExtras.id,
    requestBody: {
      raw: btoa(email),
    },
  });
};
