import {Entity, model, property, hasMany} from '@loopback/repository';
import {Productos} from './productos.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  nombre_usuario?: string;

  @property({
    type: 'string',
  })
  apellido_usuario?: string;

  @property({
    type: 'number',
  })
  edad_usuario?: number;

  @hasMany(() => Productos, {keyTo: 'id_usuario'})
  id_usuario: Productos[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
