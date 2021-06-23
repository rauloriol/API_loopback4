import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Usuario, UsuarioRelations, Productos} from '../models';
import {ApijunioDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProductosRepository} from './productos.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly id_usuario: HasManyRepositoryFactory<Productos, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.apijunio') dataSource: ApijunioDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Usuario, dataSource);
    this.id_usuario = this.createHasManyRepositoryFactoryFor('id_usuario', productosRepositoryGetter,);
    this.registerInclusionResolver('id_usuario', this.id_usuario.inclusionResolver);
  }
}
