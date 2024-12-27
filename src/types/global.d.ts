declare global {
  export interface Window {
    MyParcelAddressConfig?: {
      apiKey?: string;
      apiUrl?: string;
    };
  }
}

export {};
