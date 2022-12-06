import './App_layerstack.css';
import { useEffect, useState, useRef } from 'react';
import LayerStack from './components/LayerStack';
import Map from './components/Map';
import layerStackBuilder from './models/layerStackModel';
import LayerFormCard from './components/LayerFormCard';
import { Layer } from 'leaflet';
import mapStyles from './models/mapStyles';

import allLayers from './models/allLayers';
import getFeatures from './models/getFeatures';

import L from 'leaflet';

function App() {
    const [showCities, setShowCities] = useState(true);
    const [showParkings, setShowParkings] = useState(true);
    const [showChargingStations, setShowChargingStations] = useState(true);
    const [showZones, setShowZones] = useState(true);
    const [showBikes, setShowBikes] = useState(true);
    const [containerArray, setContainerArray] = useState(null);
    const [activateDraw, setActivateDraw] = useState(false);
    const drawnItems = new L.FeatureGroup();
    const dataFromBackend = {};

    console.log('activate draw', activateDraw);

    useEffect(() => {
        const props = {
            showCities: showCities,
            showParkings: showParkings,
            showChargingStations: showChargingStations,
            showZones: showZones,
            showBikes: showBikes,
            setShowCities: setShowCities,
            setShowParkings: setShowParkings,
            setShowChargingStations: setShowChargingStations,
            setShowZones: setShowZones,
            setShowBikes: setShowBikes,
            setActivateDraw: setActivateDraw,
            drawnItems: drawnItems,
        };

        const containerArray = layerStackBuilder(props);

        setContainerArray(containerArray);
    }, []);

    useEffect(() => {
        (async () => {
            dataFromBackend.cities = await getFeatures.getCities();

            for (const city of dataFromBackend.cities) {
                allLayers.cities.addLayer(
                    L.geoJson(city.position, {
                        style: mapStyles.city,
                    })
                );
            }
        })();

        return () => allLayers.cities.clearLayers();
    }, []);
    useEffect(() => {
        (async () => {
            dataFromBackend.chargingStations =
                await getFeatures.getChargingStations();

            for (const charger of dataFromBackend.chargingStations) {
                console.log('CHARGER ', charger);
                allLayers.chargingStations.addLayer(
                    L.geoJson(charger.position, {
                        pointToLayer: function (feature, latlng) {
                            return L.marker(latlng, mapStyles['charger']);
                        },
                    })
                );
            }
        })();

        return () => allLayers.chargingStations.clearLayers();
    }, []);
    useEffect(() => {
        (async () => {
            dataFromBackend.parkingLots = await getFeatures.getParkingLots();

            for (const parking of dataFromBackend.parkingLots) {
                allLayers.parkingLots.addLayer(
                    L.geoJson(parking.position, {
                        style: mapStyles.parking,
                    })
                );
            }
        })();

        return () => allLayers.parkingLots.clearLayers();
    }, []);
    useEffect(() => {
        (async () => {
            dataFromBackend.bikes = await getFeatures.getBikes();
        })();
    }, []);
    useEffect(() => {
        (async () => {
            dataFromBackend.workshops = await getFeatures.getWorkshops();
        })();
    }, []);
    useEffect(() => {
        (async () => {
            dataFromBackend.zones = await getFeatures.getZones();

            for (const zone of dataFromBackend.zones) {
                allLayers.zones.addLayer(
                    L.geoJson(zone.position, {
                        style: mapStyles.zone,
                    })
                );
            }
        })();

        return () => allLayers.zones.clearLayers();
    }, []);
    useEffect(() => {
        (async () => {
            dataFromBackend.points = await getFeatures.getPoints();
        })();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div className="App-left">
                    <LayerStack
                        components={containerArray}
                        setActivateDraw={setActivateDraw}
                        drawnItems={drawnItems}
                    />
                </div>
                <div className="App-right">
                    <Map
                        showCities={showCities}
                        showParkings={showParkings}
                        showChargingStations={showChargingStations}
                        showZones={showZones}
                        showBikes={showBikes}
                        activateDraw={activateDraw}
                        drawnItems={drawnItems}
                        dataFromBackend={dataFromBackend}
                    />
                </div>
            </header>
        </div>
    );
}

export default App;
