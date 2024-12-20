import { NextResponse } from "next/server";

const DISCORD_API_URL = "https://discord.com";

async function exchangeCode(code: string) {
  const redirectUri = `${process.env.NEXTAUTH_URL}/user`;

  const params = new URLSearchParams({
    client_id: process.env.DISCORD_APPLICATION_ID!,
    client_secret: process.env.DISCORD_API_TOKEN!,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri
  });

  try {
    const response = await fetch(`${DISCORD_API_URL}/api/v10/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Token exchange failed", {
        status: response.status,
        error: responseData.error,
        error_description: responseData.error_description
      });
      throw new Error(responseData.error_description || responseData.error);
    }

    return responseData;
  } catch (error) {
    console.error(
      "Exchange error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }
}

async function getUserInfo(access_token: string) {
  try {
    const response = await fetch(`${DISCORD_API_URL}/api/users/@me`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user info: ${
          data.message || `HTTP ${response.status}`
        }`
      );
    }

    return data;
  } catch (error) {
    console.error(
      "User info error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code is required" },
        { status: 400 }
      );
    }

    const tokenData = await exchangeCode(code);

    if (!tokenData.access_token) {
      throw new Error("No access token received");
    }

    const userInfo = await getUserInfo(tokenData.access_token);

    const response = NextResponse.json({
      user: {
        id: userInfo.id,
        username: userInfo.username,
        global_name: userInfo.global_name,
        avatar: userInfo.avatar
      }
    });

    return response;
  } catch (error) {
    console.error(
      "Auth error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      {
        error: "Authentication failed",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
