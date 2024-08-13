import { CoinType, Currency } from "../enums";

export interface CoinResult {
    coin: CoinType;
    coin_value: number;
    coin_value_currency: Currency;
    query_time: Date;
}
