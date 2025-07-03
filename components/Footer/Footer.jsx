import { s } from "../../App.style.js";

import { Text, View, Linking, TouchableOpacity } from "react-native";

export function Footer({icon}) {



  const openLink = () => {
    Linking.openURL("https://ko-fi.com/fkissling").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <>
      <View style={[s.footerContainer, { backgroundColor: icon === "practice" || icon === "practiceFeedback" ?  "#e0e8e8": "white" }]}>
       
      
          <Text style={s.footerText}>©2022 F. Kissling</Text>
      
      </View>
    </>
  );
}
