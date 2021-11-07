import React from 'react';
import Navigaation from '../../Shared/Navigation/Navigaation';
import AppointHeader from '../AppointHeader/AppointHeader';
import AvailableAppoint from '../AvailableAppoint/AvailableAppoint';

const Appointment = () => {
    const [date, setDate] = React.useState(new Date());
    return (
        <div>
            <Navigaation></Navigaation>
            <AppointHeader date={date} setDate={setDate}></AppointHeader>
            <AvailableAppoint date={date}></AvailableAppoint>
        </div>
    );
};

export default Appointment;