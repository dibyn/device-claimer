import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router, { useRouter } from 'next/router';

const createDevice = async (data) => await axios.post('/api/devices', data);
const CreateDevice = () => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceClaimedDate, setDeviceClaimedDate] = useState('');
  const [deviceDescription, setDeviceDescription] = useState('');
  const queryClient = useQueryClient();
  const { query: { userId } } = useRouter();
  const { mutate, isLoading } = useMutation(createDevice, {
    onSuccess(data, variables, context) {
      console.log('success --->', data, variables, context);
      Router.push(`/devices/user/${userId}`);
    },
    onError(error, variables, context) {
      console.log('error --->', error, variables, context);
    },
    onSettled(data, error, variables, context) {
      queryClient.invalidateQueries(['devices']);
      console.log('settled --->', data, error, variables, context);
    },
  });
  const onFormSubmit = (e: any) => {
    e.preventDefault();
    mutate({
      deviceName,
      deviceClaimedDate,
      deviceDescription,
      userId
    });
  };
  if (isLoading) return <>loading...</>;
  return (
    <>
      <form action="create-user-device" onSubmit={onFormSubmit}>
        <div>
          <label htmlFor="device-name">Device name</label>
          <input onChange={(e) => setDeviceName(e.target.value)} type="text" />
        </div>
        <div>
          <label htmlFor="device-description">Device description</label>
          <input
            onChange={(e) => setDeviceDescription(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="device-claimed-date">Device claimed data</label>
          <input
            onChange={(e) => setDeviceClaimedDate(e.target.value)}
            type="date"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default CreateDevice;
