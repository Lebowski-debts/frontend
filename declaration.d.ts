interface ClassNames {
  [className: string]: string;
}
const classNames: ClassNames;
declare module '*.scss' {
  export = classNames;
}
declare module '*.scss' {
  export = classNames;
}

const imageUrl: string;
declare module '*.png' {
  export = imageUrl;
}

declare module '*.svg' {
  export = imageUrl;
}

declare module '*.jpg' {
  export = imageUrl;
}

declare module '*.jpeg' {
  export = imageUrl;
}

declare module '@mui/material/styles' {
  interface Theme {
    background: {
      light: string;
      main: string;
      dark: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    background?: {
      light?: string;
      main?: string;
      dark?: string;
    };
  }
}
