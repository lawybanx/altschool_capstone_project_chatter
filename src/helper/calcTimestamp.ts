export const calTimeStamp = (timeStamp: { seconds: number }): string => {
  return new Date(timeStamp.seconds * 1000).toISOString();
};

export const dateFormat = (timeStamp: { seconds: number }): string => {
  const date = new Date(timeStamp.seconds * 1000)
    .toDateString()
    .split(' ')
    .slice(1, 3);
  return [date[0], +date[1]].join(' ');
};

export const isLimitedDate = (createdAt: { seconds: number }): boolean => {
  const createdDate = createdAt.seconds;
  const currentDate = Math.floor(new Date().getTime() / 1000);
  const limitedDate = currentDate - createdDate;

  return limitedDate > 432000;
};

export const showEditedDate = (
  createdAt: { seconds: number },
  updatedAt: { seconds: number }
): boolean => {
  // const reg = /\d+/;
  const postedDate = +dateFormat(createdAt);
  const editedDate = +dateFormat(updatedAt);
  return postedDate < editedDate;
};

export const joinOnDate = (createdAt: number): string => {
  const date = new Date(createdAt).toDateString().split(' ').slice(1, 4);
  return [date[0], +date[1] + ',', date[2]].join(' ');
};

export const displayDate = (timeStamp: { seconds: number }): string => {
  const date = new Date(timeStamp.seconds * 1000)
    .toDateString()
    .split(' ')
    .slice(1, 4);
  return [date[0], date[1] + ',', date[2]].join(' ');
};
