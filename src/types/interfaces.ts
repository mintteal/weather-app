export interface IWeather {
  time: string;
  weathercode: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  sunrise: string;
  sunset: string;
  rain_sum: number;
  showers_sum: number;
  snowfall_sum: number;
}

export interface ICity {
  name: string;
  latitude: number;
  longitude: number;
}
