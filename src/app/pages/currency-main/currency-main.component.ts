import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CurrencyDetail } from '../../models/currency.model';
import { MessageDioalogService } from '../../services/message-dialog.service';

@Component({
  selector: 'app-currency-main',
  templateUrl: './currency-main.component.html',
  styleUrls: ['./currency-main.component.scss'],
  providers: [MessageDioalogService],
})
export class CurrencyMainComponent implements OnInit {
  data: CurrencyDetail[];
  constructor(
    private apiService: ApiService,
    private messageDialog: MessageDioalogService
  ) {}

  ngOnInit(): void {
    this.getCurrency('bank/currency');
  }

  getCurrency(url: string) {
    this.apiService.getData(url, {}).subscribe(
      (response: CurrencyDetail[]) => {
        //this.data = response;
        this.data = response.filter(
          (item) =>
            item.currencyCodeA === 840 ||
            item.currencyCodeA === 978 ||
            item.currencyCodeA === 980
        );
      },
      (error) => {
        console.log(error);
        this.messageDialog.messageDialogOpen(error.error.errorDescription);
      }
    );
  }
}
