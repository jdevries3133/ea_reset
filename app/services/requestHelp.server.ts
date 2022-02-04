import { redirect } from "remix";
import { getContact, HOMEROOM_TO_ROOM_MAPPING } from "~/constants";
import { authenticator } from "./auth.server";
import { getClient } from "./gmail.service";

export const requestHelp = async (
  request: Request,
  {
    homeroom,
    roomNumber,
    description,
  }: {
    homeroom: keyof typeof HOMEROOM_TO_ROOM_MAPPING;
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
To: ${getContact(homeroom).join(", ")}
From: me
Subject: Reset in homeroom ${homeroom}, room ${roomNumber}

${description}


Automated reset request created by https://reset.empacadmusic.org:
`;

  console.log("sending email");
  console.log(email);

  // commenting out to avoid sending a real email
  //
  // await client.users.messages.send({
  //   userId: user.googleExtras.id,
  //   requestBody: {
  //     raw: btoa(email),
  //   },
  // });
};
