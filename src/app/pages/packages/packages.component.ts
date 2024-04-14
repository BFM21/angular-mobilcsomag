import { Component } from '@angular/core';
import { Package } from '../../models/Package';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent {
  packages: Package[] =[
    {id:'1', name: 'Kis csomag', description: 'Ez a kis csomag leírása', price: '3000'},
    {id:'2', name: 'Közepes csomag', description: 'Ez a közepes csomag leírása', price: '6000'},
    {id:'3', name: 'Nagy csomag', description: 'Ez a nagy csomag leírása', price: '9000'},
  ]
}
