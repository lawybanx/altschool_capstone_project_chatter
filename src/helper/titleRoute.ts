export const titleRoute = (
  name: string | any,
  title: string | any,
  id: string | any
): string => {
  return name + '/' + title.split(' ').join('-') + `_${id}`;
};
