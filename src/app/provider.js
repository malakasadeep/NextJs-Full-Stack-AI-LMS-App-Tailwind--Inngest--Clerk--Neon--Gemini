"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { db } from "../../configs/db";
import { eq } from "drizzle-orm";
import { USER_TABLE } from "../../configs/schema";

export default function Provider({ children }) {
  const { user } = useUser();

  useEffect(() => {
    user && CheckIsNewUser();
  }, [user]);

  const CheckIsNewUser = async () => {
    //check user already exists
    const result = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    //if not exists, then create user
    if (result?.length == 0) {
      const userResp = await db
        .insert(USER_TABLE)
        .values({
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
        })
        .returning({ id: USER_TABLE.id });
      console.log(userResp);
    }
  };
  return <div>{children}</div>;
}
