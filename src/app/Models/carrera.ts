export class Carrera {
  id: number;
  nombre: string;
  facultad_id: number;

  constructor(id: number = 0, nombre: string = '', facultad_id: number = 0) {
      this.id = id;
      this.nombre = nombre;
      this.facultad_id = facultad_id;
  }
}
