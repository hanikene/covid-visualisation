import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country: string) => {
  let urlCustom = url;
  if (country) urlCustom = `${url}/countries/${country}`;

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(urlCustom);
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (err) {
    return {
      confirmed: {
        detail: '',
        value: 0,
      },
      deaths: {
        detail: '',
        value: 0,
      },
      recovered: {
        detail: '',
        value: 0,
      },
      lastUpdate: '',
      error: err.message,
    };
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    return data.map((day: any) => {
      return {
        confirmed: day.totalConfirmed,
        deaths: day.deaths.total,
        date: day.reportDate,
      };
    });
  } catch (err) {
    return [];
  }
};

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);
    return data.countries.map((country: any) => country.name);
  } catch (err) {
    return [];
  }
};

export const fetchTopCountries = async () => {
  try {
    const countriesResponses = await axios.get(`${url}/countries`);
    const countriesUrl = countriesResponses.data.countries
      .filter(
        (country: any) =>
          country.name !== "Cote d'Ivoire" && country.name !== 'Gambia'
      )
      .map((country: any) => {
        return axios.get(`${url}/countries/${country.name}/deaths`);
      });
    const fetchedCountriesStatisticsData = await Promise.all(countriesUrl);
    const CountriesStatistics = fetchedCountriesStatisticsData
      .map((country: any) => {
        if (!country.data[0]) return null;
        return {
          name: country.data[0].countryRegion,
          confirmed: country.data[0].confirmed,
          recovered: country.data[0].recovered,
          deaths: country.data[0].deaths,
        };
      })
      .filter((country) => country);

    return {
      confirmed: CountriesStatistics.sort(
        (a: any, b: any) => b.confirmed - a.confirmed
      ).slice(0, 8),
      recovered: CountriesStatistics.sort(
        (a: any, b: any) => b.recovered - a.recovered
      ).slice(0, 8),
      deaths: CountriesStatistics.sort(
        (a: any, b: any) => b.deaths - a.deaths
      ).slice(0, 8),
    };
  } catch (err) {
    return err;
  }
};
