import axios from 'axios';
export async function latlongIntoAddress(latlong: any) {
  const GOOGLE_API_KEY = 'AIzaSyBDGCa-A_Qzhi4eoAR49haih2j73TvjWeE';

  const getShortAddress = place => {
    const location = {
      city: '',
      state: '',
      country: '',
      countryShortName: '',
    };
    let shortAddress = '';

    for (let ac = 0; ac < place.address_components.length; ac++) {
      const component = place.address_components[ac];

      switch (component.types[0]) {
        case 'locality':
          location.city = component.long_name;
          break;
        case 'administrative_area_level_1':
          location.state = component.long_name;
          break;
        case 'country':
          location.countryShortName = component.short_name;
          location.country = component.long_name;
          break;
        default:
          break;
      }
    }

    // console.log('city: ', location.city);
    // console.log('state: ', location.state);
    // console.log('country: ', location.country);

    if (location.city.length !== 0) {
      shortAddress += location.city;
      if (location.state || (!location.state && location.country)) {
        shortAddress += ', ';
      }
    }

    if (location.state.length !== 0) {
      shortAddress += location.state;
    }

    if (location.country.length !== 0) {
      if (location.state) {
        shortAddress += ', ';
      }
      shortAddress += location.country;
    }

    return {shortAddress, country: location.countryShortName};
  };
  return await axios
    .get(
      // `https://maps.googleapis.com/maps/api/geocode/json?address=
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlong.latitude},${latlong.longitude}&key=${GOOGLE_API_KEY}`,
    )
    .then(responseJson => {
      // console.log('google response is: 3', responseJson?.data?.results[0]);

      if (responseJson?.data?.results?.length > 0) {
        // console.log(
        //   'responseJson?.data?.results',
        //   responseJson?.data?.results[0]?.formatted_address.split(','),
        // );

        //to get short address from full address
        const {shortAddress, country} = getShortAddress(
          responseJson?.data?.results[0],
        );

        const fullAddress =
          responseJson?.data?.results[0]?.formatted_address || '';
        const zipcode =
          responseJson?.data?.results[6]?.address_components[0]?.types[0] ==
          'postal_code'
            ? responseJson?.data?.results[6]?.address_components[0]?.long_name
            : '';
        const tempCity1 =
          responseJson?.data?.results[0]?.formatted_address.split(',');
        const tempCity2 =
          tempCity1[tempCity1.length >= 4 ? tempCity1.length - 3 : 2];
        const city = tempCity2 ? tempCity2?.trim() : '';

        const countryTemp =
          responseJson?.data?.results[0]?.formatted_address?.split(',') || [];
        const address = {
          shortAddress,
          fullAddress,
          country: countryTemp[countryTemp?.length - 1] || country || '',
          zip_code: zipcode,
          city,
          street: responseJson?.data?.results[0].plus_code?.compound_code || '',
        };
        return address;
        // resolve(address);
      } else {
        const address = {
          shortAddress: '',
          fullAddress: '',
          country: '',
          zip_code: '',
          city: '',
          street: '',
        };
        return address;
      }
    })
    .catch(error => {
      console.log('latlongIntoAddress error: ', error);
      // reject(error);
      return error;
    });
}
