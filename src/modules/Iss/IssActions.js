/**
 * Created by patrykmazurkiewicz on 18/04/2017.
 */
import fetch from 'isomorphic-fetch';

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
            const geocoder = new window.google.maps.Geocoder;
            geocoder.geocode({'location': coords}, function(results, status) {
                if (status === 'OK') {
                    if (results) {
                        dispatch(getArea(results[1].formatted_address));
                    } else {
                        dispatch(getArea('No result'));                    }
                } else {
                    dispatch(getArea('Geocoder failed due to: ' + status));
                }
            });
        });
    }
}