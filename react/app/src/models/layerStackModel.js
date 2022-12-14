import LayerAccordion from '../components/LayerAccordion';
import LayerButton from '../components/LayerButton';
import LayerButtonGroup from '../components/LayerButtonGroup';
import LayerSwitch from '../components/LayerSwitch';
import LayerGrid from '../components/LayerGrid';

const layerStackBuilder = (props) => {
    const handleNewButtonClick = (e) => {
        props.setTriggerNewObject(true);
        const button = e.target;
        const container = button.closest('.MuiGrid-container');

        props.setNewObjectContainer(container.getAttribute('id'));
    };
    const handleSearchButtonClick = (e) => {
        //props.setTriggerNewObject(true);
        const button = e.target;
        const container = button.closest('.MuiGrid-container');
        console.log('SÖKKNAPPEN SÄGER ', container.getAttribute('id'));
        props.setSearchForFeature(container.getAttribute('id'));
        props.setOpenSearchForm(true);
    };
    const cityAccordion = (
        <LayerAccordion
            title={'Städer'}
            event={'cityClicked'}
            dad={'stad'}
            setActivateDraw={props.setActivateDraw}
            drawnItems={props.drawnItems}
            triggerRedraw={props.triggerCityRedraw}
            setTriggerRedraw={props.setTriggerCityRedraw}
            triggerNewObject={props.triggerNewObject}
            setTriggerNewObject={props.setTriggerNewObject}
            newObjectContainer={props.newObjectContainer}
            setNewObjectContainer={props.setNewObjectContainer}
            token={props.token}
        />
    );

    const parkingAccordion = (
        <LayerAccordion
            title={'Parkeringar'}
            event={'parkingLotClicked'}
            dad={'parkering'}
            setActivateDraw={props.setActivateDraw}
            drawnItems={props.drawnItems}
            triggerRedraw={props.triggerParkingRedraw}
            setTriggerRedraw={props.setTriggerParkingRedraw}
            triggerNewObject={props.triggerNewObject}
            setTriggerNewObject={props.setTriggerNewObject}
            newObjectContainer={props.newObjectContainer}
            setNewObjectContainer={props.setNewObjectContainer}
            token={props.token}
        />
    );

    const chargingAccordion = (
        <LayerAccordion
            title={'Laddstationer'}
            event={'chargingStationClicked'}
            dad={'ladd'}
            setActivateDraw={props.setActivateDraw}
            drawnItems={props.drawnItems}
            triggerRedraw={props.triggerChargeRedraw}
            setTriggerRedraw={props.setTriggerChargeRedraw}
            triggerNewObject={props.triggerNewObject}
            setTriggerNewObject={props.setTriggerNewObject}
            newObjectContainer={props.newObjectContainer}
            setNewObjectContainer={props.setNewObjectContainer}
            token={props.token}
        />
    );

    const zoneAccordion = (
        <LayerAccordion
            title={'Zoner'}
            event={'zoneClicked'}
            dad={'zone'}
            setActivateDraw={props.setActivateDraw}
            drawnItems={props.drawnItems}
            triggerRedraw={props.triggerZoneRedraw}
            setTriggerRedraw={props.setTriggerZoneRedraw}
            triggerNewObject={props.triggerNewObject}
            setTriggerNewObject={props.setTriggerNewObject}
            newObjectContainer={props.newObjectContainer}
            setNewObjectContainer={props.setNewObjectContainer}
            token={props.token}
        />
    );

    const bikeAccordion = (
        <LayerAccordion
            title={'Cyklar'}
            event={'bikeClicked'}
            dad={'scooter'}
            setActivateDraw={props.setActivateDraw}
            drawnItems={props.drawnItems}
            triggerNewObject={props.triggerNewObject}
            setTriggerNewObject={props.setTriggerNewObject}
            newObjectContainer={props.newObjectContainer}
            setNewObjectContainer={props.setNewObjectContainer}
            token={props.token}
        />
    );

    const showCitiesSwitch = (
        <LayerSwitch
            setShowLayer={props.setShowCities}
            showLayer={props.showCities}
            checked={props.showCities}
        />
    );

    const showParkingsSwitch = (
        <LayerSwitch
            setShowLayer={props.setShowParkings}
            showLayer={props.showParkings}
            checked={props.showParkings}
        />
    );

    const showChargingStationsSwitch = (
        <LayerSwitch
            setShowLayer={props.setShowChargingStations}
            showLayer={props.showChargingStations}
            checked={props.showChargingStations}
        />
    );

    const showZonesSwitch = (
        <LayerSwitch
            setShowLayer={props.setShowZones}
            showLayer={props.showZones}
            checked={props.showZones}
        />
    );

    const showBikesSwitch = (
        <LayerSwitch
            setShowLayer={props.setShowBikes}
            showLayer={props.showBikes}
            checked={props.showBikes}
        />
    );

    const editButton = (
        <LayerButton
            buttonText={'Ny'}
            size={'small'}
            width={25}
            setActivateDraw={props.setActivateDraw}
            drawnItems={props.drawnItems}
            handleClick={handleNewButtonClick}
        />
    );

    const searchButton = (
        <LayerButton
            buttonText={'Sök'}
            size={'small'}
            width={25}
            handleClick={handleSearchButtonClick}
        />
    );

    const buttonGroup = (
        <LayerButtonGroup buttons={[editButton, searchButton]} />
    );

    const container = (
        <LayerGrid
            title={'Städer'}
            switch={showCitiesSwitch}
            accordion={cityAccordion}
            buttonGroup={buttonGroup}
            id="stad"
        />
    );
    const container2 = (
        <LayerGrid
            title={'Parkering'}
            switch={showParkingsSwitch}
            accordion={parkingAccordion}
            buttonGroup={buttonGroup}
            id="parkering"
        />
    );
    const container3 = (
        <LayerGrid
            title={'Ladd'}
            switch={showChargingStationsSwitch}
            accordion={chargingAccordion}
            buttonGroup={buttonGroup}
            id="ladd"
        />
    );
    const container4 = (
        <LayerGrid
            title={'Zoner'}
            switch={showZonesSwitch}
            accordion={zoneAccordion}
            buttonGroup={buttonGroup}
            id="zone"
        />
    );
    const container5 = (
        <LayerGrid
            title={'Cyklar'}
            switch={showBikesSwitch}
            accordion={bikeAccordion}
            buttonGroup={buttonGroup}
            id="scooter"
        />
    );

    const containerArray = [
        container,
        container2,
        container3,
        container4,
        container5,
    ];

    return containerArray;
};

export default layerStackBuilder;
