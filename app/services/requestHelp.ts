import { authenticator } from "./auth.server";

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
  const user = await authenticator.isAuthenticated(request);

  const subject = `Reset for ${homeroom} in room ${roomNumber}`;
  const email = `
  Automated reset request created by https://reset.empacadmusic.org:

  ${description}
  `;
};
