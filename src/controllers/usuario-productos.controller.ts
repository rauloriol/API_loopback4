import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Productos,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioProductosController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos[]> {
    return this.usuarioRepository.id_usuario(id).find(filter);
  }

  @post('/usuarios/{id}/productos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInUsuario',
            exclude: ['id'],
            optional: ['id_usuario']
          }),
        },
      },
    }) productos: Omit<Productos, 'id'>,
  ): Promise<Productos> {
    return this.usuarioRepository.id_usuario(id).create(productos);
  }

  @patch('/usuarios/{id}/productos', {
    responses: {
      '200': {
        description: 'Usuario.Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.usuarioRepository.id_usuario(id).patch(productos, where);
  }

  @del('/usuarios/{id}/productos', {
    responses: {
      '200': {
        description: 'Usuario.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.usuarioRepository.id_usuario(id).delete(where);
  }
}
