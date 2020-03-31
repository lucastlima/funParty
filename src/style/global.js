import { createGlobalStyle } from "styled-components";

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
`;
