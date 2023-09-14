export function buildSortByParam(word: string, params: URLSearchParams) {
  switch (word) {
    case 'Cheapest': {
      params.set('sortBy', 'price');
      params.set('orderIn', 'ASC');
      break;
    }

    case 'Expensive': {
      params.set('sortBy', 'price');
      params.delete('orderIn');
      break;
    }

    case 'Oldest': {
      params.set('sortBy', 'year');
      params.set('orderIn', 'ASC');
      break;
    }

    case 'Alphabetically': {
      params.set('sortBy', 'name');
      params.delete('orderIn');
      break;
    }

    default: {
      params.delete('sortBy');
      params.delete('orderIn');
    }
  }

  return params;
}

const capitalizeCrumbPart = (part: string) => {
  return part.slice(0, 1).toUpperCase() + part.slice(1).toLowerCase();
};

const validateCrumb = (crumb: string) => {
  const validParts = crumb.split('-');

  return validParts.map(capitalizeCrumbPart).join(' ');
};

export const buildLink = (crumb: string, crumbs: string[]) => {
  const indexOfCrumb = crumbs.indexOf(crumb);

  const cookedLink = crumbs.slice(0, indexOfCrumb + 1).join('/');

  return [`/${cookedLink}`, validateCrumb(crumb)];
};
