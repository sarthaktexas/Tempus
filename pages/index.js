import Head from 'next/head'
import styles from '../styles/Home.module.css'
import * as chrono from 'chrono-node'
import { parseDate } from 'chrono-node/dist/locales/en';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <label>Input String</label>
        <input id="input" onInput={event => updateURL(event.target.value)}></input>
        <a id="output"></a>
      </main>
    </div>
  )
}

function updateURL(input) {
  const title = input.match(/([A-Za-z]*)(\s)?(meeting|appointment|class|coffee)(\s)?(with\s[A-Za-z]*)?/g)[0];
  const time = new Date(chrono.parseDate(input)).toISOString();
  const start = getGoogleCalendarString(time);
  console.log(title, time);
  console.log(getCalendarString(title, '', '', start, getGoogleCalendarString(addHours(time, 1))));
  //document.getElementById('output').innerHTML = getCalendarString(title, '', '', getGoogleCalendarString(time), getGoogleCalendarString(addHours(time, 1)));
  //document.getElementById('output').href = getCalendarString(title, '', '', getGoogleCalendarString(time), getGoogleCalendarString(addHours(time, 1)));
}

function getCalendarString(title, description, location, start, end) {
  return encodeURI(`https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${description}&location=${location}&dates=${start}%2F${end}`)
}

function addHours(time, hours) {
  time = new Date(time).getTime()
  time = parseInt(time) + (hours * 3600000)
  time = new Date(time);
  return time.toISOString()
}

function getGoogleCalendarString(date) {
  return date.replace(/(\.|:|-)/g, '');
}