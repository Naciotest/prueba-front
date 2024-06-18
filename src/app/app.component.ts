import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConcatenateService } from './concatenate.service';
import { catchError, finalize, of, pipe, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  form: FormGroup;
  cs = inject(ConcatenateService);
  response: any;


  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      left: [null],
      right: [null]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const leftControl = this.form.get('left');
      const rightControl = this.form.get('right');

      const left = leftControl && leftControl.value ? leftControl.value : '';
      const right = rightControl && rightControl.value ? rightControl.value : ''

      this.cs.createStringConcatenate(left, right).pipe(
        tap(response => {
          this.response = response;
        }),
        catchError(error => {
          console.error('Error creating user:', error);
          return of(null);
        }),
        finalize(() => {
          console.log('Request completed');
        })
      ).subscribe();
    }
  }
}
