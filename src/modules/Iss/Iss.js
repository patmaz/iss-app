/**
 * Created by patrykmazurkiewicz on 18/04/2017.
 */
import React from 'react';

class Iss extends React.Component {
    componentDidMount() {
        this.props.getCoordsRequest();

        setInterval(() => {
            this.props.getCoordsRequest();
            this.refreshMap();
        }, 5000);

        this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 0,
                lng: 0
            },
            zoom: 3
        });

        this.pointer = new window.google.maps.Marker({
            map: this.map
        });

        this.infowindow = new window.google.maps.InfoWindow();
    }

    refreshMap = () => {
        let LatLng = new window.google.maps.LatLng(
            parseFloat(this.props.issPosition.coords.latitude),
            parseFloat(this.props.issPosition.coords.longitude));
        this.map.panTo(LatLng);
        this.pointer.setPosition(LatLng);
        this.infowindow.setContent('<p>' +  this.props.issPosition.area + '</p>');
        this.infowindow.open(this.map, this.pointer);
    };

    render() {
        return (
            <div>
                <div id={'map'}>

                </div>
                <iframe id={'streaming'}
                        src={"http://www.ustream.tv/embed/17074538?html5ui"}
                        scrolling={"no"}
                        frameBorder={"0"}/>
            </div>
        )
    }
}

export default Iss;