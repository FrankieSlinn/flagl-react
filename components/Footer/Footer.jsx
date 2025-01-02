import { s } from "../../App.style.js";

import { Text, View, Linking, TouchableOpacity } from "react-native";

export function Footer({icon}) {

console.log("icon showing in footer", icon)

  const openLink = () => {
    Linking.openURL("https://ko-fi.com/fkissling").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <>
      <View style={[s.footerContainer, { backgroundColor: icon === "practice" || icon === "practiceFeedback" ?  "#e0e8e8": "white" }]}>
        <TouchableOpacity onPress={openLink}>
          <Text style={s.footerText}>
            {" "}
            &#x1F496; FLAGL? <Text style={s.footerLink}>Buy Me A Coffee</Text>.
          </Text>
          <Text style={s.footerText}>©2022 F. Kissling</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
