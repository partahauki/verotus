import dotenv from "dotenv";

dotenv.config();

interface EnvVariables {
  CSV_BINANCE_TRANSACTIONS: string;
  CSV_CELSIUS: string;
  KEY_BSC_SCAN: string;
  KEY_CRYPTOWATCH: string;
  KEY_ETHER_SCAN: string;
  KEY_POLYGON_SCAN: string;
  FETCH_BINANCE_EVENTS: boolean;
  FETCH_BLOCKCHAIN_EVENTS: boolean;
  FETCH_ETHER_EVENTS: boolean;
  FETCH_POLYGON_EVENTS: boolean;
  FETCH_BSC_EVENTS: boolean;
  FETCH_CELSIUS_EVENTS: boolean;
  TAX_YEAR: number;
  DEBUG_WITH_MOCKDATA: boolean;
  DEBUG_PRINT_GROUPED_BLOCKCHAIN_TRANSACTIONS: boolean;
  PRINT_BEFORE_CALCULATIONS: boolean;
  PRINT_MOTHERBRAIN_DEBUGSTACK: boolean;
  REALIZE_AAVE: boolean;
  REDIS_PORT: number;
  WALLETS: string[];
  MINING_WALLETS: string[];
}

const env: EnvVariables = {
  CSV_BINANCE_TRANSACTIONS: process.env.CSV_BINANCE_TRANSACTIONS as string,
  CSV_CELSIUS: process.env.CSV_CELSIUS as string,
  KEY_BSC_SCAN: process.env.KEY_BSC_SCAN as string,
  KEY_CRYPTOWATCH: process.env.KEY_CRYPTOWATCH as string,
  KEY_ETHER_SCAN: process.env.KEY_ETHER_SCAN as string,
  KEY_POLYGON_SCAN: process.env.KEY_POLYGON_SCAN as string,
  FETCH_BINANCE_EVENTS: process.env.FETCH_BINANCE_EVENTS?.toLowerCase() === "true",
  FETCH_BLOCKCHAIN_EVENTS: process.env.FETCH_BLOCKCHAIN_EVENTS?.toLowerCase() === "true",
  FETCH_ETHER_EVENTS: process.env.FETCH_ETHER_EVENTS?.toLowerCase() === "true",
  FETCH_POLYGON_EVENTS: process.env.FETCH_POLYGON_EVENTS?.toLowerCase() === "true",
  FETCH_BSC_EVENTS: process.env.FETCH_BSC_EVENTS?.toLowerCase() === "true",
  FETCH_CELSIUS_EVENTS: process.env.FETCH_CELSIUS_EVENTS?.toLowerCase() === "true",
  TAX_YEAR: Number(process.env.TAX_YEAR),
  DEBUG_WITH_MOCKDATA: process.env.DEBUG_WITH_MOCKDATA?.toLowerCase() === "true",
  DEBUG_PRINT_GROUPED_BLOCKCHAIN_TRANSACTIONS:
    process.env.DEBUG_PRINT_GROUPED_BLOCKCHAIN_TRANSACTIONS?.toLowerCase() === "true",
  PRINT_BEFORE_CALCULATIONS: process.env.PRINT_BEFORE_CALCULATIONS?.toLowerCase() === "true",
  PRINT_MOTHERBRAIN_DEBUGSTACK: process.env.PRINT_MOTHERBRAIN_DEBUGSTACK?.toLowerCase() === "true",
  REALIZE_AAVE: process.env.REALIZE_AAVE?.toLowerCase() === "true",
  REDIS_PORT: Number(process.env.REDIS_PORT),
  WALLETS: process.env.WALLETS?.toLocaleLowerCase().split(",") as string[],
  MINING_WALLETS: process.env.MINING_WALLETS?.toLocaleLowerCase().split(",") as string[],
};

export default env;
