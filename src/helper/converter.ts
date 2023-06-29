import * as Showdown from 'showdown';

const converter = (): Showdown.Converter => {
  return new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });
};

export default converter;
