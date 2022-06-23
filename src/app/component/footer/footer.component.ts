import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ControlPanelService } from '../../service/control-panel.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  controlPanel = new UntypedFormGroup({
    draggable: new UntypedFormControl(false),
    isArchived: new UntypedFormControl(false),
  })

  constructor(private controlPanelService: ControlPanelService) {
    this.controlPanel.valueChanges.subscribe((val: any) => {
      this.controlPanelService.setControl(val)
    })
  }

  toggleDraggable() {
    const cur = this.controlPanel.get('draggable')?.value;

    this.controlPanel.patchValue({
      draggable: !cur
    })
  }

  toggleViewArchived() {
    const cur = this.controlPanel.get('isArchived')?.value;

    this.controlPanel.patchValue({
      isArchived: !cur
    })
  }
}
