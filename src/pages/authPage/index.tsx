import { useState } from "react";
import { useMutation } from "@apollo/client";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Separator from "../../components/separator";
import AuthHeader from "./authComponents/authHeader";
import  { SING_IN_MUTATION }  from '../../requests/auth.request.gql'
import "./authStyle.scss";



type authLog = {
    auth_identification: string,
    password: string
}

const AuthPage = () => {
    const [log, setLog] = useState<authLog>({
      auth_identification: '',
      password: '',
    })
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    const [signinAction] = useMutation(SING_IN_MUTATION, {
      variables:{
        auth_identification: log.auth_identification,
        password: log.password
      }
    })
    
    const handleSignIn = ()=>{
      signinAction().then(({data:{SignIn}})=>{
        if(SignIn.statusCode === 200){
          console.log(SignIn.message)
        }
      })
    }

    return (
        <div className="main view-1">
          <div className="bloc-page reduce">
            <div className="auth-container">
              <div className="auth-limiter">
                <div id="login-section" className="auth-section">
                  <AuthHeader
                    headerImgPath={"/images/Sign in-pana.png"}
                    title={"Connectez vous!"}
                    subTitle={"Connectez vous et discutez avec vos amis!"}
                    textlead={"Si vous ne disposez pas encore d'un compte,"}
                    btnSpan={"inscrivez-vous"}
                  />
                  <Box className="login-wrap-form">
                    <FormControl fullWidth className="wrap-input100">
                      <TextField
                        fullWidth
                        className="input100"
                        label="Adresse e-mail ou Login"
                        variant="standard"
                        onChange={({target:{value}})=>{
                          setLog({...log, auth_identification: value})
                        }}
                      />
                    </FormControl>
                    <FormControl
                      fullWidth
                      variant="standard"
                      className="wrap-input100"
                    >
                      <InputLabel htmlFor="password">Mot de passe</InputLabel>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="input100"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <FontAwesomeIcon icon="eye-slash" size="lg" />
                              ) : (
                                <FontAwesomeIcon icon="eye" size="lg" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        onChange={({target: {value}})=>{
                          setLog({...log, password: value})
                        }}
                      />
                    </FormControl>
                    <div className="auth-btn-group">
                      <button className="btn btn-primary" id="sign-in" onClick={handleSignIn}>
                        <FontAwesomeIcon icon="sign-in" size="lg" />
                        <span>Se connecter</span>
                      </button>
                    </div>
                  </Box>
                </div>

                <div id="registration-section" className="auth-section">
                  <AuthHeader
                    headerImgPath={
                      "/images/man-holding-sign-up-form-2937684-2426382.png"
                    }
                    title={"Inscrivez vous!"}
                    subTitle={
                      "Demarrer une nouvelle aventure et faites de nouvelles connaissances avec e-fandray!"
                    }
                    textlead={"Déjà souscris à un compte?"}
                    btnSpan={"Connectez-vous"}
                  />
                  <Box className="registration-wrap-form">
                    <div className="flex-row">
                      <FormControl fullWidth className="wrap-input100">
                        <TextField
                          fullWidth
                          className="input100"
                          label="Login"
                          variant="standard"
                        />
                      </FormControl>
                      <FormControl fullWidth className="wrap-input100">
                        <TextField
                          fullWidth
                          className="input100"
                          label="Adresse e-mail"
                          variant="standard"
                        />
                      </FormControl>
                    </div>

                    <div className="auth-btn-group">
                      <button className="btn btn-primary" id="sign-up">
                        <FontAwesomeIcon icon="envelope" size="lg" />
                        <span>S'inscrire</span>
                      </button>
                    </div>
                    <div className="separator">
                      <Separator />
                      <span>ou</span>
                      <Separator />
                    </div>

                    <div className="auth-btn-group">
                      <button className="btn btn-secondary">
                        <img src="/images/googleLogo.svg" />
                        <span>Continuer avec Gmail</span>
                      </button>
                    </div>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default AuthPage;
