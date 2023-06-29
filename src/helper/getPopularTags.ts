type Tag = {
  tagName: string;
  // Add other properties of the Tag type if needed
};

type TransformedData = {
  draft: boolean;
  tags: Tag[];
  // Add other properties of the TransformedData type if needed
};

export const getPopularTags = (
  transformedData: TransformedData[]
): { tagName: string; publishedPosts: number }[] => {
  let popularTags: { tagName: string; publishedPosts: number }[] = [];

  if (transformedData) {
    const availableTags: Tag[] = [];

    transformedData.forEach(postData => {
      if (!postData.draft && postData.tags.length) {
        availableTags.push(...postData.tags);
      }
    });

    // calculate number of duplicate tags
    const tagCounts: { [tagName: string]: number } = {};
    availableTags.forEach(tag => {
      tagCounts[tag.tagName] = (tagCounts[tag.tagName] || 0) + 1;
    });

    popularTags = Object.entries(tagCounts).map(([tagName, count]) => ({
      tagName,
      publishedPosts: count,
    }));

    popularTags.sort((a, b) => b.publishedPosts - a.publishedPosts);
  }

  return popularTags;
};
