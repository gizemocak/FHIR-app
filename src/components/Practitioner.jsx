import React, { useState } from 'react';
import { getPractitioners } from '../services';
import { useEffect } from 'react';
import PractitionerCard from './PractitionerCard';
import { CircularProgress } from '@material-ui/core/';

const Practitioner = () => {
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPractitioners().then(res => {
      setPractitioners(flattenPractitionerObj(res));
      setLoading(false);
    });
  }, []);

  const handleDelete = id => {
    const filtered = practitioners.filter(p => p.id !== id);
    setPractitioners(filtered);
  };

  const flattenPractitionerObj = response => {
    return (response.data.entry || []).map(item => {
      const name = item.resource.name || [];
      return {
        id: item.resource.id,
        name: `${((name[0] || {}).given || []).join(' ')} ${
          (name[0] || {}).family
        }`,
        gender: item.resource.gender,
        dob: item.resource.birthDate,
        photo:
          'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
      };
    });
  };

  return (
    <div>
      <h1 className="title">Practitioners</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {practitioners.map(practitioner => (
            <PractitionerCard
              id={practitioner.id}
              dob={practitioner.dob}
              gender={practitioner.gender}
              name={practitioner.name}
              imgSrc={practitioner.photo}
              handleDelete={handleDelete}
            ></PractitionerCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Practitioner;
