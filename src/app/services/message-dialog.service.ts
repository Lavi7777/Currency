import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MessageDioalogService {
  constructor(private messageSnackBar: MatSnackBar) {}

  messageDialogOpen(
    message: string,
    actions: string = '',
    config: object = null
  ) {
    if (!config) {
      config = {
        horizontalPosition: 'right',
        verticalPosition: 'top',
      };
    }
    this.messageSnackBar.open(message, actions, config);
  }
}
