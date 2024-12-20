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

  console.log("Making token exchange request with:", {
    client_id: process.env.DISCORD_APPLICATION_ID!,
    client_secret: process.env.DISCORD_API_TOKEN!,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri
  });

  try {
    // const response = await fetch(`${DISCORD_API_URL}/api/v10/oauth2/token`, {
    const response = await fetch(`${DISCORD_API_URL}/api/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    console.log("response: ", response);

    // Store response data immediately
    const responseData = await response.json().catch((e) => {
      console.error("Failed to parse response:", e);
      return null;
    });

    // console.log("Discord response status:", response.status);

    if (!response.ok) {
      console.error("Discord error response:", responseData);
      throw new Error(
        `Token exchange failed: ${
          responseData?.error_description ||
          responseData?.error ||
          `HTTP ${response.status}`
        }`
      );
    }

    if (!responseData) {
      throw new Error("Failed to get token data from Discord");
    }

    return responseData;
  } catch (error) {
    console.error("Detailed error in exchangeCode:", {
      error,
      env: {
        hasClientId: !!process.env.DISCORD_APPLICATION_ID,
        hasClientSecret: !!process.env.DISCORD_API_TOKEN,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL
      }
    });
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
    console.error("Error in getUserInfo:", error);
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
    console.log("Token exchange successful");

    const userInfo = await getUserInfo(tokenData.access_token);
    console.log("User info fetched successfully");

    const response = NextResponse.json({
      user: {
        id: userInfo.id,
        username: userInfo.username,
        global_name: userInfo.global_name,
        avatar: userInfo.avatar
      }
    });

    response.cookies.set("discord_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokenData.expires_in
    });

    if (tokenData.refresh_token) {
      response.cookies.set("discord_refresh_token", tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60
      });
    }

    return response;
  } catch (error) {
    console.error("Discord callback error:", error);
    return NextResponse.json(
      {
        error: "Authentication failed",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
