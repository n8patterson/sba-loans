import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

export default withMiddlewareAuthRequired();

// TODO: If need to only protect certain routes, use the following:
// export const config = {
//   matcher: ["/"],
// };
