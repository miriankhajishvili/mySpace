import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../shared/services/client.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BaseService } from '../../shared/services/base.service';
import { Observable, switchMap } from 'rxjs';
import { IClient } from '../../shared/interfaces/client.interface';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  providers: [],
})
export class ClientComponent implements OnInit {
  allClients$: Observable<IClient[]> = this.clientService.getClients();

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {}

  onDelete(id: string) {
    this.clientService.deleteClient(id).pipe(switchMap( res => {
      return this.clientService.getClients()
    })).subscribe()
  }
}
