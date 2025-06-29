export {};

declare global {
  interface Window {
     ethereum?: any;
    // ethereum?: import('ethers').Eip1193Provider;
  }
}