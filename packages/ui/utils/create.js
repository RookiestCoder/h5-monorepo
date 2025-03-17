import { COMPONENT_NAMESPACE } from '@monorepo/ui/constants';
import { createBEM, createComponentName, camelize } from '@monorepo/ui/utils';

export function createNamespace(name) {
  const newName = COMPONENT_NAMESPACE + '-' + name;
  return [camelize('-' + createComponentName(newName)), createBEM(newName)];
}
