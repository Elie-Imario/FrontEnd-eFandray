import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Separator from '../../components/separator';
import AuthHeader from './authComponents/authHeader';
import './authStyle.scss'
import { useState } from 'react';

const AuthPage = () => {
    
	const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

    return (
        <div className="bloc-page">
            <div className="auth-container">
                <div className="auth-limiter">
                    <div id="login-section" className="auth-section">
                        <AuthHeader 
                            headerImgPath={'/images/Sign in-pana.png'}
                            title={'Connectez vous!'}
                            subTitle={'Connectez vous et discutez avec vos amis!'}
                            textlead={'Si vous ne disposez pas encore d\'un compte,'}
                            btnSpan={'inscrivez-vous'}
                        />
                        <Box className="login-wrap-form">    
                            <FormControl fullWidth className="wrap-input100">                        
                                <TextField fullWidth 
                                    className="input100" 
                                    label="Adresse e-mail ou Login" 
                                    variant="standard" 
                                />
                            </FormControl>
                            <FormControl fullWidth variant="standard" className="wrap-input100">
                                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="input100" 
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <FontAwesomeIcon icon='eye-slash' size='lg' /> : <FontAwesomeIcon icon='eye' size='lg' />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <div className="auth-btn-group">
                                <button className="btn btn-primary" id="sign-in">
                                    <FontAwesomeIcon icon='sign-in' size='lg' /><span>Se connecter</span> 
                                </button>
                            </div>
                        </Box>

                    </div>
            
                    <div id="registration-section" className="auth-section">
                        <div className="registration-header">
                            <div className="registration-header-img">
                                <img src="/images/man-holding-sign-up-form-2937684-2426382.png" alt="" />
                            </div>
                            <div className="registration100-form-title">
                                <h1>Inscrivez vous!</h1>
                                <span>Demarrer une nouvelle aventure et faites de nouvelles connaissances avec e-fandray!</span>
                                <div className="other">
                                    <Separator />
                                    <div className="other-content">
                                        <span className="txt1">
                                            Déjà souscris à un compte? 
                                        </span>
                                        <button className="to-prev-slide txt2">
                                            Connectez-vous
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="registration-wrap-form">
                            <form action="" className="registration_form">
                                <div className="registration_form1">
                                    <div className="wrap-input100">
                                        <input className="input100" type="text" name="login" />
                                        <span className="focus-input100" data-placeholder="Login"></span>
                                    </div>
                                    <div className="wrap-input100">
                                        <input className="input100" type="text" name="email" />
                                        <span className="focus-input100" data-placeholder="Adresse e-mail"></span>
                                    </div>
                                </div>
                                <div className="container-registration100-form-btn">
                                    <button className="registration100-form-btn">
                                        <span><i className="fa fa-envelope"></i>S'inscrire</span> 
                                    </button>
                                </div>
                            </form>
                            <div className="separator">
                                <Separator />
                                <span>ou</span>
                                <Separator />
                            </div>
            
                            <div className="registration_form2 container-registration100-form-btn">
                                <button className="registration100-form-btn1">
                                    <span><i className="fab fa-google"></i>Continuer avec Gmail</span> 
                                </button>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AuthPage;