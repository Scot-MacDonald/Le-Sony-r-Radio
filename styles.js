import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --bg-color: black;
    --font-color: white;
    --colorLive: black;
    --fontReverse: black;
    --secondary:#ccc;
   
  }


  [data-theme='dark'],
  [data-theme='dark'] body {
    color: #242329;
    --bg-color: white;
    --font-color: black;
    --colorLive: white;
    --fontReverse: white;
    --secondary:black;
  
  }

  body {
   background:var(--bg-color);
    color:var( --font-color);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
  }
 


  p{
    font-size:16px;
  }
  
  a {
    color: var( --font-color);
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
    margin-top:82px;
    
  }
 h1{
  font-size: 28px;
  line-height: 32px;
  margin:10px;
  
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
      border-left:white solid 1px!important;
      border-right:white solid 1px!important;
      border-bottom:white solid 1px!important;
      border-radius:0!important;
      padding:0!important;
      min-width:26px!important;
      max-width:30px!important;
      max-height:30px!important;
    }
    .css-1e6y48t-MuiButtonBase-root-MuiButton-root:hover{
      background-color:black;
    }
  
    .dark{
      min-width:26px;
      max-width:30px;
      max-height:30px;
      border-right:white solid 1px;
      border-bottom:white solid 1px;
      background-color:transparent;
    }

    
    
`;
