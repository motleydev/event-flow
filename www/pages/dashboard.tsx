import React from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const DynamicStreamingRegistrants = dynamic(
  () => import("../components/streamingRegistrants/StreamingRegistrants"),
  { ssr: false }
);

const DynamicLiveRegistrants = dynamic(
  () => import("../components/liveRegistrants/LiveRegistrants"),
  { ssr: false }
);

const Dashboard: NextPage = () => {
  return (
    <div>
      <DynamicLiveRegistrants />
      <DynamicStreamingRegistrants />
    </div>
  );
};

export default Dashboard;
