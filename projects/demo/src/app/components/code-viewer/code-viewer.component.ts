import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import * as Prism from 'prismjs';

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTooltipModule, MatIconModule],
})
export class CodeViewerComponent implements OnInit {
  private readonly document = inject(DOCUMENT, { optional: true });

  showCode = false;

  ngOnInit(): void {
    const $code = this.document?.querySelector(`code`);
    if (!$code) {
      return;
    }
    Prism.highlightElement($code);
  }
}
