import _axios from 'axios';

const axios = _axios.create({
  baseURL: 'http://hapi.fhir.org/baseR4'
});

export const getPatients = (name, dob) => {
  return axios.get(
    `/Patient${name ? `?name=${name}` : ''}${
      name && dob ? `&birthdate=${dob}` : dob ? `?birthdate=${dob}` : ''
    }`
  );
};

export const getPractitioners = () => {
  return axios.get('/Practitioner');
};
