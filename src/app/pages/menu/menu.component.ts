import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItems = [
    { wid: '0', title: 'CREATE ACCOUNT APPLICATION', description: 'To create a new account and grant permissions of each system.' },
    { wid: '1', title: 'CHANGE PERMISSIONS APPLICATION', description: 'To change a user\'s permissions of each system.' },
    { wid: '2', title: 'DEACTIVATE ACCOUNT APPLICATION', description: 'To deactivate an existing user account.' }
  ];
  constructor() { }

  ngOnInit(): void {
  }


}
