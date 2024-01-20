import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss'],
})
export class CurrencySelectComponent implements OnInit {
  @Input() currencyLabel: string;
  @Input() currencyControl: FormControl;
  @Input() valueControl: FormControl;
  @Input() dictinaryValues: any;

  constructor() {}

  get currencyCodes() {
    return Object.keys(this.dictinaryValues);
  }

  ngOnInit(): void {}
}
