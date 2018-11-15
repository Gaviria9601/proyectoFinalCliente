import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsersService } from '../../_services/users.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [MessageService]

})
export class RegistroComponent implements OnInit {

  userform: FormGroup;

  submitted: boolean;

  description: string;

  usuarios: any = {};

  constructor(private fb: FormBuilder, private messageService: MessageService, private usersService: UsersService) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });

  }

  crearUser(usuarios) {
    this.submitted = true;
    console.log(usuarios);
    this.usersService.crear(usuarios)
      .subscribe(usuarios => {
        this.usuarios = usuarios;
      })
    this.messageService.add({ severity: 'info', summary: 'Exitoso', detail: 'Usuario Registrado' });
    this.userform.reset();
  }

}
