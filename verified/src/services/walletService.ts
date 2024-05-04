const connectWallet = async (): Promise<boolean> => {
    try {
        if (window.ethereum) {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            console.log('Wallet connected successfully!');
            return true;
        } else if(window.ethereum === undefined) {
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