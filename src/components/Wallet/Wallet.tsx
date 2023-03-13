import { useEffect, useCallback } from "react";
import { initKeplr, getAddress } from "../../utils/wallet";
import Button from "../Button/Button";
import styles from "./Wallet.module.css";
import { AppStateContext } from "../../context/AppStateContext";
import { useContext } from "react";

const Wallet: React.FC = () => {
  const { address, setAddress } = useContext(AppStateContext);

  const fetchAddress = useCallback(async () => {
    let response = await getAddress();
    if (response) {
      setAddress(response);
    }
  }, [setAddress]);

  useEffect(() => {
    fetchAddress();
    let timer = setTimeout(() => {
      if (address) {
        fetchAddress();
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [address, fetchAddress]);

  const connectWallet = async () => {
    await initKeplr();
    fetchAddress();
  };

  return (
    <div>
      <Button color="white" className={styles.wallet} onClick={connectWallet}>
        {address
          ? `${address.slice(0, 10)}...${address.slice(-10, -5)}`
          : "Connect Wallet"}
      </Button>
    </div>
  );
};
export default Wallet;
