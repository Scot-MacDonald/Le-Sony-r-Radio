import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
   background:black;
   color:white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
  }
  
  a {
    color: white;
    text-decoration: none;
  }
  
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  ul {
    list-style-type: none;
  }
  main{
    margin-top:90px;
    
  }
 h1{
  font-size: 28px;
  line-height: 32px;
  margin: 10px;
}
h2{
  font-size: 28px;
  line-height: 32px;
  margin: 10px;
}

  footer {
    bottom: 0;
    position: fixed;
    width: 100%;
  }

  .g-background-default {
    background-color: black;
  }

  .css-1nvnyqx-MuiPaper-root-MuiDrawer-paper{
    background-color:black!important;
    margin-top:81px;
    z-index:1400!important;
  }

  .css-68zbsl {
    width: auto;
    border: 1px solid white;}

    .css-1e6y48t-MuiButtonBase-root-MuiButton-root{
      border-left:white solid 1px;
      border-right:white solid 1px;
      border-bottom:white solid 1px;
      border-radius:0;
      padding:0;
      min-width:26px;
      max-width:30px;
      max-height:30px;
    }
    .css-1e6y48t-MuiButtonBase-root-MuiButton-root:hover{
      background-color:black;
    }
  
`;
