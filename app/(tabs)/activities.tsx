import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TabSelect from "@/components/tab_select";
import { useOrderStore } from "@/store/useOrders";
import OrderActivityCard from "@/components/order_activity_card";

const ACTIVITY_OPTIONS = ["ON GOING", "COMPLETED"];

const Activities = () => {
  const { orders, getAllOrders } = useOrderStore();

  const [filter, setFilter] = useState("ON GOING");

  const filteredOrders =
    filter === "ON GOING"
      ? orders.filter(
          (order) =>
            order.status !== "cancelled" && order.status !== "completed"
        )
      : orders.filter(
          (order) => order.status !== "pending" && order.status !== "processing"
        );

  useEffect(() => {
    getAllOrders();
  }, [filter]);

  return (
    <SafeAreaView className="flex-1 gap-8">
      <TabSelect
        options={ACTIVITY_OPTIONS}
        selected={filter}
        setSelected={(value) => setFilter(value)}
      />

      <ScrollView contentContainerClassName="pb-[100px] px-6 gap-2">
        {filteredOrders.length > 0 &&
          filteredOrders.map((order, index) => (
            <OrderActivityCard key={index} order={order} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activities;
