import React, {useEffect, useState} from 'react'
import moment from 'moment/moment';
import "./Clock.css"
import { Chip } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const Clock = () => {
  const [clock, setClock] = useState();
  useEffect(() => {setInterval(() => {const newDate = new Date(); setClock(newDate)}, 1000)})
  return (
    <div className = "clock-background">
        <AccessAlarmIcon style={{ fontSize: 100 }} color = "warning"/>
        <div className = "clock-display my-1">
            <Chip label = {`${moment(clock).format("MMM DD YYYY")}`} color = "success" className = "time"/>
            <br/>
            <h2 className='text-danger'>{moment(clock).format("HH:mm:ss a")}</h2>
        </div>
    </div>
  )
}

export default Clock
