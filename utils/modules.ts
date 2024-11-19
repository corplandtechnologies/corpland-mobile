import * as Location from "expo-location";

export const getUserLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert(
      "Please, We need your location to provide you with the best possible services!"
    );
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  return location;
};

export const getUserCountry = async (location: any) => {
  let address = await Location.reverseGeocodeAsync(location.coords);
  let country = address[0].country;
  return country;
};
