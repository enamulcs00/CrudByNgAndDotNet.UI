import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NgxToastrService {
  constructor(private toastr: ToastrService) {}

  private individualConfig: Partial<IndividualConfig> = {
    progressBar: true,
    closeButton: true,
    onActivateTick: true,
    enableHtml: true,
    progressAnimation:'increasing',
    timeOut:5000
  };

  show(message: string, type: string, title?: string) {
    this.toastr.show(
      message, // message shown "inside" of the toaster
      title, // title is shown above the message
      this.individualConfig, // IndividualConfig or GlobalConfig
      type // from ToastrIconClasses: 'toast-success', 'toast-error', 'toast-warning' or 'toast-info'
    );
  }
}
