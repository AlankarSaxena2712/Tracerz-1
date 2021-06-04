import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Linking,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { getPreciseDistance } from "geolib";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = (width / height) * 2;
const LATITUDE_DELTA = 0.002;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Job = ({ route, navigation }) => {
  const [distance, setDistance] = useState();
  const [location, setLocation] = useState(null);

  const jobMapRef = useRef();

  const {
    id,
    title,
    description,
    latitude,
    longitude,
    date,
    completed,
  } = route.params;

  let coordinatesArray = [
    {
      latitude: latitude,
      longitude: longitude,
    },
  ];

  const googleLocation = `${latitude},${longitude}`;

  const url = Platform.select({
    ios: `maps:${googleLocation}`,
    android: `geo:${googleLocation}?center=${googleLocation}&q=${googleLocation}&z=16`,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({ accuracy: 6 });
      setLocation(loc);
      coordinatesArray.push({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      let dis = getPreciseDistance(loc.coords, {
        latitude: latitude,
        longitude: longitude,
      });
      setDistance(dis);
      if (dis > 100) {
        jobMapRef.current.fitToCoordinates(coordinatesArray, {
          edgePadding: { top: 25, right: 25, bottom: 25, left: 25 },
          animated: true,
        });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <MapView
          ref={jobMapRef}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Circle
            center={{
              latitude: latitude,
              longitude: longitude,
            }}
            radius={100}
            strokeWidth={2}
            strokeColor={"#0AB5C2"}
            fillColor={"rgba(10,181,194,0.25)"}
          />
          <Marker
            title="Job"
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          />
        </MapView>
      </View>
      <ScrollView style={styles.lower}>
        <View style={styles.card}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.description}>{date}</Text>
          <Text
            numberOfLines={1}
            style={completed ? styles.completed : styles.pending}
          >
            {completed ? "COMPLETED" : "PENDING"}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking.openURL(url);
            }}
          >
            <Text style={styles.buttonText}>Navigate</Text>
          </TouchableOpacity>
          {completed === false ? (
            <TouchableOpacity
              disabled={distance && distance < 100 ? false : true}
              style={[styles.button, distance < 100 ? {} : { backgroundColor: "gray" }]}
              onPress={() => {
                navigation.navigate("JobComplete", {
                  id: id,
                  title: title,
                  date: date,
                  completed: completed,
                });
              }}
            >
              <Text style={styles.buttonText}>Punch In</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#D0F6F9" />
    </View>
  );
};

export default Job;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  map: {
    height: "100%",
    width: "100%",
  },
  upper: {
    height: "55%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lower: {
    elevation: 5,
    width: "100%",
  },
  card: {
    width: "100%",
    elevation: 5,
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 30,
  },
  completed: {
    marginVertical: 10,
    color: "#08D066",
    fontWeight: "bold",
  },
  pending: {
    marginVertical: 10,
    color: "#F3363C",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: "black",
    marginBottom: 10,
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
