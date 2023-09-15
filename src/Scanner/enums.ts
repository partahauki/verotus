import type { Contract } from "../Models/models";

export const whitelistStablecoins = [
  "EUR",
  "EURS",
  "USD",
  "DAI",
  "USDC",
  "USDT",
  "MAI",
  "BUSD",
  "miMATIC",
  "other",
];

export const whitelistTokens = [
  "AAVE",
  "ADA",
  "amAAVE",
  "amBAL",
  "amBTC",
  "amCRV",
  "amDAI",
  "amETH",
  "amLINK",
  "amMATIC",
  "amUSDC",
  "amUSDT",
  "amWBTC",
  "amWETH",
  "amWMATIC",
  "ATOM",
  "BAL",
  "BETH",
  "BNB",
  "BTC",
  "COS",
  "crCRV",
  "CRV",
  "CTSI",
  "DOGE",
  "DOT",
  "ETH",
  "FET",
  "FIL",
  "GRT",
  "IOTA",
  "LINK",
  "MATIC",
  "PAXG",
  "QI",
  "QUICK",
  "SXP",
  "TEL",
  "UNI",
  "VET",
  "VTHO",
  "WBTC",
  "WETH",
  "WMATIC",
  "XRP",
  "am[A-Z]+.*",
  "^cr[A-Z]+.*",
  "^variableDebt.*",
  // "WEXpoly",
];

export const whitelistPoolTokens = [
  "SLP",
  "^moo.*",
  "dQUICK",
  "^crv.*",
  "UNI-V2",
  "^B-.*",
  "^dfx-.*",
  "am3CRV.*",
];

export const whitelistAllTokens = [
  ...whitelistStablecoins,
  ...whitelistPoolTokens,
  ...whitelistTokens,
];

