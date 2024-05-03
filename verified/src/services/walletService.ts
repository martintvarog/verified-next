const connectWallet = async (): Promise<boolean> => {
    try {
        if (window.ethereum) {
            // Request account access if needed
            await window.ethereum.request({method: 'eth_requestAccounts'});
            console.log('Wallet connected successfully!');
            console.log('Wallet address:', await window.ethereum.request({method: 'eth_accounts'}));
            return true;
            // You can add more logic here after the wallet is connected
        } else {
            console.log('Please install Metamask to connect your wallet.');
            return false;
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        return false;
    }
};

const isWalletConnected = async (): Promise<boolean> => {
    try {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({method: 'eth_accounts'});
            return accounts.length > 0;
        }
        return false;
    } catch (error) {
        console.error('Error checking wallet connection:', error);
        return false;
    }
}

export default {connectWallet, isWalletConnected};
