import "server-only";

import {
  createHmac,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";
import { DatabaseConfigurationError } from "./leads";

export const ADMIN_COOKIE_NAME = "vice_admin_session";
const SESSION_LIFETIME_SECONDS = 60 * 60 * 8;

function sessionSecret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) {
    throw new DatabaseConfigurationError(
      "ADMIN_SESSION_SECRET is not configured.",
    );
  }
  return value;
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

export function createAdminSessionToken(username: string) {
  const payload = Buffer.from(
    JSON.stringify({
      sub: username,
      exp: Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS,
    }),
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token) return false;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return false;

  const expected = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return false;
  }

  try {
    const value = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { sub?: unknown; exp?: unknown };
    return (
      value.sub === process.env.ADMIN_USERNAME &&
      typeof value.exp === "number" &&
      value.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export function verifyAdminPassword(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const encodedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedUsername || !encodedHash) {
    throw new DatabaseConfigurationError(
      "Admin credentials are not configured.",
    );
  }

  const parts = encodedHash.split(":");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;
  const [, costValue, blockSizeValue, parallelizationValue, salt, hash] = parts;
  const cost = Number(costValue);
  const blockSize = Number(blockSizeValue);
  const parallelization = Number(parallelizationValue);
  if (!cost || !blockSize || !parallelization || !salt || !hash) return false;

  const derived = scryptSync(password, salt, Buffer.from(hash, "base64url").length, {
    N: cost,
    r: blockSize,
    p: parallelization,
  });
  const expected = Buffer.from(hash, "base64url");

  return username === expectedUsername && timingSafeEqual(derived, expected);
}

export const adminCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: SESSION_LIFETIME_SECONDS,
};
