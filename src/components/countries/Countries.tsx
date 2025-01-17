import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useStore } from './useStore';
import { apiCountries } from '../../api/Api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "./countries.scss"
import { TextField } from '@mui/material';

// Select
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Countries = () => {
    const [search, setSearch] = useState('')
    const [filterContinents, setFilterContinents] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setFilterContinents(event.target.value as string);
    };

    const columns: GridColDef[] = [
      {
        field: 'flags.png',
        headerName: 'Flags',
        width: 140,
        editable: true,
        renderCell: (params) => <img 
        style={{
          width: '60px', 
          height: '40px', 
          objectFit: 'cover'
        }} 
        src={params.row.flags.png}
        alt="Error" 
        />
      },
      {
        field: 'name.common',
        headerName: 'Country',
        width: 250,
        editable: true,
        renderCell: (params) => (<div>{params.row.name.common}</div>)
      },
      {
        field: 'languages',
        headerName: 'Language',
        width: 200,
        editable: true,
        renderCell: (params) => (<div>{Object.values(params.row.languages || {}).join(', ')}</div>)},
      {
        field: 'capital',
        headerName: 'Capital',
        width: 200,
        editable: true,
        renderCell: (params) => (<div>{params.row.capital}</div>)
      },
      {
        field: 'population',
        headerName: 'Population',
        width: 200,
        editable: true,
        renderCell: (params) => (<div>{params.row.population}</div>)
      },
    ];
    
    const countries = useStore((state) => state.countries)
    const getCountries = useStore((state) => state.getCountries)
    
    const setCountries = async () => {
        try {
            const response = await axios.get(apiCountries)            
            getCountries(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        setCountries()
    },[])

    const filteredCountries = countries.filter((country) => {
      return country.name.common.toLowerCase().includes(search.trim().toLowerCase()) 
    })

    const filteredContinents = filteredCountries.filter((continent) => {
      if (filterContinents === 'North America') {
        return continent.continents.includes('North America')
      } 
      else if (filterContinents === 'South America') {
        return continent.continents.includes('South America')
      } 
      else if (filterContinents === 'Africa') {
        return continent.continents.includes('Africa')
      } 
      else if (filterContinents === 'Europe') {
        return continent.continents.includes('Europe')
      } 
      else if (filterContinents === 'Asia') {
        return continent.continents.includes('Asia')
      } 
      else if (filterContinents === 'Antarctica') {
        return continent.continents.includes('Antarctica')
      } 
      else if (filterContinents === 'Oceania') {
        return continent.continents.includes('Oceania')
      } 
      else {
        return 'All'
      }
    })

  return (
    <Box sx={{maxWidth: '1000px', margin: 'auto'}}>
      <Box  sx={{mb: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        {/* TextField */}
        <TextField 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}  
          id="outlined-basic" 
          label="Search" 
          variant="outlined" 
        />    
        {/* Select */}  
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Continents</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterContinents}
              label="Continents"
              onChange={handleChange}
            >
              <MenuItem value={'All'}>All</MenuItem>
              <MenuItem value={'North America'}>North America</MenuItem>
              <MenuItem value={'South America'}>South America</MenuItem>
              <MenuItem value={'Africa'}>Africa</MenuItem>
              <MenuItem value={'Europe'}>Europe</MenuItem>
              <MenuItem value={'Asia'}>Asia</MenuItem>
              <MenuItem value={'Antarctica'}>Antarctica</MenuItem>
              <MenuItem value={'Oceania'}>Oceania</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>  
      {/* Table */}
      <DataGrid
        getRowId={(row) => row.name.common}
        rows={filteredContinents}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
      />
  </Box>
  )
}

export default Countries
