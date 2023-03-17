export class EntityNotFoundException extends Error {
  constructor(id: string, type = 'Entity') {
    super(`${type} with id ${id} not found`);
  }
}
