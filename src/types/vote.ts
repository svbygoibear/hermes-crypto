import { CoinType, VoteDirection, Currency } from "../enums";

export interface Vote {
    vote_direction: VoteDirection;
    vote_date_time: Date;
    vote_coin: CoinType;
    coin_value: number;
    coin_value_at_vote: number;
    coin_value_currency: Currency;
}

export interface VoteCreate {
    vote_direction: VoteDirection;
    vote_coin: CoinType;
    coin_value_currency: Currency;
}
