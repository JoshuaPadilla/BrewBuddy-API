import { ImageSourcePropType } from "react-native";
import banner from "../assets/images/welcome_banner.png";
import p1 from "../assets/images/p1.png";
import logo from "../assets/images/logo.png";
import logo_green from "../assets/images/logo_green.png";
import sample_avatar from "../assets/images/sample_avatar.png";

interface ImagesProps {
  banner: ImageSourcePropType;
  p1: ImageSourcePropType;
  logo: ImageSourcePropType;
  logo_green: ImageSourcePropType;
  sample_avatar: ImageSourcePropType;
}

export const images: ImagesProps = {
  banner,
  p1,
  logo,
  logo_green,
  sample_avatar,
};
