import {Entity, model, property} from '@loopback/repository';

@model()
export class Productos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  id_usuario: number;

  @property({
    type: 'string',
  })
  nombre_producto?: string;

  @property({
    type: 'number',
  })
  precio_producto?: number;

  @property({
    type: 'string',
  })
  descripcion_producto?: string;


  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
