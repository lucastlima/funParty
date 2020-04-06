import { createGlobalStyle } from "styled-components/macro";

export default createGlobalStyle`
    
    html {
        box-sizing: border-box;
    }
    
    *, *::before, *::after {
        box-sizing: inherit;
    }

    body {
        margin: 0;
        font-family: 'Baloo Da 2', cursive;
        background-color: #f41469;
    }

    html, body {
        height: 100%;
    }

    h1,h2,h3,h4,h5 {
        margin: 0;
    }

    #root {
        display: flex;
        height: 100%;        
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .ui-wrapper {
        border-radius: 2rem;
        box-shadow: 0 0.6rem 0 0 rgba(0, 0, 0, 0.3), 0 1rem 2rem rgba(0, 0, 0, 0.24);
        background-color: white;
        margin: 1rem;
    }

    h1,h2,h3,h4,h5,p {
        margin: 0.3rem 0;
    }
`;
