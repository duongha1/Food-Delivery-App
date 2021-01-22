import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirection from 'react-native-maps-directions'

import {COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY} from '../constants'

const OrderDelivery = ({route, navigation}) =>{

    const mapView = React.useRef()

    const [restaurant, setRestaurant] = React.useState(null)
    const [streetName, setStreetName] = React.useState("")
    const [fromLocation, setFromLocation] = React.useState(null)
    const [toLocation, setToLocation] = React.useState(null)
    const [region, setRegion] = React.useState(null)

    const [duration, setDuration] = React.useState(0)
    const [isReady, setIsReady] = React.useState(false)
    const [angle, setAngle] = React.useState(0)

    React.useEffect(()=>{
        let {restaurant, currentLocation} = route.params;

        let fromLoc = currentLocation.gps
        let toLoc= restaurant.location 
        let street = currentLocation.streetName

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude)/2,
            longitude: (fromLoc.longitude + toLoc.longitude)/2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude)*2,
            longitudeDelta: Math.abs(fromLoc.longitude-toLoc.longitude)*2
        }

        setRestaurant(restaurant)
        setStreetName(street)
        setFromLocation(fromLoc)
        setToLocation(toLoc)
        setRegion(mapRegion)
    },[])

    function renderMap(){
        const destinationMarker = ()=>{
            <Marker
                coordinate={toLocation}
            >
                <View
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: COLORS.white
                    }}
                >
                    <View
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: COLORS.primary
                        }}
                    >
                        <Image
                            source={icons.pin}
                            style={{
                                width:25,
                                height: 25,
                                tintColor: COLORS.white
                            }}
                        />
                    </View>
                </View>
            </Marker>
        }

        const carIcon=()=>{
            return (
                <Marker
                    coordinate={fromLocation}
                    anchor={{x: 0.5, y:0.5}}
                    flat={true}
                >
                    <Image
                        source={icons.car}
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />
                </Marker>
            )
        }

        return (
            <View style={{flex: 1}}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    style={{flex: 1}}
                >
                    <MapViewDirection
                        ref={mapView} 
                        origin={fromLocation}
                        destination={toLocation}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor={COLORS.primary}
                        optimizeWaypoints={true}
                        onReady={result =>{
                            setDuration(result.duration)
                            if(!isReady){
                                //Fit route into maps
                            }
                        }} //delivery time
                    />
                    {destinationMarker()}
                    {carIcon()}
                </MapView>
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>
            {renderMap()}
        </View>
    )
}
export default OrderDelivery;