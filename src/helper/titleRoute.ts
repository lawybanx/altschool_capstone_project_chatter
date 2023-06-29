export const titleRoute = (name: string, title: string, id: string): string => {
  return name + '/' + title.split(' ').join('-') + `_${id}`;
};
