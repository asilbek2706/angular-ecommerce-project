import { Component } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common'; 

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DatePipe, UpperCasePipe], 
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  public currentDate: Date = new Date();
}