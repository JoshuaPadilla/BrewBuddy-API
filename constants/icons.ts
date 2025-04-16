import { ImageSourcePropType } from "react-native";

import tab_account from "@/assets/icons/tab_icons/tab_account.png";
import tab_activities from "@/assets/icons/tab_icons/tab_activities.png";
import tab_cart from "@/assets/icons/tab_icons/tab_cart.png";
import tab_home from "@/assets/icons/tab_icons/tab_home.png";
import clock from "@/assets/icons/util_icons/icon_clock.png";
import search from "@/assets/icons/util_icons/search_icon.png";
import signin_email from "@/assets/icons/util_icons/signin_email.png";
import signin_password from "@/assets/icons/util_icons/signin_password.png";
import add_to_cart_icon from "@/assets/icons/util_icons/add_to_cart_icon.png";
import trash_icon from "@/assets/icons/util_icons/trash_icon.png";
import check_icon from "@/assets/icons/util_icons/check_icon.png";

interface TabIconsProps {
  tab_account: ImageSourcePropType;
  tab_activities: ImageSourcePropType;
  tab_cart: ImageSourcePropType;
  tab_home: ImageSourcePropType;
}

interface UtilIconsProps {
  clock: ImageSourcePropType;
  search: ImageSourcePropType;
  signin_email: ImageSourcePropType;
  signin_password: ImageSourcePropType;
  add_to_cart_icon: ImageSourcePropType;
  trash_icon: ImageSourcePropType;
  check_icon: ImageSourcePropType;
}

export const util_icons: UtilIconsProps = {
  clock,
  search,
  signin_email,
  signin_password,
  add_to_cart_icon,
  trash_icon,
  check_icon,
};

export const tab_icons: TabIconsProps = {
  tab_account,
  tab_activities,
  tab_cart,
  tab_home,
};
