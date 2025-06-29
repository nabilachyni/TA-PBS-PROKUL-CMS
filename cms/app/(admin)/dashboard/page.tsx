import LineChart from "@/components/chart/LineChart";
import StatsChart from "@/components/chart/StatsChart";
import RecentOrders from "@/components/orders/RecentOrders";
import SideBar from "@/components/sidebar/SideBar";
import React from "react";

function page() {
  return (
    <>
      <div className="px-10 py-5">
        <StatsChart />
      </div>
      <div className="px-10 py-5">
        <LineChart />
      </div>
      <div className="px-10 py-5 ">
        <RecentOrders />
      </div>
    </>
  );
}

export default page;
