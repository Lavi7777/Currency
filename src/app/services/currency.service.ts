import { Injectable } from '@angular/core';
import { CurrencyDetail } from '../models/currency.model';
import { CurrencyFlags } from '../models/currency-flags.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}

  currencyCodes: { [key: number]: string } = {
    840: 'USD',
    978: 'EUR',
    980: 'UAH',
  };

  getCurrencySymbol(code: number): string {
    return this.currencyCodes[code] || 'Unknown';
  }

  generateCurrencyList(currencyList: CurrencyDetail[]): CurrencyFlags[] {
    let currencyFlagList: CurrencyFlags[] = [];
    currencyList.forEach((element) => {
      let currency: CurrencyFlags = new CurrencyFlags();
      currency = { ...element, flagFirstCurrency: '', flagSecondCurrency: '' };
      currency.flagFirstCurrency =
        this.getCurrencySymbol(element.currencyCodeA) || '';
      currency.flagSecondCurrency =
        this.getCurrencySymbol(element.currencyCodeB) || '';
      currencyFlagList.push(currency);
    });
    return currencyFlagList;
  }
}
