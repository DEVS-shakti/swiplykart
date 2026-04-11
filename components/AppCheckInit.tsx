"use client";

import { useEffect } from "react";

import { initFirebaseAppCheck } from "@/firebase/client";

export function AppCheckInit() {
  useEffect(() => {
    initFirebaseAppCheck();
  }, []);
  return null;
}
