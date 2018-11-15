import { Component, OnInit } from '@angular/core';
import { Places } from '../../_interfaces/places';
import { PlacesService } from '../../_services/places.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]

})
export class DashboardComponent implements OnInit {
  places: Places[] = [];
  lugares: any = {};

  lugform: FormGroup;

  submitted: boolean;

  description: string;

  displayDialog: boolean;

  cols: any[];

  selectedPlace: Places;

  newPlace: boolean;

  constructor(private fb: FormBuilder, private messageService: MessageService, private placesService: PlacesService) { }

  ngOnInit() {

    this.cols = [
      { field: 'name', header: 'Lugar' },
      { field: 'location', header: 'Dirección' },
      { field: 'description', header: 'Descripción' }
    ];


    this.lugform = this.fb.group({
      'name': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
      'description': new FormControl(''),
    });
    this.listarLugares();
  }

  onRowSelect(event) {
    this.newPlace = false;
    console.log(event.data);
    this.lugares = this.clonePlace(event.data);
    this.displayDialog = true;
  }

  clonePlace(c: Places): any {
    let place = {};
    for (let prop in c) {
      place[prop] = c[prop];
    }
    return place;
  }

  listarLugares() {
    this.placesService.listar()
      .subscribe((places: Places[]) => {
        console.log(places);
        this.places = places;
      })
  }

  crearLugar(lugares) {
    this.submitted = true;
    console.log(lugares);
    this.placesService.crear(lugares)
      .subscribe(lugares => {
        this.lugares = lugares;
        this.listarLugares();
      })
    this.messageService.add({ severity: 'info', summary: 'Exitoso', detail: 'Lugar Registrado' });
    this.lugform.reset();
  }

  eliminarLugar() {
    console.log(this.lugares._id);
    this.placesService.eliminar(this.lugares._id).subscribe(res => {
      console.log(res);
      this.listarLugares();
    })
    this.listarLugares();
    this.displayDialog = false;

  }

  actualizarLugar() {
    this.placesService.actualizar(this.lugares._id, this.lugares)
      .subscribe(lugares => {
        this.lugares = lugares;
        this.listarLugares();
      })
    this.messageService.add({ severity: 'info', summary: 'Exitoso', detail: 'Lugar Actualizado' });
    this.listarLugares();
    this.displayDialog = false;
  }

}
