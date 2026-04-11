"use client";

import { useEffect } from "react";

import { initFirebaseAppCheck } from "@/lib/firebase";

export function AppCheckInit() {
  useEffect(() => {
    initFirebaseAppCheck();
  }, []);
  return null;
}
