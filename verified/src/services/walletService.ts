export const connectWallet = async () => {
  if (typeof window.ethereum === "undefined") 
    throw new Error('Please install Metamask to connect your wallet.');

  await window.ethereum.request({method: 'eth_requestAccounts'});
};

export const isWalletConnected = (): boolean => {
  if (typeof window.ethereum === "undefined")
    return false;
  
  return window.ethereum.selectedAddress != null;
}
