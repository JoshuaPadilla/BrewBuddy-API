import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderActivityCard from "@/components/order_activity_card";
import OrdersInsightsCard from "@/components/staff_components/orders_insights_card";
import { useOrderStore } from "@/store/useOrders";
import IncomingOrderCard from "@/components/staff_components/incoming_order_card";
import CustomButton from "@/components/custom_button";
import OnProcessOrderCard from "@/components/staff_components/onprocess_order_card";

const OrdersScreen = () => {
  const {
    staffOrders,
    getAllOrders,
    moveItemToProcessing,
    completeOrder,
    isCompleting,
  } = useOrderStore();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllOrders();
    }, 200); // 5000 milliseconds = 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [refresh, staffOrders.length]);

  const orderOnProcess = staffOrders.filter(
    (order) => order.status === "processing"
  );
  const pendingOrder = staffOrders.filter(
    (order) => order.status === "pending"
  );
  const completedOrders = staffOrders.filter(
    (order) => order.status === "completed"
  );

  const handleAddProcess = () => {
    if (pendingOrder.length < 1) return;

    moveItemToProcessing(pendingOrder.at(0)?._id || "");
    setRefresh((prev) => !prev);
  };

  const handleOnCompleteOrder = async (orderID: string) => {
    completeOrder(orderID);
    setRefresh((prev) => !prev);
  };

  return (
    <SafeAreaView className="flex-1 px-6 py-8 bg-background">
      <Text className="font-jomhuria-regular text-primary-100 text-5xl">
        BrewBuddy.
      </Text>

      <View className="flex-row justify-between mb-6">
        <OrdersInsightsCard
          quantity={pendingOrder.length}
          title="Pending Orders"
          bgColor="bg-status-pending"
        />
        <OrdersInsightsCard
          quantity={completedOrders.length}
          title="Completed Orders"
          bgColor="bg-status-completed"
        />
      </View>

      {/* Order queue */}
      <Text className="font-poppins-medium text-black-100 text-lg mb-2">
        Order queue:
      </Text>

      <View className="mb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="pr-[100px] gap-2 overflow-visible"
        >
          {pendingOrder.length >= 1 ? (
            pendingOrder.map((order, index) => {
              return (
                <IncomingOrderCard
                  order={order}
                  key={index}
                  isNext={index === 0}
                />
              );
            })
          ) : (
            <View className="w-full items-center justify-center p-8">
              <Text className="font-poppins-medium text-black-100/50 text-xl">
                No Incoming Orders
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="font-poppins-medium text-black-100 text-lg mb-4">
            Proccessing Orders: {orderOnProcess.length}
          </Text>

          <CustomButton title="Add Process" onPress={handleAddProcess} />
        </View>

        <ScrollView
          contentContainerClassName="gap-2 pb-[70px]"
          showsVerticalScrollIndicator={false}
        >
          {isCompleting && (
            <ActivityIndicator
              className="p-16"
              color="#73C088"
              size={"large"}
            />
          )}

          {orderOnProcess.map((order, index) => (
            <OnProcessOrderCard
              order={order}
              key={index}
              onComplete={() => handleOnCompleteOrder(order._id)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrdersScreen;
