import { Component, OnInit } from '@angular/core';

import { MessageService } from 'src/app/services-local/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(
    public _messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

}
