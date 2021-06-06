import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const JobComplete = ({ route, navigation }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState(
    "https://uonam1hug0i75oy12t2nhi2t-wpengine.netdna-ssl.com/wp-content/uploads/2019/01/image-placeholder-500x500.jpg"
  );
  const [disable, setDisable] = useState(true);

  const { id } = route.params;

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      compressImageQuality: 0.25,
    })
      .then((image) => {
        console.log(image);
        setImage(image.path);
      })
      .then(() => setDisable(false));
  };

  const uploadPhoto = async (path, imageName) => {
    try {
      setIsUploading(true);
      const reference = storage().ref(
        `Job Images/${imageName}`
      );
      await reference.putFile(path);
      console.log("Uploaded");
      await firestore().collection("jobs").doc(id).update({ completed: true, completionDate: new Date() });
      await navigation.navigate("Home");
      setIsUploading(false);
    } catch (e) {
      console.log(e);
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        {isUploading === true ? (
          <ActivityIndicator color="black" />
        ) : (
          <Image
            source={{
              uri: image,
              width: width,
              height: height / 2,
            }}
          />
        )}
      </View>
      <View style={styles.lower}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            takePhotoFromCamera();
          }}
        >
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disable}
          style={[styles.button, disable ? { backgroundColor: "gray" } : {}]}
          onPress={() => {
            uploadPhoto(
              image,
              route.params.id
            );
          }}
        >
          <Text style={styles.buttonText}>Complete Job</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" backgroundColor="#D0F6F9" />
    </View>
  );
};

export default JobComplete;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafeff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  upper: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  lower: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    padding: 20,
  },
  loadingIndicator: {
    zIndex: 5,
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#0095F6",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 6,
    elevation: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "white",
    lineHeight: 15,
  },
});
