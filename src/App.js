import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './App.css';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function App() {
  const classes = useStyles();
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState(null);
  const [lang, setlang] = useState(null)
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/lang/en')
    .then(response => response.json())
    .then(data => {
      setdata(data)
      setloading(false)
    });
  }, [])

  return (
    <div className={classes.container}>
      {loading ? <CircularProgress /> :
      <Container className="container">
        Selected Country speaks following languages : {lang === null ? <p>Search any country below for results...</p> : lang?.map(item => <li key={item.name}>{item.name}</li>)}
        <Autocomplete 
          className="autocomplete"
          id="combo-box-demo"
          options={data}
          getOptionLabel={(data) => data.name}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search Countries and Languages" variant="outlined" />}
          onChange={(event, newValue) => {
            if(newValue === null){
              setlang(null)
            }else setlang(newValue.languages)
          }}
        />
      </Container>}
    </div>
  );
}
   