import { Component, OnInit, Input } from '@angular/core';
import { CurrencyDetail } from '../../models/currency.model';
import { CurrencyFlags } from '../../models/currency-flags.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { currencyConsts } from '../../helpers/currency-consts';
import { MessageDioalogService } from '../../services/message-dialog.service';

@Component({
  selector: 'app-currency-footer',
  templateUrl: './currency-footer.component.html',
  styleUrls: ['./currency-footer.component.scss'],
  providers: [MessageDioalogService],
})
export class CurrencyFooterComponent implements OnInit {
  @Input() currencyArray: CurrencyDetail[];
  currencyForm: FormGroup;
  currencyConstsTranferData: any;

  constructor(
    private currencyService: CurrencyService,
    private messageDialog: MessageDioalogService
  ) {}

  formGeneration() {
    this.currencyForm = new FormGroup({
      currencyFrom: new FormControl('USD', [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}$/),
      ]),
      currencyTo: new FormControl('UAH', [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}$/),
      ]),
      valueFrom: new FormControl('0', [
        Validators.pattern('^[0-9]+(.[0-9]+)?$'),
      ]),
      valueTo: new FormControl('0', [Validators.pattern('^[0-9]+(.[0-9]+)?$')]),
    });
  }

  ngOnInit(): void {
    this.currencyConstsTranferData = currencyConsts;
    this.formGeneration();
  }

  onSubmit(currencyNumber: number) {
    if (this.currencyForm.valid) {
      this.calculate(currencyNumber);
    }
  }

  calculate(currencyNumber: number) {
    try {
      let currencyFlags: CurrencyFlags[] = [];
      currencyFlags = this.currencyService.generateCurrencyList(
        this.currencyArray
      );
      const currencyFrom = this.currencyForm.get('currencyFrom').value;
      const currencyTo = this.currencyForm.get('currencyTo').value;
      const currencyValueFrom = this.currencyForm.get('valueFrom').value;
      const currencyValueTo = this.currencyForm.get('valueTo').value;

      const resultObjectUSDEUR = currencyFlags.find(
        (curr) =>
          curr.flagFirstCurrency === currencyConsts.EUR &&
          curr.flagSecondCurrency === currencyConsts.USD
      );
      const USDEUR = resultObjectUSDEUR ? 1 / resultObjectUSDEUR.rateSell : 0;

      const resultObjectUAHUSD = currencyFlags.find(
        (curr) =>
          curr.flagFirstCurrency === currencyConsts.USD &&
          curr.flagSecondCurrency === currencyConsts.UAH
      );
      const UAHUSD = resultObjectUAHUSD ? 1 / resultObjectUAHUSD.rateSell : 0;

      const resultObjectUAHEUR = currencyFlags.find(
        (curr) =>
          curr.flagFirstCurrency === currencyConsts.EUR &&
          curr.flagSecondCurrency === currencyConsts.UAH
      );
      const UAHEUR = resultObjectUAHEUR ? 1 / resultObjectUAHEUR.rateSell : 0;

      let result = 0;

      if (currencyNumber === 1) {
        currencyFlags.forEach((element) => {
          if (
            element.flagFirstCurrency === currencyFrom &&
            element.flagSecondCurrency === currencyTo
          ) {
            result = currencyValueFrom * element.rateSell;
          }
        });

        if (
          currencyFrom === currencyConsts.USD &&
          currencyTo === currencyConsts.EUR
        ) {
          result = USDEUR * currencyValueFrom;
        }

        if (
          currencyFrom === currencyConsts.UAH &&
          currencyTo === currencyConsts.USD
        ) {
          result = UAHUSD * currencyValueFrom;
        }

        if (
          currencyFrom === currencyConsts.UAH &&
          currencyTo === currencyConsts.EUR
        ) {
          result = UAHEUR * currencyValueFrom;
        }
        if (currencyFrom === currencyTo) {
          this.currencyForm.patchValue({
            valueTo: currencyValueFrom,
          });
        } else {
          this.currencyForm.patchValue({
            valueTo: result,
          });
        }
      } else if (currencyNumber === 2) {
        currencyFlags.forEach((element) => {
          if (
            element.flagFirstCurrency === currencyTo &&
            element.flagSecondCurrency === currencyFrom
          ) {
            result = currencyValueTo * element.rateSell;
          }
        });

        if (
          currencyTo === currencyConsts.USD &&
          currencyFrom === currencyConsts.EUR
        ) {
          result = USDEUR * currencyValueTo;
        }

        if (
          currencyTo === currencyConsts.UAH &&
          currencyFrom === currencyConsts.USD
        ) {
          result = UAHUSD * currencyValueTo;
        }

        if (
          currencyTo === currencyConsts.UAH &&
          currencyFrom === currencyConsts.EUR
        ) {
          result = UAHEUR * currencyValueTo;
        }

        if (currencyFrom === currencyTo) {
          this.currencyForm.patchValue({
            valueFrom: currencyValueTo,
          });
        } else {
          this.currencyForm.patchValue({
            valueFrom: result,
          });
        }
      }
    } catch (ex) {
      this.messageDialog.messageDialogOpen(ex);
    }
  }
}
