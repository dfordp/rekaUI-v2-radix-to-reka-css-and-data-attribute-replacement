export default function transform(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;

  // Replace CSS custom properties
  root.find(j.Literal).forEach(path => {
    if (typeof path.node.value === 'string' && path.node.value.includes('--radix-accordion-content-width')) {
      path.node.value = path.node.value.replace('--radix-accordion-content-width', '--reka-accordion-content-width');
      dirtyFlag = true;
    }
  });

  // Replace data attribute selectors
  root.find(j.Literal).forEach(path => {
    if (typeof path.node.value === 'string' && path.node.value.includes('[data-radix-collection-item]')) {
      path.node.value = path.node.value.replace('[data-radix-collection-item]', '[data-reka-collection-item]');
      dirtyFlag = true;
    }
  });

  return dirtyFlag ? root.toSource() : undefined;
}