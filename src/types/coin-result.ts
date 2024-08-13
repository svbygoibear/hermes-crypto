import { CoinType, Currency } from "../enums";

export interface CoinResult {
    vote_coin: CoinType;
    coin_value: number;
    coin_value_currency: Currency;
    query_time: string;
}
