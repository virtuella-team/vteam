import './App.css';
import AppMap from './App_layerstack';
import AppUser from './App_user';
import LoginForm from './components/LoginForm';
import ToplevelSwitch from './components/ToplevelSwitch';
import postUsers from './models/postUsers';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

import { useState } from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#81c784',
        },
    },
});

function App() {
    const [showUserUI, setShowUserUI] = useState(false);
    const [user, setUser] = useState();
    const [pwd, setPwd] = useState();
    const [token, setToken] = useState();

    const logInAdmin = async () => {
        const adminToken = await postUsers.logInAdmin({
            email: user,
            password: pwd,
        });
        console.log(adminToken.data.token);
        setToken(adminToken.data.token);
    };
    if (token) {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <FormGroup sx={{ margin: 1 }}>
                        <FormControlLabel
                            control={
                                <ToplevelSwitch
                                    showUser={showUserUI}
                                    setShowUser={setShowUserUI}
                                />
                            }
                            label={
                                showUserUI
                                    ? 'Växla till kartvy'
                                    : 'Växla till användarvy'
                            }
                        />
                    </FormGroup>
                    {showUserUI ? (
                        <AppUser token={token} />
                    ) : (
                        <AppMap token={token} />
                    )}
                </ThemeProvider>
            </div>
        );
    } else {
        return (
            <div className="topdiv">
                <ThemeProvider theme={theme}>
                    <LoginForm
                        logInAdmin={logInAdmin}
                        setPwd={setPwd}
                        setUser={setUser}
                    />
                </ThemeProvider>
            </div>
        );
    }
}
export default App;
