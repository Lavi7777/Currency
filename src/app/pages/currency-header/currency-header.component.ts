import { Component, OnInit, Input } from '@angular/core';
import { CurrencyDetail } from '../../models/currency.model';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-currency-header',
  templateUrl: './currency-header.component.html',
  styleUrls: ['./currency-header.component.scss'],
})
export class CurrencyHeaderComponent implements OnInit {
  @Input() currencyArray: CurrencyDetail[];
  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {}
}
