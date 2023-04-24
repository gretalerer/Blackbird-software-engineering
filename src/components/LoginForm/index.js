import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';


export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false); 
  const [helperText, setHelperText] = useState('');  
  const [passText, setPassText] = useState('');
  const validateForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    var validator = require("email-validator");
    

    function validatePassword(password) {
      const hasMinimumLength = password.length >= 8;
      const hasUppercaseLetter = /[A-Z]/.test(password);
      const hasLowercaseLetter = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*.]/.test(password);
      

      if (!hasMinimumLength) {
        setPassText('Password should be at least 8 characters long.');
        return false;

      }
    
      if (!hasUppercaseLetter) {
        setPassText('Password should contain at least one uppercase letter.');
        return false;
      }
    
      if (!hasLowercaseLetter) {
        setPassText('Password should contain at least one lowercase letter.');
        return false;
      }
    
      if (!hasNumber) {
        setPassText('Password should contain at least one number.');
        return false;
      }
    
      if (!hasSpecialChar) {
        setPassText('Password should contain at least one special character.');
        return false;
      }

      setPassText('');
      return true;
      }

      const isPasswordValid = validatePassword(password);
      const isEmailValid = validator.validate(email);

      if(!isEmailValid) {
        setHelperText('Please enter valid Email address');
      }
      else {
        setHelperText('');
      }


      if (isPasswordValid && isEmailValid) {
        setHelperText('');
        setPassText('');
        setShowAlert('Login successful!');
        return true;
      } 
      
      else {
        setShowAlert(false);
        return false; 
      } 
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const isValid = validateForm(event); 
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if (isValid) {
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });

      
      
    }

  }

  return (
    <>
      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 2
          }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"git
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={helperText !== ''}
              helperText={helperText}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passText !== ''}
              helperText={passText}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}