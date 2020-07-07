import "./App.css";


import { FbtParam, IntlViewerContext, fbt, init } from "fbt";
import React, { FormEvent, useCallback, useRef, useState, ChangeEvent, ReactElement } from "react";
import { Button, TextField, Container, Menu, MenuItem, Select, FormControl, makeStyles, Grid, colors } from '@material-ui/core';

import intl from "./translatedFbts.json";
import logo from "./logo.svg";

// This will load the translated strings in FBT.
init({ translations: intl });

const supportedLanguages: { [shortname: string]: { name: string } } = {
  "en_US": { name: "English" },
  "fr_FR": { name: "French" },
  "pi_PI": { name: "Pirate" }
}

const langStore = window.localStorage;
if (langStore.getItem("lang") == null) {
  langStore.setItem("lang", "en_US");
}

IntlViewerContext.locale = langStore.getItem("lang") || "en_EN";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface LanguageSelectorProps {
  name: string;
}

const LanguageSelector = (props: LanguageSelectorProps): ReactElement => {
  const [name, setName] = useState(supportedLanguages[langStore.getItem('lang') as string].name);
  const classes = useStyles();
  const tStyle = { color: "white" };

  const onValueChange = useCallback(
    (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      const value = event.target.value as string;
      langStore.setItem("lang", value);
      setName(supportedLanguages[value].name);
      window.location.reload();
    }, []
  );

  const arrayMenuItems = [];

  for (let language in supportedLanguages) {
    const languageName = supportedLanguages[language].name;
    arrayMenuItems.push(<MenuItem value={language}> {languageName} </MenuItem>);
  }


  return (
    <div>
      <Grid container>
        <FormControl className={classes.formControl}>
          <Select
            id="simple-menu"
            onChange={onValueChange}
            defaultValue={langStore.getItem('lang')}
            style={{ backgroundColor: "white" }}
          >
            {
              arrayMenuItems
            }
          </Select>
        </FormControl>
      </Grid>
      <div style={tStyle}> Translated in {name} </div>
    </div>
  )
}

export default () => {
  // This might trigger the error 'Unexpected token, expected ";"'
  // when doing 'yarn collect-fbts'. Adding a 'babel.config.js' file
  // with '@babel/preset-typescript' as a preset will solve the problem.
  console.log(IntlViewerContext.locale!);

  const [name, setName] = useState("");
  const [nameInputValue, setNameInputValue] = useState("");
  const inputNameRef = useRef(null);

  const onSubmitName = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      setName(nameInputValue);
    },
    [setName, nameInputValue]
  );

  const onNameInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log(event.target.value);
      setNameInputValue(event.target.value);
    },
    []
  );

  const fbtParamsTest = (
    <div>
      <fbt desc="FbtParams example string">
        Hello, <FbtParam name="name">{name}</FbtParam>
      </fbt>
    </div>
  );



  return (
    <div className="App">
      <LanguageSelector name={langStore.getItem('lang') as string} />

      <header className="App-header">

        <img
          src={logo}
          className="App-logo"
          alt={fbt("logo", "alt text for logo")}
        />
        <p>
          <fbt desc="more complex example">
            Edit <code>src/App.tsx</code> and save to reload.
          </fbt>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <fbt desc="example">Learn React</fbt>
        </a>
      </header>
      <div className="fbtExamples">
        <Container maxWidth="md">
          <fbt desc="description for more examples">
            Some more use cases for FBT strings:
        </fbt>
          <h2>FbtParam</h2>
          <div>
            <fbt desc="about FbtParams">
              <strong>FbtParams</strong> allows you to inject a value within a
            translated string.
            </fbt>
          </div>
          <div>
            <form onSubmit={onSubmitName}>
              <div>
                <TextField
                  id="outlined-button"
                  label="Enter your name"
                  variant="outlined"
                  color="primary"
                  size="small"
                  onChange={onNameInputChange}
                  ref={inputNameRef}
                  style={{ margin: 2, backgroundColor: "white" }}
                />
              </div>
              <Button variant="contained" color="primary" size="large" type="submit">
                <fbt desc="submit button label">Submit</fbt>
              </Button>
            </form>

            {name && fbtParamsTest}
          </div>
        </Container>
      </div>
    </div>
  );
};