export const polygonContracts: Contract[] = [
  {
    name: "1inch",
    address: "0x1111111254fb6c44bac0bed2854e76f90643097d",
    type: "swap",
  },
  {
    name: "Aave_ETH_Gateway",
    address: "0xbeadf48d62acc944a06eeae0a9054a90e5a7dc97",
    type: "liquidPool",
  },
  {
    name: "Aave_Incentive_Controller_V2",
    address: "0x357D51124f59836DeD84c8a1730D72B749d8BC23",
    type: "distribution",
  },
  {
    name: "Aave_Internal_Token_Swap",
    address: "0x35784a624d4ffbc3594f4d16fa3801fef063241c",
    type: "gauged/swap",
  },
  {
    name: "Aave_Lending_Pool_V2",
    address: "0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf",
    type: "AAVE",
  },
  {
    name: "AAVE",
    address: "0xd6df932a45c0f255f85145f286ea0b292b21c90b",
    type: "note",
  },
  {
    name: "Balancer_B-33AVAX-33WETH-33SOL_Reward_Gauge",
    address: "0x34d91862ce57063ee58c2c71524d5d9f8c3bd633",
    type: "gauge",
  },
  {
    name: "Balancer_B-POLYBASE_Reward_Gauge",
    address: "0x068ff98072d3eb848d012e3390703bb507729ed6",
    type: "gauge",
  },
  {
    name: "Balancer_B-POLYDEFI_Reward_Gauge",
    address: "0xe32af68e3e23dd01441f598b1d967a0bf7c6b407",
    type: "gauge",
  },
  {
    name: "Balancer_B-stMATIC-STABLE_Reward_Gauge",
    address: "0x9928340f9e1aaad7df1d95e27bd9a5c715202a56",
    type: "gauge",
  },
  {
    name: "Balancer_DFX_TEL_Reward_Gauge??",
    address: "0xd52d48db08e8224ef6e2be8f54f3c84e790b1c32",
    type: "gauge",
  },
  {
    name: "Balancer_Merkle_Orchard",
    address: "0x0f3e0c4218b7b0108a3643cfe9d3ec0d4f57c54e",
    type: "distribution",
  },
  {
    name: "Balancer_V2",
    address: "0xba12222222228d8ba445958a75a0704d566bf2c8",
    type: "gauged/swap",
  },
  {
    name: "BeefyUniV2",
    address: "0xf039fe26456901F863c873556f40fb207C6c9C18",
    type: "liquidPool",
  },
  {
    name: "Beefy_QUICK_USDC-DAI",
    address: "0x0dfd8c4dd493d8f87be362878e41537ca7ee4d9e",
    type: "liquidPool",
  },
  {
    name: "Beefy_QUICK_MATIC-USDC",
    address: "0xc1a2e8274d390b67a7136708203d71bf3877f158",
    type: "liquidPool",
  },
  {
    name: "Beefy_MAI-USDC",
    address: "0xebe0c8d842aa5a57d7bef8e524deaba676f91cd1",
    type: "liquidPool",
  },
  {
    name: "Beefy_Sushi_CRV_ETH",
    address: "0xe695fced8fd93eee54204a7fc33323a60d41865a",
    type: "liquidPool",
  },
  {
    name: "Beefy_QIDAO_QI-MATIC",
    address: "0x944a5c12cd4399abc6883ff1ba40a14c23b2fd37",
    type: "liquidPool",
  },
  {
    name: "Beefy_Vault",
    address: "0x75424BE5378621AeC2eEF25965f40FeB59039B52",
    type: "liquidPool",
  },
  {
    name: "Beefy Quick MATIC-USDC",
    address: "0x0dfd8c4dd493d8f87be362878e41537ca7ee4d9e",
    type: "liquidPool",
  },
  {
    name: "Beefyn QIDAO_QI-Matic_Psykoosi",
    address: "0x540a9f99bb730631bf243a34b19fd00ba8cf315c",
    type: "liquidPool",
  },
  {
    name: "Cream_LINK",
    address: "0x20d5d319c2964ecb52e1b006a4c059b7f6d6ad0a",
    type: "swap",
  },
  {
    name: "Cream_UNI",
    address: "0x7ea7174dd0cb4ab84f42177f01e9a8a79475d381",
    type: "swap",
  },
  {
    name: "Cream_USDC",
    address: "0x73cf8c5d14aa0ebc89f18272a568319f5bab6cbd",
    type: "liquidPool/swap",
  },
  {
    name: "Cream ChainLink Token",
    address: "0x20d5d319C2964ecb52e1B006a4C059b7f6d6ad0a",
    type: "liquidPool",
  },
  {
    name: "Curve_Aave_Pool_Reward_Gauge",
    address: "0x19793b454d3afc7b454f206ffe95ade26ca6912c",
    type: "gauge",
  },
  {
    name: "Curve_Aave_Pool",
    address: "0x445fe580ef8d70ff569ab36e80c647af338db351",
    type: "gauged/swap",
  },
  {
    name: "Curve_ATriCrypto",
    address: "0x3fcd5de6a9fc8a99995c406c77dda3ed7e406f81",
    type: "gauged/swap",
  },
  {
    name: "Curve_crvUSDBTCETH_Reward_Gauge",
    address: "0x321cdba34da09cf57c709f75dbb42ba209cfe6ac",
    type: "gauge",
  },
  {
    name: "Curve_crvUSDBTCETH_Reward_Gauge",
    address: "0x3b6b158a76fd8ccc297538f454ce7b4787778c7c",
    type: "gauge",
  },
  {
    name: "Curve_crvUSDBTCETH_Reward_Gauge",
    address: "0x9bd996db02b3f271c6533235d452a56bc2cd195a",
    type: "gauge",
  },
  {
    name: "Curve_crvUSDBTCETH_Reward_Gauge",
    address: "0xb0a366b987d77b5ed5803cbd95c80bb6deab48c0",
    type: "gauge",
  },
  {
    name: "Curve_crvUSDBTCETH",
    address: "0x1d8b86e3d88cdb2d34688e87e72f388cb541b7c8",
    type: "gauged/swap",
  },
  {
    name: "Curve_crvUSDBTCETH",
    address: "0x3fa8ebd5d16445b42e0b6a54678718c94ea99abc",
    type: "gauged/swap",
  },
  {
    name: "Curve_Wallet",
    address: "0x225fb4176f0e20cdb66b4a3df70ca3063281e855",
    type: "gauged/swap",
  },
  {
    name: "DAI",
    address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
    type: "ignore",
  },
  {
    name: "DFX_Reward_Gauge",
    address: "0xb748a5509246e0a47d20fb64343dbfad5b26dae7",
    type: "gauge",
  },
  {
    name: "DFX",
    address: "0x921a33b6f2cf9bc79fdd1f052c36b12efeec2aa7",
    type: "gauged/swap",
  },
  {
    name: "DFX",
    address: "0xb72d390e07f40d37d42dfcc43e954ae7c738ad44",
    type: "gauged/swap",
  },
  {
    name: "Dragon QUICK (dQUICK)",
    address: "0xf28164A485B0B2C90639E47b0f377b4a438a16B1",
    type: "liquidPool",
  },
  {
    name: "MiMATIC",
    address: "0xa3fa99a148fa48d14ed51d610c367c61876997f1",
    type: "ignore",
  },
  {
    name: "Moo Mai USDC-miMATIC",
    address: "0xebe0c8d842AA5A57D7BEf8e524dEabA676F91cD1",
    type: "liquidPool",
  },
  {
    name: "Moo Quick USDC-DAI",
    address: "0xebe0c8d842AA5A57D7BEf8e524dEabA676F91cD1",
    type: "liquidPool",
  },
  {
    name: "PolyDoge",
    address: "0x8a953cfe442c5e8855cc6c61b1293fa648bae472",
    type: "note",
  },
  {
    name: "QIDAO_CRV_Vault",
    address: "0x98b5f32dd9670191568b661a3e847ed764943875",
    type: "ignore",
  },
  {
    name: "QIDAO_Escrowed_QI(Locked?)",
    address: "0x880decade22ad9c58a8a4202ef143c4f305100b3",
    type: "liquidPool",
  },
  {
    name: "QIDAO_LINK_Vault",
    address: "0x61167073e31b1dad85a3e531211c7b8f1e5cae72",
    type: "ignore",
  },
  {
    name: "QIDAO_Masterchef_Staking_Pool",
    address: "0x574fe4e8120c4da1741b5fd45584de7a5b521f0f",
    type: "liquidPool",
  },
  {
    name: "QuickSwap_LIDO-MATIC_Gauge",
    address: "0xd04020de20df404d923c3b19e924878ead015b98",
    type: "gauge",
  },
  {
    name: "QuickSwap_stMATIC-MATIC_Gauge",
    address: "0x8ecbc9b0741c000fd7aae9cb559e5eee1d1883f3V",
    type: "gauge",
  },
  {
    name: "QuickSwap: Router",
    address: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
    type: "liquidPool/swap",
  },
  {
    name: "RAKIS-6_Spice_Harvester",
    address: "0xdb01724cd5885d76438d2b54097c9dd8dbf443a1",
    type: "distribution",
  },
  {
    name: "RAKIS",
    address: "0xbc91a120ccd8f80b819eaf32f0996dac3fa76a6c",
    type: "liquidPool",
  },
  {
    name: "SushiSwap Router",
    address: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    type: "liquidPool/swap",
  },
  {
    name: "Uniswap_V3_Positions_NFT",
    address: "0xc36442b4a4522e871399cd717abdd847ab11fe88",
    type: "liquidPool",
  },
  {
    name: "USDC",
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    type: "ignore",
  },
  {
    name: "USDT_Tether",
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    type: "ignore",
  },
  {
    name: "Wault_Finance",
    address: "0x3a1D87f206D12415f5b0A33E786967680AAb4f6d",
    type: "liquidPool/swap",
  },
  {
    name: "WEXPOLY",
    address: "0xC8Bd86E5a132Ac0bf10134e270De06A8Ba317BFe",
    type: "liquidPool",
  },
  {
    name: "WMATIC",
    address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
    type: "ignore",
  },
  {
    name: "WBTC",
    address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    type: "ignore",
  },
  {
    name: "XPollinate_Transaction_Manager_2",
    address: "0x6090de2ec76eb1dc3b5d632734415c93c44fd113",
    type: "ignore",
  },
  {
    name: "XPollinate_Transaction_Manager",
    address: "0x31efc4aeaa7c39e54a33fdc3c46ee2bd70ae0a09",
    type: "ignore",
  },
];

