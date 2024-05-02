export const connectWallet = async () => {
  if (typeof window.ethereum === "undefined") 
    throw new Error('Please install Metamask to connect your wallet.');

  await window.ethereum.request({method: 'eth_requestAccounts'});
  console.log('Wallet connected successfully!');
};

export const isWalletConnected = async (): Promise<boolean> => {
  if (typeof window.ethereum === "undefined")
    return false;

  try {
    const accounts = await window.ethereum.request<unknown[]>({method: 'eth_accounts'});
    return !!accounts?.length;
  } catch (error) {
    console.error('Error checking wallet connection:', error);
    return false;
  }
}
