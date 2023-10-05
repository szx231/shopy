declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'development' | 'staging' | 'production';
      NODE_ENV: 'development' | 'staging' | 'production';
      PORT?: number;
      PWD: string;
      STRIPE_KEY: string;
      MAILER: string;
      SERVER_IP: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script),
// convert it into a module by adding an empty export statement.
export {};
