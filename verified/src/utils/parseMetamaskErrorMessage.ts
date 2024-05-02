import { capitalize } from "lodash/fp";

/**
 * Metamask returns a bunch of data in the error message. We onlt need the message.
 **/
export const parseMetamaskErrorMessage = (message: string) => {
  const resolvedMessage = /^\s*(?<message>\S.*\S)\s*\(.*\)$/.exec(message)?.groups?.message;
  return resolvedMessage ? capitalize(resolvedMessage) : message;
}
