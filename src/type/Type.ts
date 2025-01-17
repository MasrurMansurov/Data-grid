export type typeCountries = {
    name: {
        common: string,
        official: string,
        nativeName: {
          eng: {
            official: string,
            common: string 
          }
        }
      },
      tld: [
        string
      ],
      cca2: string,
      ccn3: string,
      cca3: string,
      independent: boolean,
      status: string,
      unMember: boolean,
      currencies: {
        SHP: {
          name: string,
          symbol: string
        }
      },
      idd: {
        root: string,
        suffixes: [
          string
        ]
      },
      capital: [
        string
      ],
      altSpellings: [
        string,
        string
      ],
      region: string,
      languages: {
        [key: string] : string
      },
      latlng: string,
      landlocked: boolean,
      area: number,
      flag: string,
      maps: {
        googleMaps: string,
        openStreetMaps: string
      },
      population: number,
      timezones: [
        string
      ],
      continents: [
        string
      ],
      flags: {
        png: string,
        svg: string
      },
      startOfWeek: string,
      capitalInfo: {
        latlng: string
      }
}