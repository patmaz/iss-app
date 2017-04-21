/**
 * Created by patrykmazurkiewicz on 18/04/2017.
 */
import fetch from 'isomorphic-fetch';
import maps from '@google/maps';

const googleMapsClient = maps.createClient({
    key: 'AIzaSyCXTF8P60IRs5yCjG1XdtEk3uHsBhWKjU8'
});

export const GET_COORDS = 'GET_COORDS';
export const GET_AREA = 'GET_AREA';

export function getCoords(coords) {
    return {
        type: GET_COORDS,
        coords
    }
}

export function getArea(area) {
    return {
        type: GET_AREA,
        area
    }
}

export function getCoordsRequest() {
    return (dispatch) => {
        return fetch('http://api.open-notify.org/iss-now.json', {
            method: 'get'
        })
        .then(res => res.json())
        .then(res => {
            dispatch(getCoords(res.iss_position));
            return res;
        })
        .then(res => {
            const coords = {
                lat: parseFloat(res.iss_position.latitude),
                lng: parseFloat(res.iss_position.longitude)
            };
            googleMapsClient.reverseGeocode({'latlng': coords}, (nul, res) => {
                if (res.status === 200) {
                    if (res.json.results[1]) {
                        dispatch(getArea(res.json.results[1].formatted_address));
                    } else {
                        dispatch(getArea('No results'));
                    }
                } else {
                    dispatch(getArea('Geocoder error: ' + res.status));
                }
            });
        });
    }
}