export const polygonWallets: Contract[] = [
  {
    name: "Chris_Makinen",
    address: "0xb7A587683A5D38BE835fF29a915eF867dd79967d",
    type: "note",
  },
  {
    name: "Daniel_Makinen_Binance_ETH",
    address: "0xAD466509c6A0B62ee2fd38eeF267c2ECf9c9edE1",
    type: "note",
  },
  {
    name: "Daniel_Makinen",
    address: "0xaab95e08ca1580b9244ce41ae2308e74d99d43a9",
    type: "note",
  },
  {
    name: "Niclas_Kangasmaki_preledger",
    address: "0x47A923aDAF72D1bD849A1C3A3384682d42C831df",
    type: "note",
  },
  {
    name: "Niclas_Kangasmaki",
    address: "0xb23ea87da29eeCD82a571fa2AE2F216463A01bBb",
    type: "note",
  },
  {
    name: "Niclas_Kangasmäki_Binance",
    address: "0xE642bE8608d53FA7B6bE789BDC538152A8695851",
    type: "note",
  },
  {
    name: "Patric_Kangasmaki",
    address: "0x3Ed6e6017b9B0F2F29Ae3ab1A043C7daC7E3092e",
    type: "note",
  },
  {
    name: "QIDAO_Airdrop",
    address: "0xc63c477465a792537d291adb32ed15c0095e106b",
    type: "distribution",
  },
];

export const allContracts = polygonContracts;
